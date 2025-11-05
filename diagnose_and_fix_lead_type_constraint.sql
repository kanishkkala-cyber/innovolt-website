-- STEP 1: Find ALL constraints on the leads table related to lead_type
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND contype = 'c';  -- 'c' means CHECK constraint

-- STEP 2: Check the table structure to see what lead_type column expects
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'leads' 
AND column_name = 'lead_type';

-- STEP 3: Check if there's a check constraint specifically on lead_type
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    cc.check_clause
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc 
    ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'leads'
AND cc.check_clause LIKE '%lead_type%';

-- STEP 4: Drop ALL possible constraint names (try all variations)
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_check;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS lead_type_check;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_ck;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS chk_lead_type;

-- STEP 5: Create a new constraint that allows our values
-- Using the exact values from our code: 'contact_form', 'callback_request', 'vehicle_inquiry'
ALTER TABLE leads 
ADD CONSTRAINT leads_lead_type_check 
CHECK (lead_type IN (
    'contact_form',
    'callback_request', 
    'vehicle_inquiry',
    'test_drive',
    'general_inquiry',
    'other'
));

-- STEP 6: Verify the new constraint
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND conname = 'leads_lead_type_check';


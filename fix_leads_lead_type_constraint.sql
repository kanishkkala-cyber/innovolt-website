-- Step 1: Check the current constraint (to see what values are allowed)
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND conname LIKE '%lead_type%';

-- Step 2: Drop the existing check constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_check;

-- Step 3: Create a new check constraint with the allowed lead_type values
-- Update this list with all the lead_type values you want to allow
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

-- Alternative: If you want to allow any text value (less restrictive)
-- ALTER TABLE leads 
-- ADD CONSTRAINT leads_lead_type_check 
-- CHECK (lead_type IS NOT NULL AND length(lead_type) > 0);

-- Verify the constraint was created
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND conname = 'leads_lead_type_check';


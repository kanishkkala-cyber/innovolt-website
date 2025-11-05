-- =====================================================
-- COMPREHENSIVE FIX FOR lead_type CONSTRAINT
-- =====================================================

-- STEP 1: Check if lead_type is an ENUM type (some databases use this)
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname LIKE '%lead%type%' OR t.typname LIKE '%lead_type%'
ORDER BY e.enumsortorder;

-- STEP 2: Find ALL check constraints on leads table
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
ORDER BY conname;

-- STEP 3: Check column data type
SELECT 
    column_name,
    data_type,
    udt_name,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'leads' 
AND column_name = 'lead_type';

-- STEP 4: Drop ALL possible constraint variations
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'leads'::regclass 
        AND contype = 'c'
        AND (pg_get_constraintdef(oid) LIKE '%lead_type%')
    LOOP
        EXECUTE 'ALTER TABLE leads DROP CONSTRAINT IF EXISTS ' || quote_ident(r.conname) || ' CASCADE';
        RAISE NOTICE 'Dropped constraint: %', r.conname;
    END LOOP;
END $$;

-- STEP 5: If lead_type is an ENUM, convert it to text type
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' 
        AND column_name = 'lead_type' 
        AND udt_name LIKE '%enum%'
    ) THEN
        ALTER TABLE leads ALTER COLUMN lead_type TYPE text;
        RAISE NOTICE 'Converted lead_type from enum to text';
    END IF;
END $$;

-- STEP 6: Create new check constraint with our exact values
ALTER TABLE leads 
ADD CONSTRAINT leads_lead_type_check 
CHECK (
    lead_type IN (
        'contact_form',
        'callback_request', 
        'vehicle_inquiry',
        'test_drive',
        'general_inquiry',
        'other'
    )
    OR lead_type IS NULL  -- Allow NULL if needed
);

-- STEP 7: Verify the constraint was created
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND conname = 'leads_lead_type_check';

-- STEP 8: Test the constraint (optional - can be removed)
-- This will show what values are currently in the table
SELECT DISTINCT lead_type, COUNT(*) as count
FROM leads
GROUP BY lead_type;


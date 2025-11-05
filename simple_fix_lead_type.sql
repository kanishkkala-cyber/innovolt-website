-- SIMPLE DIRECT FIX FOR lead_type CONSTRAINT
-- Run this in Supabase SQL Editor

-- Step 1: Remove the constraint (handles all possible names)
DO $$
DECLARE
    constraint_name_var TEXT;
BEGIN
    -- Find and drop the constraint
    FOR constraint_name_var IN
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'leads'::regclass 
        AND contype = 'c'
        AND (
            pg_get_constraintdef(oid) LIKE '%lead_type%'
            OR conname LIKE '%lead_type%'
        )
    LOOP
        EXECUTE format('ALTER TABLE leads DROP CONSTRAINT IF EXISTS %I CASCADE', constraint_name_var);
        RAISE NOTICE 'Dropped constraint: %', constraint_name_var;
    END LOOP;
END $$;

-- Step 2: Create new permissive constraint
ALTER TABLE leads 
ADD CONSTRAINT leads_lead_type_check 
CHECK (
    lead_type IS NULL 
    OR lead_type = ANY(ARRAY[
        'contact_form',
        'callback_request',
        'vehicle_inquiry',
        'test_drive',
        'general_inquiry',
        'other'
    ]::text[])
);

-- Step 3: Verify it works
SELECT 
    'Constraint created successfully!' AS status,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND conname = 'leads_lead_type_check';


-- FIX FOR phone_number CONSTRAINT
-- Copy and paste this into Supabase SQL Editor

-- Step 1: Find and show the current phone_number constraint
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND contype = 'c'
AND (
    pg_get_constraintdef(oid) LIKE '%phone_number%'
    OR conname LIKE '%phone_number%'
);

-- Step 2: Drop the phone_number constraint
DO $$
DECLARE
    constraint_name_var TEXT;
BEGIN
    FOR constraint_name_var IN
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'leads'::regclass 
        AND contype = 'c'
        AND (
            pg_get_constraintdef(oid) LIKE '%phone_number%'
            OR conname LIKE '%phone_number%'
        )
    LOOP
        EXECUTE format('ALTER TABLE leads DROP CONSTRAINT IF EXISTS %I CASCADE', constraint_name_var);
        RAISE NOTICE 'Dropped constraint: %', constraint_name_var;
    END LOOP;
END $$;

-- Step 3: Create a new permissive phone_number constraint
-- This allows phone numbers with +91, +1, or any format
ALTER TABLE leads 
ADD CONSTRAINT leads_phone_number_check 
CHECK (
    phone_number IS NULL 
    OR (
        length(trim(phone_number)) >= 10 
        AND length(trim(phone_number)) <= 20
        AND phone_number ~ '^[+]?[0-9]{10,20}$'
    )
);

-- Step 4: Verify the constraint was created
SELECT 
    'Phone number constraint created successfully!' AS status,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'leads'::regclass
AND conname = 'leads_phone_number_check';


-- Enable Row-Level Security on leads table (if not already enabled)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (optional, will error if doesn't exist but that's okay)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow public inserts" ON leads;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON leads;

-- Create policy to allow anonymous users (public) to INSERT into leads table
-- This allows form submissions without authentication
CREATE POLICY "Enable insert for anonymous users"
ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Optional: Create policy to allow authenticated users to READ all leads (for admin dashboard)
-- Uncomment if you want authenticated users to view leads
-- CREATE POLICY "Enable read for authenticated users"
-- ON leads
-- FOR SELECT
-- TO authenticated
-- USING (true);

-- Optional: If you want service role or authenticated users to UPDATE/DELETE
-- CREATE POLICY "Enable update for authenticated users"
-- ON leads
-- FOR UPDATE
-- TO authenticated
-- USING (true);

-- CREATE POLICY "Enable delete for authenticated users"
-- ON leads
-- FOR DELETE
-- TO authenticated
-- USING (true);


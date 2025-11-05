-- Create RPC function to update bytea columns in Vehicles table
-- Run this in your Supabase SQL Editor

CREATE OR REPLACE FUNCTION update_vehicle_image_bytea(
    p_vehicle_id uuid,
    p_image_base64 text,
    p_column_name text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    sql_update text;
BEGIN
    -- Dynamically build and execute the UPDATE query
    -- This safely handles bytea column updates
    sql_update := format(
        'UPDATE "Vehicles" SET %I = decode(%L, ''base64'') WHERE id = %L',
        p_column_name,
        p_image_base64,
        p_vehicle_id
    );
    
    EXECUTE sql_update;
END;
$$;

-- Grant execute permission to authenticated/anonymous users
GRANT EXECUTE ON FUNCTION update_vehicle_image_bytea(uuid, text, text) TO anon;
GRANT EXECUTE ON FUNCTION update_vehicle_image_bytea(uuid, text, text) TO authenticated;


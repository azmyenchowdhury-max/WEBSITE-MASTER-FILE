import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://xtpvadsmapafzkhhnlio.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFkYjI5NmJmLTczMzktNGU0Ny1iMjdmLThlNWYwOGZhOWQ4ZSJ9.eyJwcm9qZWN0SWQiOiJ4dHB2YWRzbWFwYWZ6a2hobmxpbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcwMDA3MzkzLCJleHAiOjIwODUzNjczOTMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.JQJq2LRDRaDvviKvPOyN0X3rKLCTTo06oSqjRauMJpg';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };
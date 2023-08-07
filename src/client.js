import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bwbtvynagbvchywkzvfp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3YnR2eW5hZ2J2Y2h5d2t6dmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5MTgxMjQsImV4cCI6MjAwNTQ5NDEyNH0.aM5q6ugYCI2TQdhv9dI9syMXbkcqT1axCBvvfap7TUI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
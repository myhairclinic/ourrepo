ALTER TABLE treatment_records 
ADD COLUMN IF NOT EXISTS grafts_count INTEGER,
ADD COLUMN IF NOT EXISTS treatment_area TEXT,
ADD COLUMN IF NOT EXISTS technic_used TEXT,
ADD COLUMN IF NOT EXISTS medications_provided TEXT,
ADD COLUMN IF NOT EXISTS complication_notes TEXT,
ADD COLUMN IF NOT EXISTS next_treatment_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS progress_rating INTEGER;

ALTER TABLE patient_progress_images
ADD COLUMN IF NOT EXISTS treatment_record_id INTEGER REFERENCES treatment_records(id),
ADD COLUMN IF NOT EXISTS before_after_type TEXT NOT NULL DEFAULT 'before',
ADD COLUMN IF NOT EXISTS angle_type TEXT,
ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN NOT NULL DEFAULT false;

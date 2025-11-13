
-- Add author_name column to articles table
ALTER TABLE articles ADD COLUMN author_name TEXT DEFAULT 'כתב ערוץ החדשות';

-- Update existing articles with sample author names
UPDATE articles SET author_name = CASE 
  WHEN category = 'ביטחוני' THEN 'רון בן ישי'
  WHEN category = 'פוליטי' THEN 'עמית סגל'
  WHEN category = 'כלכלה' THEN 'שי גולדן'
  WHEN category = 'מדעי' THEN 'טל שניידר'
  WHEN category = 'ספורט' THEN 'איתי לוי'
  WHEN category = 'בעולם' THEN 'אורלי וילנאי'
  ELSE 'נדב משלבי'
END
WHERE author_name IS NULL;

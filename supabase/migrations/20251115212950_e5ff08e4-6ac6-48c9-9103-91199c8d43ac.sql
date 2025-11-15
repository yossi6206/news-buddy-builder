-- Update RLS policy to allow editors and admins to delete breaking news
DROP POLICY IF EXISTS "Admins can delete breaking news" ON breaking_news;

CREATE POLICY "Editors and admins can delete breaking news"
ON breaking_news
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));
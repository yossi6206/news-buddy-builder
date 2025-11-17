-- Add views column to articles table
ALTER TABLE public.articles 
ADD COLUMN views INTEGER DEFAULT 0 NOT NULL;

-- Create index for better performance when querying trending articles
CREATE INDEX idx_articles_views ON public.articles(views DESC);

-- Create function to increment article views
CREATE OR REPLACE FUNCTION public.increment_article_views(_article_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  UPDATE public.articles 
  SET views = views + 1 
  WHERE id = _article_id;
$function$;
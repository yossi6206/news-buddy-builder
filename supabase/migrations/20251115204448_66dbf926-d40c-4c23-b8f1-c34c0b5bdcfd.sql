-- Create breaking_news table
CREATE TABLE public.breaking_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Breaking news are viewable by everyone" 
ON public.breaking_news 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Editors and admins can insert breaking news" 
ON public.breaking_news 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors and admins can update breaking news" 
ON public.breaking_news 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete breaking news" 
ON public.breaking_news 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_breaking_news_updated_at
BEFORE UPDATE ON public.breaking_news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER TABLE public.breaking_news REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.breaking_news;
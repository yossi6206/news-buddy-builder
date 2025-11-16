-- Create reporter_updates table for "איש הכתבים" section
CREATE TABLE public.reporter_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  title TEXT NOT NULL,
  time TEXT NOT NULL DEFAULT '00:00',
  is_live BOOLEAN NOT NULL DEFAULT false,
  avatar_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reporter_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for reporter_updates
CREATE POLICY "Reporter updates are viewable by everyone" 
ON public.reporter_updates 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Editors and admins can insert reporter updates" 
ON public.reporter_updates 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors and admins can update reporter updates" 
ON public.reporter_updates 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors and admins can delete reporter updates" 
ON public.reporter_updates 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_reporter_updates_updated_at
BEFORE UPDATE ON public.reporter_updates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to delete reporter updates
CREATE OR REPLACE FUNCTION public.delete_reporter_update(_id uuid)
RETURNS void
LANGUAGE sql
SET search_path TO 'public'
AS $function$
  DELETE FROM public.reporter_updates WHERE id = _id;
$function$;
-- Fix search path for delete_ad function
CREATE OR REPLACE FUNCTION public.delete_ad(_id uuid)
RETURNS void
LANGUAGE sql
SECURITY INVOKER
SET search_path = public
AS $$
  DELETE FROM public.ads WHERE id = _id;
$$;
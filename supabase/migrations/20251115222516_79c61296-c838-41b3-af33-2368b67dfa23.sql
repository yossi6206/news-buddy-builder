-- RPC to avoid adblockers blocking /rest/v1/ads DELETE requests
CREATE OR REPLACE FUNCTION public.delete_ad(_id uuid)
RETURNS void
LANGUAGE sql
SECURITY INVOKER
AS $$
  DELETE FROM public.ads WHERE id = _id;
$$;
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export type AppRole = 'admin' | 'editor' | 'user';

export const useUserRole = (user: User | null) => {
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user) {
        console.log('useUserRole: No user');
        setRoles([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      console.log('useUserRole: Fetching roles for user:', user.id);

      try {
        // Prefer secure RPC checks (security definer, bypasses RLS recursion)
        const [adminRes, editorRes] = await Promise.all([
          (supabase as any).rpc('has_role', { _user_id: user.id, _role: 'admin' }),
          (supabase as any).rpc('has_role', { _user_id: user.id, _role: 'editor' }),
        ]);

        console.log('useUserRole: RPC results:', { adminRes, editorRes });

        if (adminRes.error || editorRes.error) {
          console.warn('useUserRole: RPC error, falling back to table select', {
            adminError: adminRes.error,
            editorError: editorRes.error,
          });
          const { data, error } = await supabase
            .from('user_roles' as any)
            .select('role')
            .eq('user_id', user.id);

          console.log('useUserRole: Fallback query result:', { data, error });

          if (error) {
            console.error('Error fetching user roles:', error);
            setRoles([]);
          } else {
            const userRoles = data?.map((r: any) => r.role as AppRole) || [];
            console.log('useUserRole: Setting roles (fallback):', userRoles);
            setRoles(userRoles);
          }
        } else {
          const nextRoles: AppRole[] = [];
          if (adminRes.data) nextRoles.push('admin');
          if (editorRes.data) nextRoles.push('editor');
          console.log('useUserRole: Setting roles (rpc):', nextRoles);
          setRoles(nextRoles);
        }
      } catch (error) {
        console.error('Error in fetchRoles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [user]);

  const hasRole = (role: AppRole) => roles.includes(role);
  const isAdmin = hasRole('admin');
  const isEditor = hasRole('editor');
  const canManageContent = isAdmin || isEditor;

  return { roles, loading, hasRole, isAdmin, isEditor, canManageContent };
};


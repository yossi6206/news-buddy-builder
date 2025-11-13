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

      console.log('useUserRole: Fetching roles for user:', user.id);

      try {
        const { data, error } = await supabase
          .from('user_roles' as any)
          .select('role')
          .eq('user_id', user.id);

        console.log('useUserRole: Query result:', { data, error });

        if (error) {
          console.error('Error fetching user roles:', error);
          setRoles([]);
        } else {
          const userRoles = data?.map((r: any) => r.role as AppRole) || [];
          console.log('useUserRole: Setting roles:', userRoles);
          setRoles(userRoles);
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


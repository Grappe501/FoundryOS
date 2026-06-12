'use client';

import { useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';
import { syncPortableIdentityOnAuth } from '../../lib/personal-database/sync-client';
import type { AuthChangeEvent } from '@supabase/supabase-js';

/** Hydrate portable identity on sign-in — cloud becomes source of truth */
export function PortableIdentityHydrator() {
  useEffect(() => {
    const supabase = createClient();

    void syncPortableIdentityOnAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === 'SIGNED_IN') {
        void syncPortableIdentityOnAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
}

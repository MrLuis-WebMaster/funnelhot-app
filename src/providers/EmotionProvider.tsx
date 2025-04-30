'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const muiCache = createCache({ key: 'mui', prepend: true });

export function EmotionRegistry({ children }: { children: React.ReactNode }) {
    return <CacheProvider value={muiCache}>{children}</CacheProvider>;
}

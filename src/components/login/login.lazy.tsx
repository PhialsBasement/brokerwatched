import React, { lazy, Suspense } from 'react';

const Lazylogin = lazy(() => import('./login'));

const login = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Lazylogin {...props} />
  </Suspense>
);

export default login;

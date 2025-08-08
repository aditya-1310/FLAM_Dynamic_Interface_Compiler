"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // When the component unmounts, we'll stop rendering the portal
    return () => setMounted(false);
  }, []);

  // We only render the portal on the client-side after the component has mounted.
  // `document.body` is not available on the server.
  return mounted
    ? createPortal(children, document.body)
    : null;
};

export default Portal;
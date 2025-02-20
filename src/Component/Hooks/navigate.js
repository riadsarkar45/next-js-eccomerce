'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/compat/router'; // Using compat router for routing

const useNavigate = () => {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    // Wait until the router is available on the client side
    if (router && router.isReady) {
      setIsRouterReady(true);
    }
  }, [router]); // Runs when router is updated

  const navigateHome = () => {
    if (isRouterReady) {
      router.replace('/');
    } else {
      console.error("Router is not initialized yet.");
    }
  };

  return { navigateHome, isRouterReady };
};

export default useNavigate;

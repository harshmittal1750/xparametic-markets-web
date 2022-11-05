import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './app.routes';

export default function Routes() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return <AppRoutes />;
}

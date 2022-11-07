import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll to top of the current page after navigation
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;

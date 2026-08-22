import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame to ensure the new route's DOM is fully painted
    requestAnimationFrame(() => {
      // 1. Attempt to scroll the window (default behavior)
      window.scrollTo(0, 0);
      
      // 2. Attempt to scroll the specific <main> element that acts as our scroll container in the Shell layout
      const mainContent = document.querySelector('main.overflow-y-auto');
      if (mainContent) {
        mainContent.scrollTo(0, 0);
      }
    });
  }, [pathname]);

  return null;
}
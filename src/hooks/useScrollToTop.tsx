import React from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
}

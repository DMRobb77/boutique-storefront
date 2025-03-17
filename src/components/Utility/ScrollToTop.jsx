import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
}

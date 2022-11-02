import { RefObject, useEffect, useState } from "react";

export function useViewCheck(ref: RefObject<HTMLElement>, once: boolean) {
  const [seeing, setSeeing] = useState(false);

  let Observer = new IntersectionObserver(([entry]) => {
    setSeeing(entry.isIntersecting);
    if (once && entry.isIntersecting) {
      Observer.disconnect();
    }
  });

  useEffect(() => {
    setTimeout(() => Observer.observe(ref.current!), 600);
  }, []);

  return seeing;
}

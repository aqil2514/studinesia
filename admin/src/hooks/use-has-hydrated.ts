"use client";

import { useEffect, useState } from "react";

export function useHasHydrated() {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return isHydrated;
}

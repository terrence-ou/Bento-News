import { useCallback, useEffect, useState } from "react";
import { debounce } from "@/utils";

const useResize = () => {
  const [cols, setCols] = useState<number>(4);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 1024) {
      setCols(3);
    } else if (window.innerWidth < 1600) {
      setCols(4);
    } else if (window.innerWidth < 2000) {
      setCols(5);
    } else {
      setCols(6);
    }
  }, []);

  useEffect(() => {
    handleResize(); // we need to call this once to set the initial value
    const deboundResize = debounce(handleResize, 10);
    window.addEventListener("resize", deboundResize);
    return () => window.removeEventListener("resize", deboundResize);
  }, []);

  let defaultDisplayCount = 16;
  let gridCols = "grid-cols-4";

  switch (cols) {
    case 3:
      gridCols = "grid-cols-3";
      defaultDisplayCount = 12;
      break;
    case 5:
      gridCols = "grid-cols-5";
      defaultDisplayCount = 20;
      break;
    case 6:
      gridCols = "grid-cols-6";
      defaultDisplayCount = 24;
      break;
    default:
      gridCols = "grid-cols-4";
      defaultDisplayCount = 16;
  }

  return { cols, defaultDisplayCount, gridCols };
};

export default useResize;

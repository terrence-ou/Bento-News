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

  return { cols };
};

export default useResize;

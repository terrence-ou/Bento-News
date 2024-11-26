import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { Outlet } from "react-router-dom";
import { searchCountAtom } from "@/atoms/searchAtoms";
import Header from "@/components/Header";

const Root = () => {
  const [searchCount] = useAtom(searchCountAtom);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [searchCount]);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="bg-grid flex-1 max-h-full m-3 rounded-md outline-accent outline outline-[1px] overflow-y-auto scroll-smooth shadow-workspace"
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;

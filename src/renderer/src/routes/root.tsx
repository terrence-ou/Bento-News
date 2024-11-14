import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const Root = () => {
  return (
    <>
      <Header />
      <div className="bg-grid flex-1 max-h-full m-3 rounded-md outline-accent outline outline-[1px] overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Root;

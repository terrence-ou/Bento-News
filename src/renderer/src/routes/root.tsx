import { Outlet } from "react-router-dom";
import Header from "@/components/root/Header";

const Root = () => {
  return (
    <>
      <Header />
      <div className="bg-grid flex-1 m-3 rounded-md outline-accent outline outline-[1px]">
        <Outlet />
      </div>
    </>
  );
};

export default Root;

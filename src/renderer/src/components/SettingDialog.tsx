import { useState } from "react";
import { cn } from "@/utils";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { CircleUser, Newspaper, Search } from "lucide-react";

const settingMenu = ["Account", "Headlines", "Search"] as const;

const getIcon = (menu: (typeof settingMenu)[number]) => {
  const iconStyle = {
    className: "h-5 stroke-primary/80",
    strokeWidth: 1.5,
  };
  switch (menu) {
    case "Account":
      return <CircleUser {...iconStyle} />;
    case "Headlines":
      return <Newspaper {...iconStyle} />;
    case "Search":
      return <Search {...iconStyle} />;
  }
};

const getSelectionPos = (menu: (typeof settingMenu)[number]) => {
  switch (menu) {
    case "Account":
      return "top-0";
    case "Headlines":
      return "top-8";
    case "Search":
      return "top-16";
    default:
      return "top-0";
  }
};

const SettingDialog = () => {
  const [currMenu, setCurrMenu] =
    useState<(typeof settingMenu)[number]>("Account");

  return (
    <>
      <DialogHeader className="mb-3">
        <DialogTitle className="font-serif text-xl">
          Settings
        </DialogTitle>
        {/* the description placeholder is necessary to supress warnings */}
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-3 gap-4">
        <div className="relative flex flex-col items-start gap-2 text-[0.9rem] border-r">
          {settingMenu.map((menu) => (
            <button
              key={menu}
              onClick={() => setCurrMenu(menu)}
              className={cn(
                "flex items-center gap-2 focus-visible:outline-none transition-all duration-150 h-6 w-full z-20",
                currMenu === menu && "font-semibold"
              )}
            >
              {getIcon(menu)}
              {menu}
            </button>
          ))}
          <span
            className={cn(
              "absolute z-10 w-[90%] h-6 bg-primary/10 rounded-sm transition-all duration-150",
              getSelectionPos(currMenu)
            )}
          ></span>
        </div>
        <div className="col-span-2 pl-2 pr-4 w-full">
          <p className="text-sm">NewAPI key:</p>
          <input className="border w-full border-primary/30 rounded-[0.3rem] px-1 font-mono font-light text-sm" />
          <p className="text-sm">OpenAI key:</p>
          <input className="border w-full border-primary/80 rounded-sm px-1 font-mono font-light text-sm" />
        </div>
      </div>
    </>
  );
};

export default SettingDialog;

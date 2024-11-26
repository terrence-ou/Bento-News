import { useState } from "react";
import { cn } from "@/utils";
import { CircleUser, Newspaper, Search } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AccountSettings from "@/components/settings/AccountSettings";
import HeadlinesSettings from "./settings/HeadlinesSettings";

// Enum for the menu items
enum Menu {
  Account = "Account",
  Headlines = "Headlines",
  Search = "Search",
}

const iconStyle = {
  className: "h-5 stroke-primary/80",
  strokeWidth: 1.5,
};

const icons = {
  [Menu.Account]: <CircleUser {...iconStyle} />,
  [Menu.Headlines]: <Newspaper {...iconStyle} />,
  [Menu.Search]: <Search {...iconStyle} />,
};

const selectionPositions = {
  [Menu.Account]: "top-0",
  [Menu.Headlines]: "top-8",
  [Menu.Search]: "top-16",
};

const menuContent = {
  [Menu.Account]: <AccountSettings />,
  [Menu.Headlines]: <HeadlinesSettings />,
  [Menu.Search]: <></>,
};

// The SettingDialog component
const SettingsDialog = () => {
  const [currMenu, setCurrMenu] = useState<Menu>(Menu.Account);

  return (
    <>
      <DialogHeader className="mb-3">
        <DialogTitle className="font-serif text-xl">
          Settings
        </DialogTitle>
        {/* the description placeholder is necessary to supress warnings */}
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-3 gap-4 flex-1">
        <div className="relative flex flex-col items-start gap-2 text-[0.9rem] border-r">
          {Object.values(Menu).map((menu) => (
            <button
              key={menu}
              onClick={() => setCurrMenu(menu)}
              className={cn(
                "flex items-center gap-2 focus-visible:outline-none transition-all duration-150 h-6 w-full z-20",
                currMenu === menu && "font-semibold"
              )}
            >
              {icons[menu]}
              {menu}
            </button>
          ))}
          <span
            className={cn(
              "absolute z-10 w-[90%] h-6 bg-primary/10 rounded-sm transition-all duration-150",
              selectionPositions[currMenu]
            )}
          ></span>
        </div>
        <div className="col-span-2 pl-2 pr-4 w-full">
          {menuContent[currMenu]}
        </div>
      </div>
    </>
  );
};

export default SettingsDialog;

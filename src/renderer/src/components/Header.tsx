import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import { cn } from "@/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingsDialog from "@/components/SettingsDialog";
import { useAtomValue } from "jotai";
import { readFolderRouteAtom } from "@/atoms/routesAtoms";

const Header = () => {
  const navButtonStyle =
    "nav-button w-28 z-20 text-center rounded-full leading-tight transition-all duration-150";

  const location = useLocation();
  const currRoute = location.pathname.split("/")[1];

  // reading the active folder
  const activeFolder = useAtomValue(readFolderRouteAtom);

  return (
    <header className="w-full grid grid-cols-4 pt-3 px-6">
      <div className="relative mx-auto col-start-2 col-span-2 z-0 p-1 w-[360px] flex items-center justify-center gap-2 bg-accent rounded-full">
        <NavLink
          to="headlines"
          className={({ isActive }) =>
            cn(
              navButtonStyle,
              isActive ? "text-background" : "text-primary"
            )
          }
        >
          Headlines
        </NavLink>
        <NavLink
          to="search"
          className={({ isActive }) =>
            cn(
              navButtonStyle,
              isActive ? "text-background" : "text-primary"
            )
          }
        >
          Search
        </NavLink>
        <NavLink
          to={
            activeFolder === undefined
              ? "folders"
              : `folders/${activeFolder}`
          }
          className={({ isActive }) =>
            cn(
              navButtonStyle,
              isActive ? "text-background" : "text-primary"
            )
          }
        >
          Folders
        </NavLink>
        <span
          className={cn(
            "z-10 absolute h-[22px] w-28 bg-primary rounded-full transition-all duration-150",
            "top-[3px]",
            currRoute === "search"
              ? "left-[124px]"
              : currRoute === "folders"
                ? "left-[244px]"
                : "left-[4px]"
          )}
        ></span>
      </div>
      <div className="flex justify-end items-center focus-visible:outline-none">
        <Dialog>
          <DialogTrigger className="focus-visible:outline-none">
            <Settings
              className="nav-button w-8 h-6 stroke-primary/70 rounded-md hover:cursor-pointer hover:animate-spin-once hover:stroke-primary"
              strokeWidth={1.5}
            />
          </DialogTrigger>
          <DialogContent className="min-w-[650px] min-h-[450px]">
            <SettingsDialog />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;

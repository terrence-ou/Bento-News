import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils";

const Header = () => {
  const navButtonStyle =
    "nav-button w-28 z-20 text-center rounded-full leading-tight transition-all duration-150";

  const location = useLocation();
  const currRoute = location.pathname.split("/")[1];

  return (
    <header className="w-full flex justify-center items-center pt-3">
      <div className="relative z-0 p-1 flex items-center justify-center gap-2 bg-accent rounded-full">
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
          to="projects"
          className={({ isActive }) =>
            cn(
              navButtonStyle,
              isActive ? "text-background" : "text-primary"
            )
          }
        >
          Projects
        </NavLink>
        <span
          className={cn(
            "z-10 absolute h-[22px] w-28 bg-primary rounded-full transition-all duration-150",
            "top-[3px]",
            currRoute === "projects" ? "left-[124px]" : "left-[4px]"
          )}
        ></span>
      </div>
    </header>
  );
};

export default Header;

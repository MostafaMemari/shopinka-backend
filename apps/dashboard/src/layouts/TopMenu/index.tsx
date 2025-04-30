import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectTopMenu } from "../../stores/topMenuSlice";
import { useAppSelector } from "../../stores/hooks";
import _ from "lodash";
import { FormattedMenu, linkTo, nestedMenu } from "./top-menu";
import Lucide from "../../base-components/Lucide";
import clsx from "clsx";
import TopBar from "../../components/TopBar";
import MobileMenu from "../../components/MobileMenu";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";

function Main() {
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<Array<FormattedMenu>>([]);
  const topMenuStore = useAppSelector(selectTopMenu);
  const topMenu = () => nestedMenu(topMenuStore, location);

  useEffect(() => {
    setFormattedMenu(topMenu());
  }, [topMenuStore, location.pathname]);

  return (
    <div className="pt-2 pb-7 before:content-[''] before:absolute before:inset-0 before:bg-fixed before:bg-no-repeat before:bg-skew-pattern dark:before:bg-skew-pattern-dark">
      <DarkModeSwitcher />
      <MainColorSwitcher />
      <MobileMenu />
      <TopBar />
      {/* BEGIN: Top Menu */}
      <nav
        className={clsx([
          "hidden md:block xl:pt-[12px] z-50 relative xl:px-6 -mt-2 xl:-mt-[3px]",

          // Animation
          "animate-[0.4s_ease-in-out_0.3s_intro-top-menu] animate-fill-mode-forwards opacity-0 translate-y-[35px]",
        ])}
      >
        <ul className="h-[50px] flex flex-wrap">
          {formattedMenu.map((menu, menuKey) => (
            <li
              className={clsx([
                "relative [&:hover>ul]:block [&:hover>a>div:nth-child(2)>svg]:rotate-180",
                !menu.active && "[&:hover>a]:bg-primary/60 [&:hover>a]:dark:bg-transparent",
                !menu.active &&
                  "[&:hover>a]:before:content-[''] [&:hover>a]:before:block [&:hover>a]:before:inset-0 [&:hover>a]:before:bg-white/[0.04] [&:hover>a]:xl:before:bg-white/10 [&:hover>a]:before:rounded-full [&:hover>a]:xl:before:rounded-lg [&:hover>a]:before:absolute [&:hover>a]:before:z-[-1] [&:hover>a]:before:dark:bg-darkmode-700",
              ])}
              key={menuKey}
            >
              <MenuLink
                className={clsx({
                  [`opacity-0 translate-y-[50px] animate-[0.4s_ease-in-out_0.3s_intro-menu] animate-fill-mode-forwards animate-delay-${
                    (menuKey + 1) * 10
                  }`]: !menu.active,
                })}
                menu={menu}
                level="first"
              ></MenuLink>
              {/* BEGIN: Second Child */}
              {menu.subMenu && (
                <ul
                  className={clsx([
                    "shadow-[0px_3px_20px_#0000000b] bg-primary hidden w-56 absolute rounded-md z-20 px-0 mt-1 dark:bg-darkmode-600 dark:shadow-[0px_3px_7px_#0000001c]",
                    "before:block before:absolute before:w-full before:h-full before:bg-white/[0.04] before:inset-0 before:rounded-md before:z-[-1] dark:before:bg-black/10",
                    "after:w-full after:h-1 after:absolute after:top-0 after:left-0 after:-mt-1 after:cursor-pointer",
                  ])}
                >
                  {menu.subMenu.map((subMenu, subMenuKey) => (
                    <li
                      className="relative [&:hover>ul]:block [&:hover>a>div:nth-child(2)>svg]:rotate-90"
                      key={subMenuKey}
                    >
                      <MenuLink menu={subMenu} level="second"></MenuLink>
                      {/* BEGIN: Third Child */}
                      {subMenu.subMenu && (
                        <ul
                          className={clsx([
                            "shadow-[0px_3px_20px_#0000000b] right-[100%] bg-primary hidden rounded-md mt-0 mr-0 top-0 w-56 absolute z-20 px-0 dark:bg-darkmode-600 dark:shadow-[0px_3px_7px_#0000001c]",
                            "before:block before:absolute before:w-full before:h-full before:bg-white/[0.04] before:inset-0 before:rounded-md before:z-[-1] dark:before:bg-black/10",
                          ])}
                        >
                          {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
                            <li
                              className="relative [&:hover>ul]:block [&:hover>a>div:nth-child(2)>svg]:rotate-90"
                              key={lastSubMenuKey}
                            >
                              <MenuLink menu={lastSubMenu} level="third"></MenuLink>
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* END: Third Child */}
                    </li>
                  ))}
                </ul>
              )}
              {/* END: Second Child */}
            </li>
          ))}
        </ul>
      </nav>
      {/* END: Top Menu */}
      {/* BEGIN: Content */}
      <div
        className={clsx([
          "relative",
          "before:content-[''] before:w-[95%] before:z-[-1] before:rounded-[1.3rem] before:bg-transparent xl:before:bg-white/10 before:h-full before:-mt-4 before:absolute before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/50",

          // Animation
          "before:translate-y-[35px] before:opacity-0 before:animate-[0.4s_ease-in-out_0.1s_intro-wrapper] before:animate-fill-mode-forwards",
        ])}
      >
        <div
          className={clsx([
            "translate-y-0 bg-transparent xl:bg-primary flex rounded-[1.3rem] md:pt-[80px] -mt-[7px] md:-mt-[67px] xl:-mt-[62px] dark:bg-transparent xl:dark:bg-darkmode-400",
            "before:hidden xl:before:block before:absolute before:inset-0 before:bg-black/[0.15] before:rounded-[1.3rem] before:z-[-1]",

            // Animation
            "animate-[0.4s_ease-in-out_0.2s_intro-wrapper] animate-fill-mode-forwards translate-y-[35px]",
          ])}
        >
          {/* BEGIN: Content */}
          <div className="px-4 md:px-[22px] max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm bg-slate-100 dark:bg-darkmode-700 before:content-[''] before:w-full before:h-px before:block">
            <Outlet />
          </div>
          {/* END: Content */}
        </div>
      </div>
      {/* END: Content */}
    </div>
  );
}

function MenuLink(props: { className?: string; menu: FormattedMenu; level: "first" | "second" | "third" }) {
  const navigate = useNavigate();
  return (
    <a
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "h-[55px] xl:h-[47px] flex items-center px-5 mr-1 text-white relative rounded-full xl:rounded-lg",
        {
          "px-0 mr-0": props.level != "first",
          "mt-[3px]": props.level == "first",
          "bg-slate-100 dark:bg-darkmode-700 xl:bg-primary": props.level == "first" && props.menu.active,
          "before:content-[''] before:hidden xl:before:block before:inset-0 before:bg-white/[0.08] before:rounded-lg before:absolute before:border-b-[3px] before:border-solid before:border-black/10 before:dark:border-black/10 before:dark:bg-darkmode-700":
            props.level == "first" && props.menu.active,
          "after:content-[''] after:animate-[0.3s_ease-in-out_1s_active-top-menu-chevron] after:animate-fill-mode-forwards after:hidden xl:after:block after:w-[20px] after:h-[80px] after:-mb-[74px] after:bg-menu-active after:bg-no-repeat after:bg-cover after:absolute after:left-0 after:right-0 after:bottom-0 after:mx-auto after:transform after:rotate-90 after:opacity-0 dark:after:bg-menu-active-dark":
            props.level == "first" && props.menu.active,
        },
        props.className,
      ])}
      onClick={(event) => {
        event.preventDefault();
        linkTo(props.menu, navigate);
      }}
    >
      <div
        className={clsx([
          "z-10 dark:text-slate-400",
          props.level == "first" && props.menu.active && "dark:text-white text-primary xl:text-white",
          props.level == "first" && "-mt-[3px]",
        ])}
      >
        <Lucide icon={props.menu.icon} />
      </div>
      <div
        className={clsx([
          "w-full mr-3 flex items-center whitespace-nowrap z-10 dark:text-slate-400",
          props.level == "first" && props.menu.active && "font-medium dark:text-white text-slate-800 xl:text-white",
          props.level == "first" && "-mt-[3px]",
        ])}
      >
        {props.menu.title}
        {props.menu.subMenu && (
          <Lucide
            icon="ChevronDown"
            className={clsx([
              "transform transition ease-in duration-200 w-4 h-4 hidden xl:block",
              props.level == "first" && "mr-2",
              props.level != "first" && "duration-100 mr-auto",
            ])}
          />
        )}
      </div>
    </a>
  );
}

export default Main;

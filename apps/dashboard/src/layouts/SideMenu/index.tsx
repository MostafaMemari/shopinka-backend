import { Transition } from "react-transition-group";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectSideMenu } from "../../stores/sideMenuSlice";
import { useAppSelector } from "../../stores/hooks";
import { FormattedMenu, linkTo, nestedMenu, enter, leave } from "./side-menu";
import Lucide from "../../base-components/Lucide";
import clsx from "clsx";
import TopBar from "../../components/TopBar";
import MobileMenu from "../../components/MobileMenu";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import SideMenuTooltip from "../../components/SideMenuTooltip";

function Main() {
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<Array<FormattedMenu | "divider">>([]);
  const sideMenuStore = useAppSelector(selectSideMenu);
  const sideMenu = () => nestedMenu(sideMenuStore, location);

  useEffect(() => {
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location.pathname]);

  return (
    <div className="pt-2 pb-7 before:content-[''] before:absolute before:inset-0 before:bg-fixed before:bg-no-repeat before:bg-skew-pattern dark:before:bg-skew-pattern-dark">
      <DarkModeSwitcher />
      <MainColorSwitcher />
      <MobileMenu />
      <TopBar />
      <div
        className={clsx([
          "relative",
          "before:content-[''] before:w-[95%] before:z-[-1] before:rounded-[1.3rem] before:bg-white/10 before:h-full before:-mt-4 before:absolute before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/50",

          // Animation
          "before:translate-y-[35px] before:opacity-0 before:animate-[0.4s_ease-in-out_0.1s_intro-wrapper] before:animate-fill-mode-forwards",
        ])}
      >
        <div
          className={clsx([
            "translate-y-0 bg-primary flex rounded-[1.3rem] -mt-[7px] md:mt-0 dark:bg-darkmode-400",
            "before:block before:absolute before:inset-0 before:bg-black/[0.15] before:rounded-[1.3rem] before:z-[-1]",

            // Animation
            "animate-[0.4s_ease-in-out_0.2s_intro-wrapper] animate-fill-mode-forwards translate-y-[35px]",
          ])}
        >
          {/* BEGIN: Side Menu */}
          <nav className="hidden md:block w-[105px] xl:w-[250px] px-5 pt-8 pb-16 overflow-x-hidden">
            <ul>
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>
                menu == "divider" ? (
                  <Divider
                    type="li"
                    className={clsx([
                      "my-6",

                      // Animation
                      `opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay-${
                        (menuKey + 1) * 10
                      }`,
                    ])}
                    key={menuKey}
                  ></Divider>
                ) : (
                  <li key={menuKey}>
                    <Menu
                      className={clsx({
                        // Animation
                        [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                          (menuKey + 1) * 10
                        }`]: !menu.active,
                      })}
                      menu={menu}
                      formattedMenuState={[formattedMenu, setFormattedMenu]}
                      level="first"
                    ></Menu>
                    {/* BEGIN: Second Child */}
                    {menu.subMenu && (
                      <Transition in={menu.activeDropdown} onEnter={enter} onExit={leave} timeout={300}>
                        <ul
                          className={clsx([
                            "bg-white/[0.04] rounded-lg relative dark:bg-transparent",
                            "before:content-[''] before:block before:inset-0 before:bg-primary/60 before:rounded-lg before:absolute before:z-[-1] before:dark:bg-darkmode-900/30",
                            {
                              block: menu.activeDropdown,
                            },
                            { hidden: !menu.activeDropdown },
                          ])}
                        >
                          {menu.subMenu.map((subMenu, subMenuKey) => (
                            <li key={subMenuKey}>
                              <Menu
                                className={`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                  (subMenuKey + 1) * 10
                                }`}
                                menu={subMenu}
                                formattedMenuState={[formattedMenu, setFormattedMenu]}
                                level="second"
                              ></Menu>
                              {/* BEGIN: Third Child */}
                              {subMenu.subMenu && (
                                <Transition in={subMenu.activeDropdown} onEnter={enter} onExit={leave} timeout={300}>
                                  <ul
                                    className={clsx([
                                      "bg-white/[0.04] rounded-lg relative dark:bg-transparent",
                                      "before:content-[''] before:block before:inset-0 before:bg-primary/60 before:rounded-lg before:absolute before:z-[-1] before:dark:bg-darkmode-900/30",
                                      {
                                        block: subMenu.activeDropdown,
                                      },
                                      { hidden: !subMenu.activeDropdown },
                                    ])}
                                  >
                                    {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
                                      <li key={lastSubMenuKey}>
                                        <Menu
                                          className={`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                            (lastSubMenuKey + 1) * 10
                                          }`}
                                          menu={lastSubMenu}
                                          formattedMenuState={[formattedMenu, setFormattedMenu]}
                                          level="third"
                                        ></Menu>
                                      </li>
                                    ))}
                                  </ul>
                                </Transition>
                              )}
                              {/* END: Third Child */}
                            </li>
                          ))}
                        </ul>
                      </Transition>
                    )}
                    {/* END: Second Child */}
                  </li>
                )
              )}
              {/* END: First Child */}
            </ul>
          </nav>
          {/* END: Side Menu */}
          {/* BEGIN: Content */}
          <div className="px-4 md:px-[22px] max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm bg-slate-100 dark:bg-darkmode-700 before:content-[''] before:w-full before:h-px before:block">
            <Outlet />
          </div>
          {/* END: Content */}
        </div>
      </div>
    </div>
  );
}

function Menu(props: {
  className?: string;
  menu: FormattedMenu;
  formattedMenuState: [(FormattedMenu | "divider")[], Dispatch<SetStateAction<(FormattedMenu | "divider")[]>>];
  level: "first" | "second" | "third";
}) {
  const navigate = useNavigate();
  const [formattedMenu, setFormattedMenu] = props.formattedMenuState;

  return (
    <SideMenuTooltip
      as="a"
      content={props.menu.title}
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "h-[50px] flex items-center pr-5 text-white mb-1 relative rounded-lg", // #rtl
        {
          // #rtl
          "dark:text-slate-300": props.menu.active && props.level != "first",
          "text-white/70 dark:text-slate-400": !props.menu.active && props.level != "first",
          "bg-primary dark:bg-transparent": props.menu.active && props.level == "first",
          "before:content-[''] before:block before:inset-0 before:bg-white/[0.08] before:rounded-lg before:absolute before:border-b-[3px] before:border-solid before:border-black/10 before:dark:border-black/10 before:dark:bg-darkmode-700":
            props.menu.active && props.level == "first",
          "after:content-[''] after:w-[20px] after:h-[80px] after:ml-[-27px] after:bg-no-repeat after:bg-cover after:absolute after:top-0 after:bottom-0 after:left-0 after:my-auto after:bg-menu-active dark:after:bg-menu-active-dark after:rotate-180":
            props.menu.active && props.level == "first",
          "hover:bg-primary/60 hover:dark:bg-transparent hover:before:block hover:before:inset-0 hover:before:bg-white/[0.04] hover:before:rounded-lg hover:before:absolute hover:before:z-[-1] hover:before:dark:bg-darkmode-700":
            !props.menu.active && !props.menu.activeDropdown && props.level == "first",

          // Animation
          "after:mr-[-47px] after:opacity-0 after:animate-[0.3s_ease-in-out_1s_active-side-menu-chevron] after:animate-fill-mode-forwards":
            props.menu.active && props.level == "first",
        },
        props.className,
      ])}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        linkTo(props.menu, navigate);
        setFormattedMenu([...formattedMenu]);
      }}
    >
      <div
        className={clsx({
          "z-10 dark:text-slate-300": props.menu.active && props.level == "first",
          "dark:text-slate-400": !props.menu.active && props.level == "first",
        })}
      >
        <Lucide icon={props.menu.icon} />
      </div>
      <div
        className={clsx(
          "hidden xl:flex items-center w-full mr-3", // #rtl
          { "font-medium": props.menu.active && props.level != "first" },
          {
            "font-medium z-10 dark:text-slate-300": props.menu.active && props.level == "first",
          },
          {
            "dark:text-slate-400": !props.menu.active && props.level == "first",
          }
        )}
      >
        {props.menu.title}
        {props.menu.subMenu && (
          <div
            className={clsx([
              "transition ease-in duration-100 mr-auto ml-5 hidden xl:block", // #rtl
              { "transform rotate-180": props.menu.activeDropdown },
            ])}
          >
            <Lucide className="w-4 h-4" icon="ChevronDown" />
          </div>
        )}
      </div>
    </SideMenuTooltip>
  );
}

function Divider<C extends React.ElementType>(props: { as?: C } & React.ComponentPropsWithoutRef<C>) {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([props.className, "w-full h-px bg-white/[0.08] z-10 relative dark:bg-white/[0.07]"])}
    ></Component>
  );
}

export default Main;

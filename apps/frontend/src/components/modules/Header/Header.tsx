import Link from "next/link";
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineMenu,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import DesktopLogo from "../../ui/Logo/DesktopLogo";
import SearchBar from "./SearchBar/SearchBarDesktop";
import ProfileDropdown from "./ProfileDropdown";
import BasketDropdown from "./Basket";
import SearchBarMobile from "./SearchBar/SearchBarMobile";
import MobileLogo from "../../ui/Logo/MobileLogo";

function Header() {
  return (
    <header>
      <div className="fixed left-0 right-0 top-0 z-30 bg-muted">
        <div>
          <div className="hidden md:block">
            <div className="container relative z-30 flex max-w-[1680px] items-center justify-between gap-x-4 bg-muted py-4">
              <DesktopLogo />
              <SearchBar />
              <div className="flex">
                <ProfileDropdown />
                <BasketDropdown />
                <div className="cursor-pointer" id="toggleThemeDesktop">
                  <div className="dark:hidden">
                    <HiOutlineMoon className="h-6 w-6" />
                  </div>
                  <div className="hidden dark:block">
                    <HiOutlineSun className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Bottom Section --> */}
            <div
              className="absolute left-0 right-0 top-full z-20 bg-muted shadow-xs transition-transform duration-300"
              data-onscrollclassname="-translate-y-full"
            >
              <nav
                id="header-desktop-navbar"
                className="container relative flex max-w-[1680px] items-center gap-x-2"
              >
                <ul className="group z-10" id="desktopMegamenuWrapper">
                  <div className="relative flex cursor-pointer items-center gap-x-2 pb-2">
                    <div>
                      <HiOutlineMenu className="h-5 w-5" />
                    </div>
                    <div>دسته‌ بندی‌ ها</div>
                  </div>

                  {/* <!-- Mega menu --> */}

                  <div className="absolute top-full w-full max-w-[1000px]">
                    <div
                      className="relative hidden rounded-b-lg bg-muted shadow-base"
                      id="desktopMegamenu"
                    >
                      <div className="flex h-[450px] max-h-[450px] w-full overflow-hidden rounded-b-lg pt-0.5">
                        {/* <!-- Right side --> */}
                        <div
                          className="main-scroll w-50 overflow-y-auto bg-background"
                          dir="ltr"
                        >
                          <ul dir="rtl" id="mega-menu-parents">
                            <li>
                              <Link
                                className="flex py-4 pr-4"
                                href="./shop.html"
                              >
                                {" "}
                                مردانه{" "}
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Left side --> */}

                        <div
                          className="main-scroll h-[450px] max-h-[450px] w-full overflow-auto"
                          dir="ltr"
                        >
                          <div
                            className="flex grow p-5"
                            dir="rtl"
                            id="mega-menu-childs"
                          >
                            {/* <!-- categories Child --> */}
                            <div className="hidden">
                              {/* <!-- head --> */}
                              <div className="mb-4">
                                <Link
                                  className="flex items-center gap-x-1 py-2 text-sm text-primary"
                                  href="./shop.html"
                                >
                                  <div>مشاهده همه</div>
                                  <HiOutlineChevronLeft className="h-5 w-5" />
                                </Link>
                              </div>
                              <div className="flex grow flex-wrap gap-x-14 gap-y-8">
                                <div className="space-y-2">
                                  <Link
                                    className="flex items-center gap-x-2 hover:text-primary"
                                    href="./shop.html"
                                  >
                                    <span className="h-5 w-0.5 rounded-full bg-primary dark:bg-primary"></span>
                                    <div>لباس مردانه</div>
                                    <HiOutlineChevronLeft className="h-5 w-5" />
                                  </Link>
                                  <ul>
                                    <li>
                                      <Link
                                        className="block py-2 text-sm text-text/90 hover:text-primary"
                                        href="./shop.html"
                                      >
                                        {" "}
                                        شلوار{" "}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>

                <div
                  id="header-desktop-navbar-indicator"
                  className="absolute bottom-0 h-[0.15625rem] z-0 rounded-2xl end-0 transition-all duration-[350ms] w-0"
                ></div>
              </nav>
            </div>
          </div>
        </div>

        <div>
          <div className="md:hidden">
            <div className="container relative z-30 flex h-16 items-center justify-between gap-x-4 bg-muted">
              <button
                aria-controls="mobile-menu-drawer-navigation"
                className="cursor-pointer"
                data-drawer-show="mobile-menu-drawer-navigation"
                data-drawer-target="mobile-menu-drawer-navigation"
                data-drawer-placement="right"
                type="button"
              >
                <HiOutlineMenu className="h-6 w-6" />
              </button>

              {/* <!-- logo --> */}
              <MobileLogo />
              <div className="flex gap-x-1">
                {/* <!-- Account --> */}
                <ProfileDropdown />
                {/* <!-- Basket --> */}
                <BasketDropdown />
              </div>
            </div>
            {/* <!-- Bottom Section --> */}
            <div
              className="absolute left-0 right-0 top-full z-20 bg-muted pb-4 transition-transform duration-300"
              id="mobile-header-bottom"
            >
              <div className="container">
                <SearchBarMobile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import DesktopLogo from "../ui/Logo/DesktopLogo";
import ProfileDropdown from "./ProfileDropdown";
import MobileLogo from "../ui/Logo/MobileLogo";
import TopbarContainer from "./TopbarContainer";
import DesktopNavbar from "./DesktopNavbar";
import { categories } from "@/mock/categories";
import MobileMenu from "./MobileMenu";
import SearchBarBase from "./SearchBar";
import { mockProductItems } from "@/mock/searchBar";
import BasketDropdown from "./Basket/BasketDropdown";

function Header() {
  return (
    <TopbarContainer>
      <div>
        <div className="hidden md:block">
          <div className="container relative z-30 flex max-w-[1680px] items-center justify-between gap-x-4 bg-muted py-4">
            <DesktopLogo />
            <SearchBarBase recentSearchItems={mockProductItems} productItems={mockProductItems} />
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
          <div className="absolute left-0 right-0 top-full z-20 bg-muted shadow-xs transition-transform duration-300">
            <DesktopNavbar categories={categories} />
          </div>
        </div>
      </div>

      <div>
        <div className="md:hidden">
          <div className="container relative z-30 flex h-16 items-center justify-between gap-x-4 bg-muted">
            <MobileMenu categories={categories} />

            <MobileLogo />
            <div className="flex gap-x-1">
              <ProfileDropdown />
              <BasketDropdown />
            </div>
          </div>
          <div className="absolute left-0 right-0 top-full z-20 bg-muted pb-4 transition-transform duration-300" id="mobile-header-bottom">
            <div className="container">
              <SearchBarBase isMobile recentSearchItems={mockProductItems} productItems={mockProductItems} />
            </div>
          </div>
        </div>
      </div>
    </TopbarContainer>
  );
}
export default Header;

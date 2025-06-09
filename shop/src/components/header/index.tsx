import DesktopLogo from '../ui/Logo/DesktopLogo';
import ProfileDropdown from './ProfileDropdown';
import TopbarContainer from './TopbarContainer';
import { categories } from '@/mock/categories';
import SearchBarBase from './SearchBar';
import { mockProductItems } from '@/mock/searchBar';
import BasketDropdown from '../../modules/cart/views/BasketDropdown';
import DesktopNavbar from './DesktopNavbar';

function Header() {
  return (
    <TopbarContainer>
      <>
        <div className="hidden lg:block">
          <div className="container relative z-30 flex max-w-[1640px] items-center justify-between gap-x-4 bg-muted py-4">
            <div className="flex items-center gap-x-6">
              <DesktopLogo />
              <SearchBarBase recentSearchItems={mockProductItems} productItems={mockProductItems} />
            </div>
            <div className="flex items-center gap-x-3">
              <ProfileDropdown />
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <BasketDropdown />
            </div>
          </div>

          <div className="absolute left-0 right-0 z-20">
            <DesktopNavbar categories={categories} />
          </div>
        </div>
      </>

      {/* <div>
        <div className="lg:hidden">
          <div className="container relative z-30 flex h-16 items-center justify-between gap-x-4 bg-muted">
            <MobileMenu categories={categories} />

            <MobileLogo />
          </div>
          <div className="absolute left-0 right-0 top-full z-20 bg-muted pb-4 transition-transform duration-300" id="mobile-header-bottom">
            <div className="container">
              <SearchBarBase isMobile recentSearchItems={mockProductItems} productItems={mockProductItems} />
            </div>
          </div>
        </div>
      </div> */}
    </TopbarContainer>
  );
}
export default Header;

import { useState, Fragment } from "react";
import Lucide from "../../base-components/Lucide";
import logoUrl from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../base-components/Breadcrumb";
import { FormInput } from "../../base-components/Form";
import { Menu, Popover } from "../../base-components/Headless";
import fakerData from "../../utils/faker";
import _ from "lodash";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { logout } from "../../services/Axios/Request/auth";

function Main() {
  const navigate = useNavigate();
  const [searchDropdown, setSearchDropdown] = useState(false);

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
        <div className="flex items-center h-full">
          {/* BEGIN: Logo */}
          <Link to="/" className="hidden -intro-x md:flex">
            <img alt="لوگو" className="w-6" src={logoUrl} />
            <span className="mr-3 text-lg text-white">پنل مدیریت</span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <Breadcrumb light className="h-full md:mr-10 md:pr-10 md:border-r border-white/[0.08] ml-auto -intro-x">
            <Breadcrumb.Link to="/" active={true}>
              داشبورد
            </Breadcrumb.Link>
            <Breadcrumb.Link to="/">برنامه</Breadcrumb.Link>
          </Breadcrumb>
          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          {/* #rtl */}
          <div className="relative ml-3 intro-x sm:ml-6">
            <div className="hidden search sm:block">
              <FormInput
                type="text"
                className="border-transparent w-56 shadow-none rounded-full bg-slate-200 pl-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400/70"
                placeholder="Search..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
              />
              {/* rtl */}
              <Lucide icon="Search" className="absolute inset-y-0 left-0 w-5 h-5 my-auto ml-3 text-slate-600 dark:text-slate-500" />
            </div>
            <a className="relative text-white/70 sm:hidden" href="">
              <Lucide icon="Search" className="w-5 h-5 dark:text-slate-500" />
            </a>
            <Transition
              as={Fragment}
              show={searchDropdown}
              enter="transition-all ease-linear duration-150"
              enterFrom="mt-5 invisible opacity-0 translate-y-1"
              enterTo="mt-[3px] visible opacity-100 translate-y-0"
              leave="transition-all ease-linear duration-150"
              leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
              leaveTo="mt-5 invisible opacity-0 translate-y-1"
            >
              {/* #rtl */}
              <div className="absolute left-0 z-10 mt-[3px]">
                <div className="w-[450px] p-5 box">
                  <div className="mb-2 font-medium">صفحات</div>
                  <div className="mb-5">
                    <a href="" className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success">
                        <Lucide icon="Inbox" className="w-4 h-4" />
                      </div>
                      <div className="mr-3">تنظیمات ایمیل</div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending">
                        <Lucide icon="Users" className="w-4 h-4" />
                      </div>
                      <div className="mr-3">کاربران و دسترسی‌ها</div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                        <Lucide icon="CreditCard" className="w-4 h-4" />
                      </div>
                      <div className="mr-3">گزارش تراکنش‌ها</div>
                    </a>
                  </div>
                  <div className="mb-2 font-medium">کاربران</div>
                  <div className="mb-5">
                    {_.take(fakerData, 4).map((faker, fakerKey) => (
                      <a key={fakerKey} href="" className="flex items-center mt-2">
                        <div className="w-8 h-8 image-fit">
                          <img alt="تصویر کاربر" className="rounded-full" src={faker.photos[0]} />
                        </div>
                        <div className="mr-3">{faker.users[0].name}</div>
                        <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">{faker.users[0].email}</div>
                      </a>
                    ))}
                  </div>
                  <div className="mb-2 font-medium">محصولات</div>
                  {_.take(fakerData, 4).map((faker, fakerKey) => (
                    <a key={fakerKey} href="" className="flex items-center mt-2">
                      <div className="w-8 h-8 image-fit">
                        <img alt="تصویر محصول" className="rounded-full" src={faker.images[0]} />
                      </div>
                      <div className="mr-3">{faker.products[0].name}</div>
                      <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">{faker.products[0].category}</div>
                    </a>
                  ))}
                </div>
              </div>
            </Transition>
          </div>
          {/* END: Search */}
          {/* BEGIN: Notifications */}
          <Popover className="ml-4 intro-x sm:ml-6">
            <Popover.Button
              className="
              relative text-white/70 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
            >
              <Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
            </Popover.Button>
            <Popover.Panel className="w-[280px] sm:w-[350px] p-5 mt-2">
              <div className="mb-5 font-medium">اعلان‌ها</div>
              {_.take(fakerData, 5).map((faker, fakerKey) => (
                <div key={fakerKey} className={clsx(["cursor-pointer relative flex items-center", { "mt-5": fakerKey }])}>
                  <div className="relative flex-none w-12 h-12 ml-1 image-fit">
                    <img alt="تصویر کاربر" className="rounded-full" src={faker.photos[0]} />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                  </div>
                  <div className="mr-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href="" className="mr-5 font-medium truncate">
                        {faker.users[0].name}
                      </a>
                      <div className="mr-auto text-xs text-slate-400 whitespace-nowrap">{faker.times[0]}</div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">{faker.news[0].shortContent}</div>
                  </div>
                </div>
              ))}
            </Popover.Panel>
          </Popover>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Menu>
            <Menu.Button className="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
              <img alt="تصویر پروفایل" src={fakerData[9].photos[0]} />
            </Menu.Button>
            <Menu.Items className="w-56 mt-px relative bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
              <Menu.Header className="font-normal">
                <div className="font-medium">{fakerData[0].users[0].name}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">{fakerData[0].jobs[0]}</div>
              </Menu.Header>
              <Menu.Divider className="bg-white/[0.08]" />
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="User" className="w-4 h-4 ml-2" /> پروفایل
              </Menu.Item>
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="Edit" className="w-4 h-4 ml-2" /> افزودن حساب
              </Menu.Item>
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="Lock" className="w-4 h-4 ml-2" /> تغییر رمز عبور
              </Menu.Item>
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="HelpCircle" className="w-4 h-4 ml-2" /> راهنما
              </Menu.Item>
              <Menu.Divider className="bg-white/[0.08]" />
              <Menu.Item className="hover:bg-white/5" onClick={handleLogout}>
                <Lucide icon="ToggleRight" className="w-4 h-4 ml-2" /> خروج
              </Menu.Item>
            </Menu.Items>
          </Menu>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;

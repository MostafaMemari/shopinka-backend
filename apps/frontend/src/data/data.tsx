import { TbSmartHome } from "react-icons/tb";
import { HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi";
import { RxCountdownTimer } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { RiAccountCircle2Line } from "react-icons/ri";

export const menuItems = [
  { href: "/profile", icon: TbSmartHome, label: "پیشخوان" },
  { href: "/profile/orders", icon: HiOutlineShoppingBag, label: "سفارش ها" },
  { href: "/profile/favorite", icon: HiOutlineHeart, label: "علاقه‌مندی ها" },
  { href: "/profile/recent", icon: RxCountdownTimer, label: "بازدید های اخیر" },
  {
    href: "/notification",
    icon: IoMdNotificationsOutline,
    label: "پیام ها",
    hasBadge: true,
  },
  { href: "/profile/address", icon: GrLocation, label: "آدرس ها" },
  {
    href: "/profile/personal-info",
    icon: RiAccountCircle2Line,
    label: "اطلاعات حساب کاربری",
  },
];

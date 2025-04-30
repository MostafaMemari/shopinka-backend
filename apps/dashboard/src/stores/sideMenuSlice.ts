import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "ShoppingCart",
      title: "محصولات",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/products",
          title: "مدیریت",
        },
        {
          icon: "Activity",
          pathname: "/products/purchase",
          title: "خرید",
        },
        {
          icon: "Activity",
          pathname: "/products/sales",
          title: "فروش",
        },
        {
          icon: "Activity",
          pathname: "/products/robot",
          title: "ربات",
        },
      ],
    },
    {
      icon: "ShoppingBag",
      title: "تراکنش ها",
      pathname: "/transactions",
    },
    {
      icon: "Droplet",
      title: "رنگ",
      pathname: "/colors",
    },
    {
      icon: "ShoppingBag",
      title: "دسته بندی",
      pathname: "/categories",
    },
    {
      icon: "Users",
      title: "فروشنده",
      pathname: "/sellers",
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;

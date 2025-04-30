import { selectColorScheme, setColorScheme, ColorSchemes } from "../../stores/colorSchemeSlice";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import clsx from "clsx";

function Main() {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  const setColorSchemeClass = () => {
    const el = document.querySelectorAll("html")[0];
    el.setAttribute("class", colorScheme);
    darkMode && el.classList.add("dark");
  };

  const switchColorScheme = (colorScheme: ColorSchemes) => {
    dispatch(setColorScheme(colorScheme));
    localStorage.setItem("colorScheme", colorScheme);
    setColorSchemeClass();
  };

  setColorSchemeClass();

  return (
    <>
      {/* BEGIN: Main Color Switcher */}
      <div className="fixed bottom-0 left-0 z-50 flex items-center justify-center h-12 px-5 mb-10 border rounded-full shadow-md box ml-52">
        <a
          onClick={() => {
            switchColorScheme("default");
          }}
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-blue-900 rounded-full border-4 ml-1 hover:border-slate-200": true,
            "border-slate-300 dark:border-darkmode-800/80": colorScheme == "default",
            "border-white dark:border-darkmode-600": colorScheme != "default",
          })}
        ></a>
        <a
          onClick={() => {
            switchColorScheme("theme-1");
          }}
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-emerald-900 rounded-full border-4 ml-1 hover:border-slate-200": true,
            "border-slate-300 dark:border-darkmode-800/80": colorScheme == "theme-1",
            "border-white dark:border-darkmode-600": colorScheme != "theme-1",
          })}
        ></a>
        <a
          onClick={() => {
            switchColorScheme("theme-2");
          }}
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-blue-800 rounded-full border-4 ml-1 hover:border-slate-200": true,
            "border-slate-300 dark:border-darkmode-800/80": colorScheme == "theme-2",
            "border-white dark:border-darkmode-600": colorScheme != "theme-2",
          })}
        ></a>
        <a
          onClick={() => {
            switchColorScheme("theme-3");
          }}
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-cyan-900 rounded-full border-4 ml-1 hover:border-slate-200": true,
            "border-slate-300 dark:border-darkmode-800/80": colorScheme == "theme-3",
            "border-white dark:border-darkmode-600": colorScheme != "theme-3",
          })}
        ></a>
        <a
          onClick={() => {
            switchColorScheme("theme-4");
          }}
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-indigo-900 rounded-full border-4 hover:border-slate-200": true,
            "border-slate-300 dark:border-darkmode-800/80": colorScheme == "theme-4",
            "border-white dark:border-darkmode-600": colorScheme != "theme-4",
          })}
        ></a>
        <div className="hidden mr-4 sm:block text-slate-600 dark:text-slate-200">انتخاب رنگ</div>
      </div>
      {/* END: Main Color Switcher */}
    </>
  );
}

export default Main;

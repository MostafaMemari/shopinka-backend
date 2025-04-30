import { selectDarkMode, setDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import clsx from "clsx";

function Main() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  const setDarkModeClass = () => {
    const el = document.querySelectorAll("html")[0];
    darkMode ? el.classList.add("dark") : el.classList.remove("dark");
  };

  const switchMode = () => {
    dispatch(setDarkMode(!darkMode));
    localStorage.setItem("darkMode", (!darkMode).toString());
    setDarkModeClass();
  };

  setDarkModeClass();

  return (
    <>
      {/* BEGIN: Dark Mode Switcher */}
      <div
        className="fixed bottom-0 left-0 z-50 flex items-center justify-center w-40 h-12 mb-10 ml-10 border rounded-full shadow-md cursor-pointer box"
        onClick={switchMode}
      >
        <div
          className={clsx([
            "border w-[38px] h-[24px] p-px outline-none rounded-full relative cursor-pointer",
            "before:content-[''] before:w-[22px] before:h-[22px] before:transition-all before:duration-200 before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:absolute before:inset-y-0 before:my-auto before:rounded-full",
            {
              "bg-primary border-primary": darkMode,
              "before:ml-[13px] before:bg-white": darkMode,
            },
          ])}
        ></div>
        <div className="mr-4 text-slate-600 dark:text-slate-200">دارک مود</div>
      </div>
      {/* END: Dark Mode Switcher */}
    </>
  );
}

export default Main;

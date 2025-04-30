import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import errorIllustration from "../../assets/images/error-illustration.svg";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary to-blue-900 dark:from-darkmode-800 dark:to-darkmode-600 py-8">
      <DarkModeSwitcher />
      <MainColorSwitcher />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center lg:flex-row lg:text-right gap-10">
          <div className="intro-x animate-fade-in lg:ml-20">
            <img
              alt="تصویر خطای 404"
              className="w-[300px] sm:w-[400px] lg:w-[450px] h-auto transform hover:scale-105 transition-transform duration-300"
              src={errorIllustration}
            />
          </div>
          <div className="mt-10 lg:mt-0 text-white">
            <h1 className="font-bold intro-x text-7xl sm:text-8xl animate-pulse">404</h1>
            <h2 className="mt-5 text-xl sm:text-2xl lg:text-3xl font-medium intro-x">اوه! صفحه‌ای که دنبالش هستید پیدا نشد.</h2>
            <p className="mt-3 text-base sm:text-lg intro-x text-slate-200">ممکنه آدرس رو اشتباه وارد کرده باشید یا صفحه منتقل شده باشه.</p>
            <Button
              variant="primary"
              className="mt-8 px-6 py-3 text-white intro-x bg-primary hover:bg-primary-dark hover:shadow-lg transition-all duration-300"
              onClick={() => navigate("/")}
            >
              بازگشت به صفحه اصلی
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

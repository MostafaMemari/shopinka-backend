import React from "react";
import { LucideProps } from "lucide-react";
import { useMemo } from "react";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";

interface LoadingIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ icon = "puff", className = "", ...props }) => {
  const darkMode = useAppSelector(selectDarkMode);
  const iconColor = useMemo(() => {
    return !darkMode ? props.color : "#ffffff";
  }, [darkMode]);

  return (
    <div className={`loading-icon ${className}`} {...props}>
      <i className={`fas fa-${icon}`} />
    </div>
  );
};

export default LoadingIcon;

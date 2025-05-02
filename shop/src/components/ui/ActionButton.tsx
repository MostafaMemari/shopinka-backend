"use client";

import { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onClick: () => void;
  label: string;
  hoverColor?: string;
  showTooltip?: boolean;
}

const ActionButton: FC<Props> = ({ icon, onClick, label, hoverColor = "text-gray-700", showTooltip = false }) => {
  return (
    <div className={`relative ${showTooltip ? "group" : ""}`}>
      <button
        type="button"
        onClick={onClick}
        className={`text-gray-700 hover:${hoverColor} dark:text-white transition-colors duration-200`}
        aria-label={label}
      >
        {icon}
      </button>
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </div>
      )}
    </div>
  );
};

export default ActionButton;

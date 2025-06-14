import Link from 'next/link';
import React from 'react';

interface CardBoxProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  value?: string | number;
  href?: string;
}

const CardBox: React.FC<CardBoxProps> = ({ icon, color, title, value, href }) => {
  const Wrapper = href
    ? ({ children }: { children: React.ReactNode }) => (
        <Link
          href={href}
          className={`
            flex flex-col items-center justify-center gap-2 rounded-2xl
            bg-gradient-to-tr ${color} shadow-lg px-4 py-6 transition-all duration-150
            hover:scale-105 hover:shadow-xl active:scale-100
            focus:outline-none
          `}
        >
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div
          className={`
            flex flex-col items-center justify-center gap-2 rounded-2xl
            bg-gradient-to-tr ${color} shadow-lg px-4 py-6 transition-all duration-150
            hover:scale-105 hover:shadow-xl active:scale-100
            focus:outline-none
            cursor-default
          `}
        >
          {children}
        </div>
      );

  return (
    <Wrapper>
      <div className="text-white text-3xl mb-1">{icon}</div>
      <div className="flex flex-col items-center gap-1">
        {value !== undefined && <span className="font-bold text-white text-base md:text-lg">{value}</span>}
        <span className="text-white text-sm md:text-base opacity-90">{title}</span>
      </div>
    </Wrapper>
  );
};

export default CardBox;

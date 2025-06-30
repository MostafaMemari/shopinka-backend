import { FC } from 'react';
import Link from 'next/link';
import { MenuLink } from '@/data/footerData';

interface Props {
  menuLinks1: MenuLink[];
  menuLinks2: MenuLink[];
}

const MenuLinks: FC<Props> = ({ menuLinks1, menuLinks2 }) => {
  return (
    <div className="grid grid-cols-12 justify-items-center md:justify-items-start">
      <div className="col-span-6 flex flex-col gap-y-6">
        <p className="select-none text-lg">راهنمای خرید</p>
        <ul className="space-y-4 text-gray-400 text-sm">
          {menuLinks1?.map((link) => (
            <li key={link.id}>
              <Link className="py-2 hover:text-primary" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-6 flex flex-col gap-y-6">
        <p className="select-none text-lg">با شاپینکا</p>
        <ul className="space-y-2 text-gray-400 text-sm">
          {menuLinks2?.map((link) => (
            <li key={link.id}>
              <Link className="py-2 hover:text-primary" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuLinks;

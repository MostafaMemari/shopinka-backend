'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { HiDotsVertical } from 'react-icons/hi';

interface AddressActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressActions({ onEdit, onDelete }: AddressActionsProps) {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center justify-center rounded-md px-2 py-1 text-sm hover:bg-gray-200">
        <HiDotsVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </MenuButton>

      <MenuItems
        anchor="bottom start"
        className="z-10 mt-2 w-32 origin-top-left rounded-md border bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
      >
        <MenuItem
          as="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sky-600 hover:bg-sky-100 dark:text-sky-300 dark:hover:bg-sky-800 [data-headlessui-state~='active']:bg-sky-100 dark:[data-headlessui-state~='active']:bg-sky-800"
        >
          <BiPencil className="h-4 w-4" />
          ویرایش
        </MenuItem>

        <MenuItem
          as="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800 [data-headlessui-state~='active']:bg-red-100 dark:[data-headlessui-state~='active']:bg-red-800"
        >
          <BiTrash className="h-4 w-4" />
          حذف
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

// import React from 'react';
// import Accordion from '../shop/Accordion';

// function AttributeSelector() {
//   return (
//     <Accordion title="رنگ ها">
//       <ul className="space-y-2 rounded-lg" id="colorListFilterDesktop">
//         <li className="p-2">
//           <label className="sr-only">جستجوی رنگ</label>
//           <input
//             id="colorListFilterDesktopSearchInput"
//             className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
//             placeholder="جستجوی رنگ ..."
//             type="text"
//           />
//         </li>
//         {config.colors.map((color) => (
//           <li key={color.id}>
//             <div className="flex w-full items-center gap-x-2 pr-4">
//               <input
//                 id={color.id}
//                 type="checkbox"
//                 value=""
//                 className="h-4 w-4 cursor-pointer rounded-xl bg-background dark:border-gray-600 dark:bg-zinc-700"
//               />
//               <label
//                 htmlFor={color.id}
//                 className="flex w-full cursor-pointer items-center justify-between py-2 pl-4 font-medium text-text/90"
//               >
//                 <span>{color.label}</span>
//                 <span className="h-4 w-4 rounded-full ring-2 ring-gray-200 dark:ring-zinc-700" style={{ background: color.color }}></span>
//               </label>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </Accordion>
//   );
// }

// export default AttributeSelector;

import React from 'react';

function AttributeSelector() {
  return <div>AttributeSelector</div>;
}

export default AttributeSelector;

// import React from 'react';
// import Accordion from '../shop/Accordion';

// function BrandSelector() {
//   return (
//     <Accordion title="برند ها">
//       <ul className="space-y-2 rounded-lg" id="brandListFilterDesktop">
//         <li className="p-2">
//           <label className="sr-only">جستجوی برند</label>
//           <input
//             id="brandListFilterDesktopSearchInput"
//             className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
//             placeholder="جستجوی برند ..."
//             type="text"
//           />
//         </li>
//         {config.brands.map((brand) => (
//           <li key={brand.id}>
//             <div className="flex w-full items-center gap-x-2 pr-4">
//               <input
//                 id={brand.id}
//                 type="checkbox"
//                 value=""
//                 className="h-4 w-4 cursor-pointer rounded-xl bg-background dark:border-gray-600 dark:bg-zinc-700"
//               />
//               <label
//                 htmlFor={brand.id}
//                 className="flex w-full cursor-pointer items-center justify-between py-2 pl-4 font-medium text-text/90"
//               >
//                 <span>{brand.label}</span>
//                 <span>{brand.value}</span>
//               </label>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </Accordion>
//   );
// }

// export default BrandSelector;

import React from 'react';

function BrandSelector() {
  return <div>BrandSelector</div>;
}

export default BrandSelector;

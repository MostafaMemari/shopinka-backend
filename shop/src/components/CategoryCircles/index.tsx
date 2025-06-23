// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// export default function CategoryCircles() {
//   return (
//     <section className="mb-8">
//       <style jsx>{`
//         .border-gradient {
//           background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
//         }
//         .border-gradient::before {
//           content: '';
//           position: absolute;
//           top: -1px;
//           left: -1px;
//           right: -1px;
//           bottom: -1px;
//           background: #fff;
//           border-radius: 9999px;
//           z-index: -1;
//         }
//       `}</style>
//       <div className="container relative mx-auto">
//         <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-between">
//           {categoryCirclesBanners.map((category) => (
//             <Link
//               key={category.id}
//               href={category.link}
//               className="relative flex w-25 flex-col items-center justify-between gap-y-1.5 sm:w-auto sm:gap-y-2.5"
//             >
//               <div className="border-gradient group relative rounded-full p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-full">
//                 <Image
//                   src={category.image}
//                   alt={category.title}
//                   width={100}
//                   height={100}
//                   className="relative h-25 w-25 rounded-full object-cover"
//                 />
//               </div>
//               <p className="line-clamp-2 h-10 text-center text-sm sm:text-base">{category.title}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

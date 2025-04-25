import React from "react";

interface ProductSpecificationsProps {
  specifications: Array<{
    title: string;
    values: string[];
  }>;
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <div className="py-6" id="specs">
      {/* <div className="relative mb-16 w-fit text-xl font-medium">
        مشخصات
        <span className="absolute right-0 top-10 h-[3px] w-full rounded-full bg-primary"></span>
      </div> */}
      <div
        className="mb-6 max-h-[500px] overflow-hidden md:mb-10"
        id="specsContainer"
      >
        <ul className="space-y-6 text-sm">
          {specifications &&
            specifications.map((spec, index) => (
              <li
                key={index}
                className="grid grid-cols-3 gap-x-2 lg:grid-cols-5"
              >
                <div className="col-span-1 text-text/60">{spec.title}</div>
                <div className="col-span-2 border-b pb-4 text-text/90 lg:col-span-4">
                  <ul className="space-y-4">
                    {spec.values.map((value, valueIndex) => (
                      <li key={valueIndex}>{value}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <button
          className="btn-secondary-nobg hidden md:flex"
          id="toggleSpecsButton"
        >
          مشاهده بیشتر
          <svg className="h-5 w-5">
            <use xlinkHref="#chevron-left" />
          </svg>
        </button>
        <button
          id="specsButtonMobile"
          className="btn-secondary-nobg md:hidden"
          aria-controls="mobile-spec-drawer-navigation"
          data-drawer-show="mobile-spec-drawer-navigation"
          data-drawer-placement="bottom"
          data-drawer-target="mobile-spec-drawer-navigation"
          type="button"
        >
          مشاهده بیشتر
          <svg className="h-5 w-5">
            <use xlinkHref="#chevron-left" />
          </svg>
        </button>
      </div>
    </div>
  );
}

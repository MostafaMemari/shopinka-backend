import { FormSwitch } from "../base-components/Form";
import { Preview, PreviewComponent } from "../base-components/PreviewComponent";

const ProductAttribute = () => {
  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="ml-auto text-lg font-medium">Form Validation</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            <>
              <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                <h2 className="mr-auto text-base font-medium">Implementation</h2>
              </div>
              <div className="p-5">
                <Preview></Preview>
              </div>
            </>
          </PreviewComponent>
        </div>
      </div>
    </>
  );
};

export default ProductAttribute;

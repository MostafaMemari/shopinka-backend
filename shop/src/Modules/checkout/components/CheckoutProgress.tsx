import React from 'react';
import { HiOutlineCheck, HiOutlineCreditCard, HiOutlineDocumentText } from 'react-icons/hi';

// تعریف تایپ برای props
interface CheckoutProgressProps {
  currentStep: 'cart' | 'checkout' | 'payment';
}

interface Step {
  name: string;
  key: 'cart' | 'checkout' | 'payment';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { name: 'سبد خرید', key: 'cart', icon: HiOutlineCheck },
    { name: 'صورتحساب', key: 'checkout', icon: HiOutlineDocumentText },
    { name: 'پرداخت', key: 'payment', icon: HiOutlineCreditCard },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="col-span-12 rounded-lg bg-muted">
      <ol className="grid grid-cols-3 overflow-hidden rounded-lg">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex || index <= currentStepIndex - 2;

          return (
            <li
              key={step.key}
              className={`flex flex-col items-center justify-center gap-2 p-4 text-xs sm:text-sm md:text-base ${
                isCompleted ? 'bg-primary/10 text-primary' : 'text-primary opacity-50'
              }`}
            >
              <step.icon className="h-6 w-6 md:h-8 md:w-8" />
              <p className="leading-none">{step.name}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default CheckoutProgress;

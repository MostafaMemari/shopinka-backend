import { FC } from "react";

interface Props {
  supportPhone: string;
  supportText: string;
}

const SupportInfo: FC<Props> = ({ supportPhone, supportText }) => {
  return (
    <div className="flex flex-col items-center gap-x-4 gap-y-4 text-sm text-text/60 md:flex-row">
      <p>تلفن پشتیبانی {supportPhone}</p>
      <span className="hidden h-4 w-px rounded-full bg-border md:block" />
      <p>{supportText}</p>
    </div>
  );
};

export default SupportInfo;

import { FC } from "react";

interface Props {
  copyrightText: string;
}

const Copyright: FC<Props> = ({ copyrightText }) => {
  return (
    <div className="mt-4 flex items-center justify-center border-t py-4">
      <p className="text-xs text-text/60 xs:text-sm">{copyrightText}</p>
    </div>
  );
};

export default Copyright;

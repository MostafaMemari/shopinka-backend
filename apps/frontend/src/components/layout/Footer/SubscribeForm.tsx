import { FC } from "react";

interface Props {
  subscribeText: string;
}

const SubscribeForm: FC<Props> = ({ subscribeText }) => {
  return (
    <>
      <div>
        <p className="text-sm text-text/60">{subscribeText}</p>
      </div>
      <div className="w-full flex-1 grow md:max-w-lg">
        <div className="flex w-full items-center justify-between gap-x-2 rounded-lg bg-muted">
          <label className="sr-only" htmlFor="emailInput" id="email-label">
            ایمیل
          </label>
          <input
            aria-labelledby="email-label"
            autoComplete="off"
            className="w-full border-none bg-transparent px-4 py-2.5 text-right text-text/90 outline-hidden placeholder:text-right placeholder:text-sm placeholder:text-text/60 focus:outline-hidden focus:ring-0"
            dir="ltr"
            id="emailInput"
            placeholder="ایمیل شما"
            type="text"
          />
          <button className="btn-primary ml-1 w-24 py-2 text-sm">ثبت</button>
        </div>
      </div>
    </>
  );
};

export default SubscribeForm;

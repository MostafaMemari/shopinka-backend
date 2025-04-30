import {
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlinePhone,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const guarantees = [
  {
    icon: HiOutlineClock,
    text: "هفت روز ضمانت بازگشت کالا",
  },
  {
    icon: HiOutlineShieldCheck,
    text: "تضمین اصالت کالا",
  },
  {
    icon: HiOutlinePhone,
    text: "هفت روز هفته",
  },
  {
    icon: HiOutlineLightningBolt,
    text: "تحویل اکسپرس در تهران, کرج",
  },
];

export default function ProductGuarantees() {
  return (
    <>
      {guarantees.map((item, index) => (
        <div
          key={index}
          className="flex w-full items-center gap-x-2 rounded-lg border px-2 py-4 text-sm text-text/60"
        >
          <span className="h-6 w-6">
            <item.icon className="h-full w-full" />
          </span>
          {item.text}
        </div>
      ))}
    </>
  );
}

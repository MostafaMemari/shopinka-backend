import AddressesPage from "@/components/profile/AddressesPage";

const addresses = [
  {
    id: "a1",
    fullAddress: "استان تهران، شهر تهران، خیابان گاندی جنوبی، نبش خیابان ۲۱، پلاک ۲۸",
    receiverName: "تایماز اکبری",
    name: "تایماز",
    family: "اکبری",
    phoneNumber: "09999999999",
    nationalCode: "1666666666",
    address: "خیابان گاندی جنوبی، نبش خیابان ۲۱، پلاک ۲۸",
    city: "تهران",
    province: "تهران",
    buildingNumber: "28",
    buildingUnit: "0",
    postalCode: "0000000000",
  },
];

export default function Page() {
  return <AddressesPage addresses={addresses} />;
}

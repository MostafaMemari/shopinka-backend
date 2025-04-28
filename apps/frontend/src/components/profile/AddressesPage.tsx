import AddressesActions from "./AddressesActions";

interface Address {
  id: string;
  fullAddress: string;
  receiverName: string;
  name: string;
  family: string;
  phoneNumber: string;
  nationalCode: string;
  address: string;
  city: string;
  province: string;
  buildingNumber: string;
  buildingUnit: string;
  postalCode: string;
}

interface AddressesPageProps {
  addresses: Address[];
}

const AddressesPage: React.FC<AddressesPageProps> = ({ addresses }) => (
  <div className="col-span-12 lg:col-span-9">
    <div className="rounded-lg bg-muted p-5 shadow-base">
      <AddressesActions addresses={addresses} />
    </div>
  </div>
);

export default AddressesPage;

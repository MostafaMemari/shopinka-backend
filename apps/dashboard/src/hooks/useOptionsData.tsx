import { useFetchData } from "./useFetchData";

const useOptionsData = (service: () => Promise<any>) => {
  const { data, loading } = useFetchData(service);

  const formattedOptions =
    data?.data?.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

  return { options: formattedOptions, loading };
};

export default useOptionsData;

import { useQuery } from "@tanstack/react-query";

import { getProductAttributeService } from "../../../services/Axios/Request/productAttribute/attribute";

export function useProductAttribute({}) {
  const fetchProducts = () => getProductAttributeService({}).then((res) => res.data);

  return useQuery({
    queryKey: ["product-attribute", {}],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  });
}

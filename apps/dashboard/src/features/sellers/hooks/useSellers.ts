import { useQuery } from "@tanstack/react-query";
import { getSellersService } from "../../../services/Axios/Request/sellers";

export function useSellers() {
  return useQuery<any, Error>({
    queryKey: ["sellers"],
    queryFn: () => getSellersService().then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
}

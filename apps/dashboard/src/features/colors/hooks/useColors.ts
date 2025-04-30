import { useQuery } from "@tanstack/react-query";
import { getColorsService } from "../../../services/Axios/Request/colors";

export function useColors() {
  return useQuery({
    queryKey: ["colors"],
    queryFn: () => getColorsService().then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "../../../services/Axios/Request/categories";

export function useCategories() {
  return useQuery<any, Error>({
    queryKey: ["categories"],
    queryFn: () => getCategoriesService().then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
}

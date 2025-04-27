import { IBreadcrumb } from "@/lib/types/breadcrumb";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

interface Props {
  items: IBreadcrumb[];
}



export default CompactBreadcrumb;

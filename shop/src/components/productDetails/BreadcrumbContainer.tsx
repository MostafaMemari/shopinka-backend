import { IBreadcrumb } from '@/lib/types/breadcrumb';
import BoxedBreadcrumb from '../ui/BoxedBreadcrumb';
import { CompactBreadcrumb } from '../ui/breadcrumb';

interface Props {
  items: IBreadcrumb[];
  variant?: 'boxed' | 'compact';
}

const BreadcrumbContainer = ({ items, variant = 'boxed' }: Props) => {
  return <>{variant === 'boxed' ? <BoxedBreadcrumb items={items} /> : <CompactBreadcrumb items={items} />}</>;
};

export default BreadcrumbContainer;

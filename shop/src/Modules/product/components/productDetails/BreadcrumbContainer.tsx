import { IBreadcrumb } from '@/lib/types/breadcrumb';
import BoxedBreadcrumb from '../../../../shared/components/ui/BoxedBreadcrumb';
import { CompactBreadcrumb } from '../../../../shared/components/ui/breadcrumb';

interface Props {
  items: IBreadcrumb[];
  variant?: 'boxed' | 'compact';
}

const BreadcrumbContainer = ({ items, variant = 'boxed' }: Props) => {
  return <>{variant === 'boxed' ? <BoxedBreadcrumb items={items} /> : <CompactBreadcrumb items={items} />}</>;
};

export default BreadcrumbContainer;

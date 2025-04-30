interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => (
  <h1 className="relative w-fit text-xl font-medium">
    {title}
    <span className="absolute right-0 top-10 h-[3px] w-full rounded-full bg-primary" />
  </h1>
);

export default DashboardHeader;

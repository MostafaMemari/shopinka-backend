import RecentActions from "./RecentActions";

interface Recent {
  id: string;
  image: string;
  title: string;
  link: string;
  isAvailable: boolean;
}

interface RecentPageProps {
  recent: Recent[];
}

const RecentPage: React.FC<RecentPageProps> = ({ recent }) => (
  <div className="col-span-12 lg:col-span-9">
    <div className="rounded-lg bg-muted p-5 shadow-base">
      <RecentActions recent={recent} />
    </div>
  </div>
);

export default RecentPage;

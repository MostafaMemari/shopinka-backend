import DashboardHeader from '@/components/profile/DashboardHeader';
import ProfileEditActions from '@/components/profile/ProfileEditActions';

export default function Page() {
  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="اطلاعات حساب کاربری شما" />
      </div>

      <ProfileEditActions />
    </>
  );
}

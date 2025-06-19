'use client';

import UserAccountSection from './Profile/UserAccountSection';
import DashboardHeader from './DashboardHeader';

const Profile = ({}) => (
  <>
    <div className="mb-8">
      <DashboardHeader title="پیشخوان" />
    </div>
    <UserAccountSection />
    {/* <OrderStatusSection /> */}
  </>
);

export default Profile;

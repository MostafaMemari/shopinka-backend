import ProfileEditActions from "./ProfileEditActions";

interface ProfileData {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  birthDate: string;
}

interface ProfileEditPageProps {
  profileData: ProfileData;
}

const ProfileEditPage: React.FC<ProfileEditPageProps> = ({ profileData }) => (
  <div className="col-span-12 lg:col-span-9">
    <div className="rounded-lg bg-muted p-5 shadow-base">
      <ProfileEditActions initialData={profileData} />
    </div>
  </div>
);

export default ProfileEditPage;

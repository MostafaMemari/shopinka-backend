import ProfileEditActions from '@/components/profile/ProfileEditActions';

const profileData = {
  fullName: 'تایماز اکبری',
  nationalCode: '',
  phoneNumber: '09000000000',
  email: 'rotikala@gmail.com',
  password: 'password',
  birthDate: '11/08/1380',
};

export default function Page() {
  return (
    <div className="col-span-12 lg:col-span-9">
      <ProfileEditActions initialData={profileData} />
    </div>
  );
}

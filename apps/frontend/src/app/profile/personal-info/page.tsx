import ProfileEditPage from "@/components/profile/ProfileEditPage";

const profileData = {
  fullName: "تایماز اکبری",
  nationalCode: "",
  phoneNumber: "09000000000",
  email: "rotikala@gmail.com",
  password: "password",
  birthDate: "11/08/1380",
};

export default function Page() {
  return <ProfileEditPage profileData={profileData} />;
}

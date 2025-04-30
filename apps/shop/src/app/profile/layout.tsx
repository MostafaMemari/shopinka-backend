import Header from "@/components/header";
import ProfileSidebar from "@/components/profile/ProfileSlider";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3">
              {/* <!-- Desktop sidebar --> */}
              <ProfileSidebar fullName="مصطفی معماری" notificationCount={10} profileImage="/images/user.png" phoneNumber="09388366510" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="col-span-12 lg:col-span-9">
                <div className="rounded-lg bg-muted p-5 shadow-base">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

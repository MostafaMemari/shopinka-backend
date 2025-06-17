import ProfileMenuDrawer from '@/components/profile/MobileMenu/ProfileMenuCard';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileMenu from '@/components/profile/ProfileMenu';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-32 hidden w-full overflow-hidden rounded-lg bg-muted shadow-base lg:block">
              <div dir="ltr" className="max-h-[calc(90vh_-_100px)] overflow-y-auto p-4 xl:p-6">
                <div dir="rtl">
                  <ProfileHeader />
                  <ProfileMenu />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <ProfileMenuDrawer />
            <div className="col-span-12 lg:col-span-9">
              <div className="rounded-lg bg-muted p-5 shadow-base">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

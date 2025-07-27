import { Footer, SideBar, TopMenu } from "@/components";
import { Toaster } from "@/components/ui/sonner";
import { MainPage, ContainerPage } from "@/modules/common/components";

interface Props {
  children: React.ReactNode;
}
export default function ShopLayout({ children }: Props) {
  return (
    <MainPage className="min-h-screen">
      <Toaster position="top-right" expand />
      <TopMenu />
      <SideBar />
      <ContainerPage>{children}</ContainerPage>
      <Footer />
    </MainPage>
  );
}

import { Footer, SideBar, TopMenu } from "@/components";
import { Toaster } from "@/components/ui/sonner";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Toaster position="top-right" expand />
      <TopMenu />
      <SideBar />
      <div className="px-3 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}

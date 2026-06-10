import Sidebar from "@/presentation/components/Sidebar";
import Footer from "@/presentation/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-y-auto w-full flex flex-col">
        <div className="w-full flex-1 px-4 sm:px-6 md:px-10 py-8 md:py-10 max-w-6xl mx-auto mb-16">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}

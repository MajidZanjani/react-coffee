import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-text-light">
      <Header />
      <main className="grow p-6">{children}</main>
      <Footer />
    </div>
  );
}

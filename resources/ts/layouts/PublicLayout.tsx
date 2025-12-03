import Header from "@components/common/Header";
import "@sass/app.scss";
import Footer from "../components/common/Footer";
import { AuthUser } from "../types/auth";

export type RootProps = {
  auth: AuthUser | null;
}

type PublicLayoutProps = RootProps & {
  children: React.ReactNode;
};

const PublicLayout = ({ children, auth }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Header auth={auth} />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

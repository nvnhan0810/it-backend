import Header from "@components/common/Header";
import "@sass/app.scss";
import { AuthUser } from "../types/auth";

export type RootProps = {
  auth: AuthUser | null;
}

type RootLayoutProps = RootProps & {
  children: React.ReactNode;
};

const RootLayout = ({ children, auth }: RootLayoutProps) => {
  return (
    <div className="bg-gray-800 min-h-screen bg-background font-sans antialiased scroll-smooth scroll-pt-24 p-4">
      <Header auth={auth} />
      {children}
    </div>
  );
};

export default RootLayout;

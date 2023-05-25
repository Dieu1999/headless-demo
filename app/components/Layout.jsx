
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout({children, title, logo, layout}) {
  return (
    <div className="flex flex-col min-h-screen antialiased">
  
      <Header title={title} logo={logo} menu={layout.headerMenu}/>
      <main
        role="main"
        id="mainContent"
        className="flex-grow"
      >
        {children}
      </main>
      <Footer menu={layout.footerMenu}/>
    </div>
  );
}

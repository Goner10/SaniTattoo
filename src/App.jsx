import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Catalog from "./pages/Catalog.jsx";
import Contact from "./pages/Contact.jsx";
import CookiesPolicy from "./pages/CookiesPolicy.jsx";
import Home from "./pages/Home.jsx";
import LegalNotice from "./pages/LegalNotice.jsx";
import Merchandising from "./pages/Merchandising.jsx";
import Offers from "./pages/Offers.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="ofertas" element={<Offers />} />
          <Route path="merchandising" element={<Merchandising />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="aviso-legal" element={<LegalNotice />} />
          <Route path="politica-privacidad" element={<PrivacyPolicy />} />
          <Route path="politica-cookies" element={<CookiesPolicy />} />
          <Route path="terminos-condiciones" element={<TermsAndConditions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Catalog from "./pages/Catalog.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Merchandising from "./pages/Merchandising.jsx";
import Offers from "./pages/Offers.jsx";

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

export default function App() {
  return (
    <BrowserRouter basename="/SaniTattoo">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="ofertas" element={<Offers />} />
          <Route path="merchandising" element={<Merchandising />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

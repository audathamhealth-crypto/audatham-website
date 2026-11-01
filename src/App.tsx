import { useCallback, useEffect, useState } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./store/cart";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import SearchOverlay from "./components/SearchOverlay";
import CartToast from "./components/CartToast";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import StoryPage from "./pages/StoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if ((state as { scrollTo?: string } | null)?.scrollTo) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, state]);
  return null;
}

function SiteLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const { pathname } = useLocation();
  const finishIntro = useCallback(() => setIntroDone(true), []);

  // Close overlays when the route changes
  useEffect(() => {
    setCartOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-50">
      <Intro onDone={finishIntro} />
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      {/* Content mounts as the curtain lifts, so the hero cascade is visible */}
      {introDone && (
        <>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
      <FloatingWhatsApp />
      <CartToast onViewCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <ScrollToTop />
        <SiteLayout />
      </CartProvider>
    </HashRouter>
  );
}

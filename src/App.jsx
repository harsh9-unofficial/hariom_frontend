// import Header from "./components/Header";
// import { BrowserRouter as Router } from "react-router-dom";
// import Footer from "./components/Footer";
// import CartPage from "./components/CartPage";
// import WishlistPage from "./components/WishlistPage";
// import SingleProductPage from "./components/SingleProductPage";
// import AllProduct from "./components/AllProductPage";
// import CombosPage from "./components/CombosPage";
// import TrackOrderPage from "./components/TrackOrderPage";
// import AboutUsPage from "./components/AboutUsPage";

// function App() {
//   return (
//     <Router>
//       {/* <Header /> */}

//       {/* 09/04/2025 */}
//       {/* <CartPage /> */}
//       {/* <WishlistPage /> */}
//       {/* <ContactUsPage /> */}

//       {/* 10/04/2025 */}
//       {/* <SingleProductPage/> */}
//       {/* <AllProduct /> */}
//       {/* <CombosPage /> */}
//       {/* <TrackOrderPage /> */}
//       {/* <AboutUsPage /> */}
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import AboutUsPage from "./components/AboutUsPage";
import AllProductPage from "./components/AllProductPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import CombosPage from "./components/CombosPage";
import ContactUsPage from "./components/ContactUsPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import SingleProductPage from "./components/SingleProductPage";
import TrackOrderPage from "./components/TrackOrderPage";
import WishlistPage from "./components/WishlistPage";
import { useEffect } from "react";

const AppContent = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/about", "/login", "/signup"];
  const hideFooterRoutes = ["/login", "/signup"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls instantly to top-left
  }, [pathname]);

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/products" element={<AllProductPage />} />
        <Route path="/combos" element={<CombosPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      {!shouldHideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

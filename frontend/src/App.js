import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import ServicePage from "./pages/ServicePage";
import AdminPage from "./pages/AdminPage";


const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/" && hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [hash, pathname]);
  return null;
};

const Landing = () => (
  <div className="min-h-screen bg-white text-[#0A0A0A] font-sans antialiased">
    <Navbar />
    <main>
      <Hero />
      <Portfolio />
      <Services />
      <Process />
      <Contact />
      
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio/:slug" element={<CategoryPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

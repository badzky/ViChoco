import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sanvic.png"; // Your logo

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // set initial width

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Logo size based on device
  const getLogoSize = () => {
    if (windowWidth > 1024) return 90; // large desktop
    if (windowWidth > 768) return 80;  // tablet
    return 70;                         // mobile
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.35 }}
          className="fixed top-0 left-0 right-0 z-50 bg-chocolate-dark/95 backdrop-blur-md shadow-hero py-3"
        >
          <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
            {/* Logo + Text */}
            <button
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={logo}
                alt="San Vicente Logo"
                className="object-contain"
                style={{ width: getLogoSize(), height: getLogoSize() }}
              />

              {windowWidth > 1024 && (
 <div className="flex flex-col leading-none">
  {/* San Vic */}
  <span className="font-display text-2xl font-bold text-gradient-gold">
    San Vic
  </span>

  {/* Choco */}
  <span className="font-display italic text-2xl text-gradient-gold -mt-1">
    Choco
  </span>
</div>
              )}
            </button>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href} className="group relative">
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-body text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-cream p-2 z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-chocolate-dark/98 border-t border-gold/20 relative z-50"
                >
                  <ul className="flex flex-col py-6 px-6 gap-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="w-full text-left font-body text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors py-3 border-b border-gold/10"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-chocolate.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-chocolate-dark/65" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate-dark/30 via-transparent to-chocolate-dark/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-gold mb-5"
        >
          Chocolate · Tourism · Palawan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-cream leading-tight mb-6"
        >
          San Vic
          <br />
          <span className="italic text-gradient-gold">Choco</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="font-body text-sm sm:text-base md:text-lg text-cream/75 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          A proud tourism landmark of San Vicente, Palawan — where world-class
          cacao meets the paradise island experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("#products")}
            className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase bg-accent text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-hero"
          >
            Explore Products
          </button>
          <button
            onClick={() => scrollTo("#story")}
            className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase border border-cream/40 text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:border-gold hover:text-gold transition-all duration-300"
          >
            Discover Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs sm:text-sm tracking-widest text-cream/50 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
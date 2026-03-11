import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutImage from "@/assets/about-story.jpg";

const stats = [
   { value: "SanVic Choco", label: "Bean to Bar Chocolates" },
  { value: "50% Cacao ", label: "with Purple Yam" },
  { value: "Chocolate Purple Huancaya", label: "A Premier Cacao Product of Local Government Unit of San Vicente, Province of Palawan, Developed under the branding initiative "},
 
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="story" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-hero">
              <img
                src={aboutImage}
                alt="Our chocolate crafting story"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent box */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-card hidden md:block">
              <p className="font-display text-3xl font-bold">Since</p>
              <p className="font-display text-5xl font-bold">2025</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="font-body text-xs tracking-[0.45em] uppercase text-gold mb-4">
              Our Story · San Vicente, Palawan
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              More than Chocolate
              <br />
              <span className="italic text-gradient-gold">A Palawan Experience</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-5">
              San Vicente Chocolates is nestled in the paradise municipality of San Vicente,
              Palawan — home to the world-renowned Long Beach. Born in November 18,2025, we are more than
              just a chocolate brand; we are a proud tourism landmark that celebrates the
              island's rich cacao heritage.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-10">
              Visitors from around the globe stop by our shop to taste authentic Palawan-crafted
              chocolates, made from locally sourced cacao beans, carrying the warmth of our
              island and the soul of our community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold pl-4">
                  <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="font-body text-sm text-muted-foreground uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-body text-xs tracking-[0.25em] uppercase bg-primary text-primary-foreground px-8 py-4 rounded-sm hover:bg-secondary transition-colors duration-300"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

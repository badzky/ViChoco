import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      {/* Contact section */}
      <section id="contact" className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.45em] uppercase text-gold mb-4">
              Reach Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-5">
              Get in Touch
            </h2>
            <p className="font-body text-cream/70 max-w-lg mx-auto">
              Whether you're looking for a custom gift order or simply want to know more about
              our chocolates, we'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {[
              {
                icon: <MapPin className="w-5 h-5" />,
                label: "Visit Us",
                line1: "San Vicente, Palawan",
                line2: "Philippines 5309",
              },
              {
                icon: <Phone className="w-5 h-5" />,
                label: "Call Us",
                line1: "+63 (917) 555-CHOC",
                line2: "Mon–Sun, 8am–6pm",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: "Email Us",
                line1: "hello@sanvicentechoc.ph",
                line2: "We reply within 24 hrs",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center bg-cream/5 border border-gold/20 rounded-lg p-8 hover:border-gold/50 transition-colors"
              >
                <div className="text-gold mb-4">{item.icon}</div>
                <p className="font-body text-xs tracking-widest uppercase text-gold/80 mb-2">
                  {item.label}
                </p>
                <p className="font-display text-cream text-lg">{item.line1}</p>
                <p className="font-body text-cream/60 text-sm mt-1">{item.line2}</p>
              </motion.div>
            ))}
          </div>

          {/* Newsletter */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Newsletter
            </p>
            <h3 className="font-display text-2xl text-cream mb-6">
              Stay Sweet — Join Our List
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-cream/10 border border-gold/30 text-cream placeholder:text-cream/40 px-5 py-3 rounded-sm font-body text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button className="font-body text-xs tracking-[0.25em] uppercase bg-accent text-accent-foreground px-7 py-3 rounded-sm hover:bg-gold-light transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Footer bar */}
      <footer className="bg-chocolate-dark border-t border-gold/15 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-lg font-bold text-gradient-gold">
              San Vicente Chocolates
            </span>
            <p className="font-body text-xs text-cream/40 mt-1">
              © {new Date().getFullYear()} All rights reserved. · San Vicente, Palawan, PH
            </p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <Instagram size={18} />, label: "Instagram" },
              { icon: <Facebook size={18} />, label: "Facebook" },
              { icon: <Twitter size={18} />, label: "Twitter" },
            ].map((s) => (
              <button
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
              >
                {s.icon}
              </button>
            ))}
          </div>

          <div className="flex gap-6 text-xs font-body tracking-widest uppercase text-cream/50">
            <button className="hover:text-gold transition-colors">Privacy</button>
            <button className="hover:text-gold transition-colors">Terms</button>
            <button className="hover:text-gold transition-colors">Shipping</button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

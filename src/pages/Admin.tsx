import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Download, Lock, ChevronRight } from "lucide-react";

const BASE_URL = "https://sanvicentechocolates.ph/products";

const products = [
  {
    id: 1,
    name: "Dark Chocolate Bars",
    slug: "dark-chocolate-bars",
    price: "From ₱450",
    tag: "Bestseller",
    description: "Single-origin dark chocolate bars with 70%, 85% & 100% cacao intensity.",
  },
  {
    id: 2,
    name: "Artisan Truffles",
    slug: "artisan-truffles",
    price: "From ₱750",
    tag: "New",
    description: "Handrolled truffles dusted with premium cocoa and adorned with gold leaf.",
  },
  {
    id: 3,
    name: "Gift Collections",
    slug: "gift-collections",
    price: "From ₱1,700",
    tag: "Gift Ready",
    description: "Curated luxury gift boxes perfect for every occasion and celebration.",
  },
  {
    id: 4,
    name: "Hot Chocolate Blend",
    slug: "hot-chocolate-blend",
    price: "From ₱650",
    tag: "Seasonal",
    description: "A rich, velvety drinking chocolate crafted for the ultimate cozy experience.",
  },
];

// Simple pin gate
const ADMIN_PIN = "1234";

const AdminPage = () => {
  const [pinInput, setPinInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleLogin = () => {
    if (pinInput === ADMIN_PIN) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect PIN. Please try again.");
      setPinInput("");
    }
  };

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (slug: string, id: number) => {
    const svg = document.getElementById(`qr-${id}`);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${slug}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm bg-card border border-gold/20 rounded-lg shadow-hero p-10 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-accent/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-gold" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Admin Panel</h1>
          <p className="font-body text-sm text-muted-foreground mb-8 tracking-wide">
            San Vicente Chocolates · Palawan
          </p>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter PIN"
            maxLength={6}
            className="w-full bg-muted border border-gold/20 text-foreground placeholder:text-muted-foreground text-center text-2xl tracking-[0.5em] px-4 py-4 rounded-sm font-display focus:outline-none focus:border-gold transition-colors mb-3"
          />
          {error && (
            <p className="font-body text-xs text-destructive mb-3">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full font-body text-xs tracking-[0.25em] uppercase bg-accent text-accent-foreground px-6 py-3.5 rounded-sm hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
          >
            Enter <ChevronRight className="w-4 h-4" />
          </button>
          <p className="font-body text-xs text-muted-foreground mt-6">
            Default PIN: <span className="text-gold font-semibold">1234</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-chocolate-dark border-b border-gold/20 py-4 px-6 flex items-center justify-between sticky top-0 z-40">
        <div>
          <span className="font-display text-xl font-bold text-gradient-gold">San Vicente Chocolates</span>
          <p className="font-body text-xs text-gold/60 tracking-widest uppercase mt-0.5">
            Admin · Product QR Codes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-cream/50 tracking-wide hidden sm:block">
            📍 San Vicente, Palawan
          </span>
          <button
            onClick={() => setAuthenticated(false)}
            className="font-body text-xs tracking-[0.2em] uppercase border border-gold/30 text-gold/80 px-4 py-2 rounded-sm hover:border-gold hover:text-gold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="font-body text-xs tracking-[0.45em] uppercase text-gold mb-3">
            QR Management
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-3">
            Product QR Codes
          </h2>
          <p className="font-body text-muted-foreground text-sm max-w-md mx-auto">
            Download or print QR codes for each product. Customers can scan these at our
            San Vicente, Palawan store to view product details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const url = `${BASE_URL}/${product.slug}`;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-gold/15 rounded-lg overflow-hidden shadow-card hover:shadow-hero hover:border-gold/40 transition-all duration-400 flex flex-col"
              >
                {/* Tag */}
                <div className="px-5 pt-5 pb-0 flex items-center justify-between">
                  <span className="font-body text-xs tracking-widest uppercase bg-accent text-accent-foreground px-3 py-1 rounded-sm">
                    {product.tag}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">#{product.id}</span>
                </div>

                {/* QR Code */}
                <div className="flex items-center justify-center p-7 bg-muted/30">
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <QRCodeSVG
                      id={`qr-${product.id}`}
                      value={url}
                      size={130}
                      bgColor="#ffffff"
                      fgColor="#3B1A05"
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 pb-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                    {product.description}
                  </p>
                  <p className="font-display text-base font-medium text-gold mb-4">
                    {product.price}
                  </p>

                  {/* URL */}
                  <div className="bg-muted rounded-sm px-3 py-2 mb-4 flex items-center justify-between gap-2 overflow-hidden">
                    <span className="font-body text-[10px] text-muted-foreground truncate">
                      {url}
                    </span>
                    <button
                      onClick={() => handleCopy(url, product.id)}
                      className="font-body text-[10px] text-gold hover:text-gold-light transition-colors shrink-0"
                    >
                      {copiedId === product.id ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleDownload(product.slug, product.id)}
                    className="w-full font-body text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground px-4 py-2.5 rounded-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download QR
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center border border-gold/15 rounded-lg p-6 max-w-2xl mx-auto bg-card"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">
            Usage Guide
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Print these QR codes and place them next to each product at the{" "}
            <span className="text-foreground font-medium">San Vicente, Palawan</span> store.
            Customers can scan to view product details, ingredients, and place orders.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPage;

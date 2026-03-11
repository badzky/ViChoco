import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import productBars from "@/assets/product-bars.jpg";
import productTruffles from "@/assets/product-truffles.jpg";
import productGiftbox from "@/assets/product-giftbox.jpg";
import productDrinks from "@/assets/product-drinks.jpg";

const products = [
  {
    id: 1,
    name: "Dark Chocolate Bars",
    description: "Single-origin dark chocolate bars with 70%, 85% & 100% cacao intensity.",
    price: "From $8.50",
    image: productBars,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Artisan Truffles",
    description: "Handrolled truffles dusted with premium cocoa and adorned with gold leaf.",
    price: "From $14.00",
    image: productTruffles,
    tag: "New",
  },
  {
    id: 3,
    name: "Gift Collections",
    description: "Curated luxury gift boxes perfect for every occasion and celebration.",
    price: "From $32.00",
    image: productGiftbox,
    tag: "Gift Ready",
  },
  {
    id: 4,
    name: "Hot Chocolate Blend",
    description: "A rich, velvety drinking chocolate crafted for the ultimate cozy experience.",
    price: "From $12.00",
    image: productDrinks,
    tag: "Seasonal",
  },
  {
    id: 5,
    name: "Vicente's Signature Blend",
    description: "A rich, velvety drinking chocolate crafted for the ultimate cozy experience.",
    price: "From $12.00",
    image: productDrinks,
    tag: "Seasonal",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const ProductCard = ({
  product,
  index,
  onViewDetails,
}: {
  product: typeof products[0];
  index: number;
  onViewDetails: (product: typeof products[0]) => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-hero transition-all duration-500"
    >
      {/* Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="font-body text-xs tracking-widest uppercase bg-accent text-accent-foreground px-3 py-1 rounded-sm">
          {product.tag}
        </span>
      </div>

      {/* Image */}
      <div className="overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {product.name}
        </h3>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-medium text-gold">
            {product.price}
          </span>

          <button
            onClick={() => onViewDetails(product)}
            className="font-body text-xs tracking-[0.2em] uppercase text-secondary hover:text-gold border-b border-secondary hover:border-gold transition-all duration-300 pb-0.5"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.45em] uppercase text-gold mb-4">
            Our Collection
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
            Crafted with Passion
          </h2>

          <p className="font-body text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Every chocolate we make is a labor of love — sourced ethically, crafted slowly,
            and finished with exquisite attention to detail.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <button className="font-body text-xs tracking-[0.3em] uppercase bg-primary text-primary-foreground px-10 py-4 rounded-sm hover:bg-secondary transition-colors duration-300">
            View Full Collection
          </button>
        </motion.div>
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedProduct.name}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {selectedProduct.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gold">
                    {selectedProduct.price}
                  </span>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductsSection;
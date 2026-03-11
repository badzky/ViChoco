import { useParams } from "react-router-dom";

// You can expand this later with actual product data
const products = [
  {
    slug: "dark-chocolate-bars",
    name: "Dark Chocolate Bars",
    description: "Single-origin dark chocolate bars with 70%, 85% & 100% cacao intensity.",
    price: "From ₱450",
    image: "/placeholder.svg",
  },
  {
    slug: "artisan-truffles",
    name: "Artisan Truffles",
    description: "Handrolled truffles dusted with premium cocoa and adorned with gold leaf.",
    price: "From ₱750",
    image: "/placeholder.svg",
  },
  {
    slug: "gift-collections",
    name: "Gift Collections",
    description: "Curated luxury gift boxes perfect for every occasion and celebration.",
    price: "From ₱1,700",
    image: "/placeholder.svg",
  },
  {
    slug: "hot-chocolate-blend",
    name: "Hot Chocolate Blend",
    description: "A rich, velvety drinking chocolate crafted for the ultimate cozy experience.",
    price: "From ₱650",
    image: "/placeholder.svg",
  },
];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-bold">Product Not Found</h1>
        <p className="font-body text-muted-foreground mt-4">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-foreground mb-4">
          {product.name}
        </h1>
        <p className="font-body text-muted-foreground text-lg mb-6">
          {product.description}
        </p>
        <p className="font-display text-2xl text-gold mb-8">{product.price}</p>
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded-lg shadow-hero"
        />
      </div>
    </div>
  );
};

export default ProductPage;
import Product from "../Product/Product";
import "./ProductListing.scss"

const ProductListing = ({ products, filters, search }) => {
    const filteredProducts = products.filter(product => {
        // Gender filter
        if (filters.gender && filters.gender.length > 0) {
            if (!filters.gender.includes(product.gender.toLowerCase())) return false;
        }
        // Colour filter
        if (filters.colour && filters.colour.length > 0) {
            if (!filters.colour.includes(product.colour.toLowerCase())) return false;
        }
        // Price filter
        if (filters.price && filters.price.length > 0) {
            const price = product.price;
            const matchesPrice = filters.price.some(range => {
                if (range === '450+') {
                    return price >= 450;
                } else {
                    const [min, max] = range.split('-').map(Number);
                    return price >= min && price <= max;
                }
            });
            if (!matchesPrice) return false;
        }
        // Type filter
        if (filters.type && filters.type.length > 0) {
            if (!filters.type.includes(product.type.toLowerCase())) return false;
        }
        // Search filter
        if (search.trim()) {
            const searchWords = search.toLowerCase().split(/\s+/);
            const productText = `${product.name} ${product.colour} ${product.type}`.toLowerCase();
            const matchesSearch = searchWords.every(word => productText.includes(word));
            if (!matchesSearch) return false;
        }
        return true;
    });

    return (
        <div className="product-listing">
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <Product key={item.id} product={item} />
                    ))
                ) : (
                    <div className="no-data">
                        <p>No data found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListing
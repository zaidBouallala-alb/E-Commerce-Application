import { useState, useMemo } from 'react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
    const { products, isLoading, error } = useStore();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique categories from products
    const categories = useMemo(() => {
        // If API returns categories separately we could use that, but deriving is safe
        const cats = new Set(products.map(p => p.category));
        return ['all', ...Array.from(cats)].sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const title = product.title || product.name || '';
            const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-600 p-8">
            Error loading products: {error}
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Search</h3>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Grid */}
            <div className="flex-1">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {selectedCategory === 'all' ? 'All Products' : selectedCategory}
                    </h2>
                    <span className="text-slate-500 text-sm">
                        {filteredProducts.length} results
                    </span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        No products found matching your criteria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

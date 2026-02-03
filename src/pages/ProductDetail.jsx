import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import useStore from '../store/useStore';
import { fetchProductById } from '../api/client';

export default function ProductDetail() {
    const { id } = useParams();
    const addToCart = useStore(state => state.addToCart);
    const products = useStore(state => state.products);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                const found = products.find(p => p.id === parseInt(id));
                if (found) {
                    setProduct(found);
                } else {
                    const data = await fetchProductById(id);
                    setProduct(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id, products]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20 text-red-600">Product not found</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-8">
                {/* Image Section */}
                <div className="space-y-4">
                    <div className="aspect-square relative bg-slate-100 rounded-xl overflow-hidden">
                        <img
                            src={product.thumbnail || product.images?.[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images?.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-center">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase">{product.category}</span>
                        <div className="flex items-center text-amber-500 text-sm font-bold">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            {product.rating}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.title}</h1>
                    <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>

                    <div className="flex items-center justify-between mb-8 border-t border-b border-slate-100 py-4">
                        <div className="text-3xl font-bold text-slate-900">${product.price}</div>
                        {product.stock && (
                            <div className="text-sm text-green-600 font-semibold flex items-center">
                                In Stock: {product.stock}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center border border-slate-300 rounded-lg">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="p-3 hover:bg-slate-50 text-slate-600 disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                            <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="p-3 hover:bg-slate-50 text-slate-600"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <button
                            onClick={() => addToCart(product, quantity)}
                            className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

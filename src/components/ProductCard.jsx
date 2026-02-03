import { Star, Plus } from 'lucide-react';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const addToCart = useStore(state => state.addToCart);

    return (
        <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-100">
                <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                {product.discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        -{Math.round(product.discountPercentage)}%
                    </div>
                )}
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product.id}`} className="text-sm text-slate-500 hover:text-blue-600 uppercase tracking-wide font-semibold">
                        {product.category}
                    </Link>
                    <div className="flex items-center text-amber-400 text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-slate-600">{product.rating}</span>
                    </div>
                </div>

                <Link to={`/product/${product.id}`} className="text-lg font-bold text-slate-900 mb-2 hover:text-blue-600 line-clamp-2">
                    {product.title}
                </Link>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                        ${product.price}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        aria-label="Add to cart"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

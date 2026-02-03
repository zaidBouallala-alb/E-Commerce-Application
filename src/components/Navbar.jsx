import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import useStore from '../store/useStore';

export default function Navbar() {
    const cartCount = useStore(state => state.getCartCount());

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">
                        Shop<span className="text-blue-600">Now</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors">
                            <ShoppingBag className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

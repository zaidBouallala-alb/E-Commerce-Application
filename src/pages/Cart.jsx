import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore();
    const total = getCartTotal();

    if (cart.length === 0) {
        return (
            <div className="text-center py-20 px-4">
                <div className="mb-6 inline-flex p-4 bg-slate-100 rounded-full text-slate-400">
                    <Trash2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                                <img src={item.thumbnail || item.images?.[0]} alt={item.title} className="w-full h-full object-cover" />
                            </Link>

                            <div className="flex-1 text-center sm:text-left">
                                <Link to={`/product/${item.id}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 block mb-1">{item.title}</Link>
                                <p className="text-sm text-slate-500 mb-2">${item.price} x {item.quantity}</p>
                                <div className="font-bold text-blue-600 sm:hidden">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-slate-300 rounded-lg h-9">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-600"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-600"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    aria-label="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="hidden sm:block text-right min-w-[80px]">
                                <div className="font-bold text-slate-900 text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900 text-xl">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group">
                            Proceed to Checkout
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button onClick={clearCart} className="w-full mt-3 text-sm text-slate-500 hover:text-red-600 text-center">
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

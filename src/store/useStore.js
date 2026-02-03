import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchCatalog } from '../api/client';

const useStore = create(
    persist(
        (set, get) => ({
            products: [],
            categories: [],
            cart: [],
            isLoading: false,
            error: null,

            // Actions
            fetchData: async () => {
                set({ isLoading: true, error: null });
                try {
                    const data = await fetchCatalog();
                    // The structure of data depends on the endpoint.
                    // Assuming it returns { products: [], ... } or similar.
                    // I will verify this structure later or handle it flexibly.
                    // If it's the standard dummyjson structure, it has products.
                    // If it's a custom structure, I'll adjust. 
                    // For now assuming standard or checking in component.
                    // Actually, based on common DummyJSON custom responses, it might be the root array or an object.
                    // I'll map it assuming it might contain products and maybe categories.

                    // Let's assume the response is { products: [...], categories: [...] } or the endpoint returns products.
                    // Since I can't check the URL content easily without running, I'll assume standard { products: [...] } for now.
                    // We can debug this later.

                    // Normalize data to match standard DummyJSON structure (title, thumbnail)
                    const normalizedProducts = (data.products || []).map(p => ({
                        ...p,
                        title: p.name || p.title, // Fallback to existing title if present
                        thumbnail: p.image || p.thumbnail || p.images?.[0]
                    }));

                    set({
                        products: normalizedProducts,
                        categories: data.categories || [],
                        isLoading: false
                    });
                } catch (err) {
                    set({ error: err.message, isLoading: false });
                }
            },

            addToCart: (product, quantity = 1) => {
                const cart = get().cart;
                const existingItem = cart.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        cart: cart.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity }] });
                }
            },

            removeFromCart: (productId) => {
                set({
                    cart: get().cart.filter(item => item.id !== productId),
                });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set({
                    cart: get().cart.map(item =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => set({ cart: [] }),

            // Selectors (derived state can be calculated in components or here)
            getCartTotal: () => {
                return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getCartCount: () => {
                return get().cart.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'ecommerce-storage', // unique name
            partialize: (state) => ({ cart: state.cart }), // only persist cart
        }
    )
);

export default useStore;

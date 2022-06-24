import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface CartState<T> {
  cartOpen: boolean;
  closeCart: () => void;
  setCartOpen: (state: SetStateAction<T>) => void;
  openCart: () => void;
}

const initialState = {
  cartOpen: false,
  closeCart: () => {},
  setCartOpen: () => {},
  openCart: () => {},
};

const LocalStateContext = createContext<CartState<boolean>>(initialState); // (createContext < null) | CartState<T>(null);
const LocalStateProvider = LocalStateContext.Provider;

interface Props {
  children?: ReactNode;
}

function CartStateProvider({ children }: Props) {
  const [cartOpen, setCartOpen] = useState(initialState.cartOpen);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function addToCart(item: any) {
    console.log('add to cart');
  }

  function removeFromCart(item: any) {
    console.log('remove from cart');
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
}

// Make a custom hook to accces the cart local state

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };

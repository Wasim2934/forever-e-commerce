import { createContext, useEffect, useState } from "react"
import { products } from '../assets/assets'
import { toast } from "react-toastify";

export const shopContext = createContext()
 
const ShopContextProvider = ({children}) => {

  const currency = '$';
  const delivery_fee = 10;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    
    if (!size) {
      toast.error('Select product size');
      return; 
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  }

  const getCartCount = () => {
    let totalCount = 0;

    for (let items in cartItems) {
      for (let item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item]
        }
      }
    }
    return totalCount;
  }

  const value = {
    products,
    currency,
    delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart, getCartCount
  }

  return (
    <shopContext.Provider value={value}>
      {children}
    </shopContext.Provider>
  )

}

export default ShopContextProvider;
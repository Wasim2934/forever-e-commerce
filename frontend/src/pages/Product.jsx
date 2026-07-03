import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopContext } from '../context/ShopContext';

const Product = () => {

  const { productId } = useParams();  
  const { products } = useContext(shopContext)
  const [ productData, setProductData ] = useState(false)
  const [ image, setImage ] = useState('');

const fetchProductData = async () => {

  products.map((item) => {
    if (item._id === productId) {
      setProductData(item);
      console.log(item);
      setImage(item.image[0]);
      return null;
    }
  })

}

useEffect(() => {
  fetchProductData()
}, [productId, products])

  return productData ? (
    <div className=''>

    </div>
  ) : (
    <div className='opacity-0'>

    </div>
  )
}

export default Product
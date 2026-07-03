import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

  const { productId } = useParams();  

  const [value, setValue] = useState();

  return (
    <div>

    </div>
  )
}

export default Product
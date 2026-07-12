import React from 'react'
import { useContext } from 'react'
import { shopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(shopContext )
    const [searchParams, setSearchParams] = useSearchParams ()    

    const success = searchParams.get('success') 
    const orderId = searchParams.get('orderId') 

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers: {token}})

            if (response.data.success) {
                toast.success('Payment Successful')
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

  return (
    <div>
        
    </div>
  )
}

export default Verify
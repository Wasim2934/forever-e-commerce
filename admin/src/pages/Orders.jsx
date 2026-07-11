import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

const Orders = ({token}) => {

  const [orders, setOrders] = useState([])  

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response.data)
      setOrders(response.data.orders || [])
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
        
    </div>
  )
}

export default Orders
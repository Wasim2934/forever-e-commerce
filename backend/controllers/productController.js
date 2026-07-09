import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

        const image1 = req.files?.image1?.[0]
        const image2 = req.files?.image2?.[0]
        const image3 = req.files?.image3?.[0]
        const image4 = req.files?.image4?.[0]

        const images = [image1, image2, image3, image4].filter(Boolean)

        // Atleast one image is required
        if (!images.length) {
            return res.json({ success: false, message: 'At least one image is required' })
        }
 
        const imageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
  
        const productData = new productModel({
            name,
            description,
            price: Number(price),
            image: imageUrl,
            category,
            subCategory,
            sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes || '[]'),
            bestseller: Boolean(bestSeller),
            date: Date.now()
        })

        await productData.save()

        res.json({ success: true, message: 'Product added', product: productData })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body
        await productModel.findByIdAndDelete(id)
        res.json({ success: true, message: 'Product removed' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { id } = req.body
        const product = await productModel.findById(id)

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }

        res.json({ success: true, product })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }

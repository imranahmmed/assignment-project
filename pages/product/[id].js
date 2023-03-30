import Div from "@/components/Div"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/router"
import { useSelector } from 'react-redux';
import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import HeaderPart from "@/components/Header";
const ProductId = () => {
    const userAuthData = useSelector(state => state)
    const token = userAuthData.authData.userInfo && userAuthData.authData.userInfo.token
    const userId = userAuthData.authData.userInfo && userAuthData.authData.userInfo.id
    const shopId = userAuthData.authData.userInfo && userAuthData.authData.userInfo.shop_id
    let [productDetails, setProductDetails] = useState([])
    const router = useRouter()
    const productId = router.query.id

    useEffect(() => {
        if (!userAuthData.authData.userInfo) {
            router.push('/login')
        }
    }, [])

    const getProductDetails = async () => {
        let url = `https://dev.funnelliner.com/api/v1/client/products/${productId}`
        let config = {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "shop-id": shopId,
                "id": userId,
                "authorization": token,
            }
        }
        let gettedproductDetails = await axios.get(url, config)
        setProductDetails(gettedproductDetails.data.data)
    }

    const { main_image, product_name, price, short_description } = productDetails
    console.log(productDetails)
    useEffect(() => {
        getProductDetails()
    }, [])




    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [mainImage, setMainImage] = useState([])

    const [formData, setFormData] = useState({
        product_name: "",
        price: "",
        discount: "",
        product_code: "",
        product_qty: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const onImageChange = (e) => {
        setMainImage(e.target.files[0]);
    }


    const handleProductUpdate = async (e) => {
        e.preventDefault()
        const formImageData = new FormData()
        formImageData.append('main_image', mainImage)

        let url = `https://dev.funnelliner.com/api/v1/client/products/${productId}`
        let config = {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "id": userId,
                "shop-id": shopId,
                "authorization": token,
                "Content-Type": "multipart/form-data"
            }
        }

        let newProduct = await axios.patch(url, {
            product_name: formData.product_name,
            price: formData.price,
            discount: parseInt(formData.discount),
            main_image: formImageData.get("main_image"),
            product_code: formData.product_code,
            product_qty: formData.product_qty,
        }, config)

        console.log(newProduct)
    }



    return (
        <>
            <HeaderPart />

            <Div className="flex gap-5 p-5">
                <Div className="border-b p-3 border-b-slate-400 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 text-black">
                    <img src={main_image && main_image.name} alt={product_name} className="h-[200px] w-[200px] object-cover object-center group-hover:opacity-75" />
                    <h3 className="mt-4 text-lg text-gray-700">{productDetails && productDetails.product_name}</h3>
                    <p>{short_description}</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>

                    <Div className="flex gap-5">
                        <Button onClick={() => setShowUpdateForm(!showUpdateForm)} className="bg-orange-400 p-3 text-center px-10 font-semibold text-lg text-white rounded">Update This Product</Button>
                        <Link href="/product" className="bg-orange-400 p-3 text-center px-10 font-semibold text-lg text-white rounded">Back to product List</Link>
                    </Div>
                </Div>

                {showUpdateForm &&
                    <Div className="border-b pb-3 border-b-slate-400 aspect-h-1  w-full overflow-hidden rounded-lg bg-gray-200 p-5">
                        <h3 className="text-3xl font-semibold text-black mb-5">Update Product</h3>

                        <form action="" method="patch" className="flex flex-col gap-3" onSubmit={handleProductUpdate} encType="multipart/form-data">
                            <InputBox onChange={handleChange} className="p-3 bg-white shadow rounded text-black" type="text" name="product_name" placeholder="product name" />
                            <InputBox onChange={handleChange} className="p-3 bg-white shadow rounded text-black" type="text" name="price" placeholder="price" />
                            <InputBox onChange={handleChange} className="p-3 bg-white shadow rounded text-black" type="text" name="discount" placeholder="discount" />
                            <InputBox onChange={onImageChange} className="p-3 bg-white shadow rounded text-black" type="file" name="main_image" />
                            <InputBox onChange={handleChange} className="p-3 bg-white shadow rounded text-black" type="text" name="product_code" placeholder="Product Code" />
                            <InputBox onChange={handleChange} className="p-3 bg-white shadow rounded text-black" type="text" name="product_qty" placeholder="Product Quantity" />

                            <Button type="submit" className="bg-blue-500 py-3 font-semibold text-xl text-white">Update Product</Button>
                        </form>
                    </Div>
                }
            </Div>

        </>
    )
}

export default ProductId
import Div from "@/components/Div"
import ProductCard from "@/components/ProductCard"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useSelector } from 'react-redux';
import HeaderPart from "@/components/Header";
import { useRouter } from 'next/router';

const Products = () => {
  const userAuthData = useSelector(state => state)
  const token = userAuthData.authData.userInfo && userAuthData.authData.userInfo.token
  const userId = userAuthData.authData.userInfo && userAuthData.authData.userInfo.id
  const shopId = userAuthData.authData.userInfo && userAuthData.authData.userInfo.shop_id
  const router = useRouter()
  let [productListData, setProductListData] = useState([])

  useEffect(() => {
    if (!userAuthData.authData.userInfo) {
      router.push('/login')
    }
  }, [])

  const getProductData = async () => {
    let url = `https://dev.funnelliner.com/api/v1/client/products`
    let config = {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "id": userId,
        "shop-id": shopId,
        "authorization": token,
      }
    }
    let productsList = await axios.get(url, config)
    setProductListData(productsList.data.data)
  }

  useEffect(() => {
    getProductData()
  }, [])

  return (
    <>
      <HeaderPart />
      <Div className="bg-white">
        <Div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-black text-3xl font-semibold mb-5 flex w-full justify-between">Products <Link className="underline" href="product/create-product">Add New Product</Link></h2>
          {productListData.length > 0 ?
            <Div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {productListData && productListData.map((item, index) =>
                <ProductCard productData={item} key={index} />
              )}
            </Div>
            :
            <h3 className="text-black text-2xl font-semibold bg-slate-300 p-5">No Product Available</h3>
          }
        </Div>
      </Div>
    </>
  )
}

export default Products
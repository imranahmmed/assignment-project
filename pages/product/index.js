import Div from "@/components/Div"
import ProductCard from "@/components/ProductCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import Link from "next/link";

const userAuthData = useSelector(state => state)
const token = userAuthData.authData.userInfo.token
const userId = userAuthData.authData.userInfo.id
const shopId = userAuthData.authData.userInfo.shop_id

export const getStaticProps = async () => {
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
  return {
    props: {
      productsList
    }
  }
  // setProductListData(productsList.data.data)
}


const Products = ({ productsList }) => {

  let [productListData, setProductListData] = useState([])

  return (
    <>
      <Div className="bg-white">
        <Div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-black text-3xl font-semibold mb-5 flex w-full justify-between">Products <Link className="underline" href="product/create-product">Add New Product</Link></h2>

          <Div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsList && productsList.map((item, index) =>
              <ProductCard productData={item} key={index} />
            )}
          </Div>
        </Div>
      </Div>




    </>
  )
}

export default Products
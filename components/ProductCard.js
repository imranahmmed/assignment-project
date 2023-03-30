import Div from "./Div"
import Link from "next/link"
const ProductCard = ({productData}) => {
    const{id, main_image, product_name, price} = productData
    return (
        <Link href={`https://dev.funnelliner.com/api/v1/client/products/${id}`} className="group border-2 border-slate-400 p-5">
            <Div className="border-b pb-3 border-b-slate-400 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img src={main_image.name} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
            </Div>
            <h3 className="mt-4 text-lg text-gray-700">{product_name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
        </Link>
    )
}

export default ProductCard
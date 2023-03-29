import { useRouter } from "next/router"
const ProductSlug = () => {
    const router = useRouter()
    const slug = router.query.product_slug
    return (
        <div>This is the {slug} page</div>
    )
}

export default ProductSlug
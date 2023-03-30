import Div from "./Div"
import { FiPower } from "react-icons/fi"
import Button from "./Button"
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { activeUser } from '@/redux/slices/authSlice';
const HeaderPart = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    let handleLogout = () => {
        localStorage.removeItem("userInfo");
        dispatch(activeUser(null));
        router.push('/login')
    }
    return (
        <Div className="w-full bg-{#0449760a} mt-5 text-slate-200 text-4xl p-5 text-center flex justify-center mb-5 shadow-sm rounded border border-slate-900">
            <Button onClick={handleLogout}>
                <FiPower className="cursor-pointer" />
            </Button>
        </Div>
    )
}

export default HeaderPart
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import InputBox from '@/components/InputBox';
import Div from '@/components/Div';
import Typhography from '@/components/Typhography';
import { FaEnvelope, FaUserAlt, FaKey, FaPhoneAlt, FaShoppingBasket } from 'react-icons/fa';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import ErrorMsg from '@/components/ErrorMsg';
import Button from '@/components/Button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Home({ params }) {
	const router = useRouter()
	const userAuthData = useSelector(state => state)

	useEffect(() => {
		if (userAuthData.authData.userInfo) {
			router.push('/product')
		}
	}, [])

	let [showPass, setSetShowPass] = useState(false);
	let [showConfirmPass, setSetShowConfirmPass] = useState(false);
	let [registrationData, setRegistrationData] = useState({
		registerEmail: "",
		registerFullName: "",
		registerShopName: "",
		registerPhone: "",
		registerPassword: "",
		registerConfirmPassword: "",
	})

	let [registrationFormErrorMsg, setRegistrationFormErrorMsg] = useState({
		registerEmail: "",
		registerFullName: "",
		registerShopName: "",
		registerPhone: "",
		registerPassword: "",
		registerConfirmPassword: "",
	});

	let handleChange = (e) => {
		const { name, value } = e.target
		setRegistrationData({ ...registrationData, [name]: value })
		setRegistrationFormErrorMsg({ ...registrationFormErrorMsg, [name]: "" })
	}


	let handleRegistration = async () => {
		const validationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (registrationData.registerFullName === "") {
			setRegistrationFormErrorMsg({ ...registrationFormErrorMsg, registerFullName: "Full Name Required." })
		} else if (registrationData.registerShopName === "") {
			setRegistrationFormErrorMsg({ ...registrationFormErrorMsg, registerShopName: "Shop Name Required." })
		} else if (registrationData.registerEmail === "") {
			setRegistrationFormErrorMsg({ ...registrationFormErrorMsg, registerEmail: "Email Required." })
		} else if (!validationPattern.test(registrationData.registerEmail)) {
			setRegistrationFormErrorMsg({ ...registrationFormErrorMsg, registerEmail: "Valid Email Required." })
		} else if (registrationData.registerPhone === "") {
			setRegistrationFormErrorMsg({ ...registrationFormErrorMsg, registerPhone: "Phone Number Required." })
		} else if (registrationData.registerPassword === "") {
			setRegistrationFormErrorMsg({ ...registrationFormErrorMsg, registerPassword: "Password Required." })
		} else {
			let url = 'https://dev.funnelliner.com/api/v1/signup'
			let config = {
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				}
			}

			let response = await axios.post(url, {
				name: registrationData.registerFullName,
				phone: registrationData.registerPhone,
				shop_name: registrationData.registerShopName,
				email: registrationData.registerEmail,
				password: registrationData.registerPassword,
				password_confirmation: registrationData.registerConfirmPassword,
			}, config)

			if (response.data.success == true) {
				toast.success('Registration Successfull.', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});

				router.push('/login')
			} else {
				toast.danger('Registration Failed.', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}
		}
	}

	return (
		<>
			<Head>
				<title>Registration</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<main className={styles.main}>
				<Div className="flex flex-col">
					<Div className={styles.card}>
						<Typhography as="h1" className="text-3xl font-bold underline mb-2 text-white">Registration</Typhography>
						<Typhography as='small' className='heading text-[#f3f4ff] text-xl font-medium opacity-50'>Free register and you can enjoy it</Typhography>

						<Div className="flex flex-col mt-5">

							<Div className="block mb-5">
								<Div className='relative'>
									<div className="absolute inset-y-0 left-0 flex items-center justify-center pl-5">
										<FaUserAlt className='text-lg text-slate-400' />
									</div>
									<InputBox onChange={handleChange} name='registerFullName' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type='text' placeholder='Full Name' />
								</Div>

								{registrationFormErrorMsg.registerFullName &&
									<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
										<Typhography as='h3'>{registrationFormErrorMsg.registerFullName}</Typhography>
									</ErrorMsg>
								}
							</Div>

							<Div className="block mb-5">
								<Div className='relative'>
									<div className="absolute inset-y-0 left-0 flex items-center pl-5">
										<FaShoppingBasket className='text-lg text-slate-400' />
									</div>
									<InputBox onChange={handleChange} name='registerShopName' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type='text' placeholder='Shop Name' />
								</Div>

								{registrationFormErrorMsg.registerShopName &&
									<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
										<Typhography as='h3'>{registrationFormErrorMsg.registerShopName}</Typhography>
									</ErrorMsg>
								}
							</Div>

							<Div className="block mb-5">
								<Div className='relative'>
									<div className="absolute inset-y-0 left-0 flex items-center pl-5">
										<FaEnvelope className='text-lg text-slate-400' />
									</div>

									<InputBox onChange={handleChange} name='registerEmail' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type='email' placeholder='Email Address' />
								</Div>

								{registrationFormErrorMsg.registerEmail &&
									<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
										<Typhography as='h3'>{registrationFormErrorMsg.registerEmail}</Typhography>
									</ErrorMsg>
								}
							</Div>

							<Div className="block mb-5">
								<Div className='relative'>
									<div className="absolute inset-y-0 left-0 flex items-center pl-5">
										<FaPhoneAlt className='text-lg text-slate-400' />
									</div>
									<InputBox onChange={handleChange} name='registerPhone' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type='number' placeholder='Phone Number' />
								</Div>

								{registrationFormErrorMsg.registerPhone &&
									<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
										<Typhography as='h3'>{registrationFormErrorMsg.registerPhone}</Typhography>
									</ErrorMsg>
								}
							</Div>

							<Div className="block mb-5">
								<Div className='relative'>
									<div className="absolute inset-y-0 left-0 flex items-center pl-5">
										<FaKey className='text-lg text-slate-400' />
									</div>
									<InputBox onChange={handleChange} name='registerPassword' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' placeholder='Password' type={showPass ? 'text' : 'password'} />
									{showPass
										?
										<Div className="absolute inset-y-0 right-0 flex items-center pl-5 pr-5 cursor-pointer">
											<VscEye onClick={() => { setSetShowPass(!showPass) }} className='text-lg text-slate-400' />
										</Div>
										:
										<Div className="absolute inset-y-0 right-0 flex items-center pl-5 pr-5 cursor-pointer">
											<VscEyeClosed onClick={() => { setSetShowPass(!showPass) }} className='text-lg text-slate-400' />
										</Div>
									}
								</Div>

								{registrationFormErrorMsg.registerPassword &&
									<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
										<Typhography as='h3'>{registrationFormErrorMsg.registerPassword}</Typhography>
									</ErrorMsg>
								}
							</Div>

							<Div className="block mb-5">
								<Div className='relative'>
									<div className="absolute inset-y-0 left-0 flex items-center pl-5">
										<FaKey className='text-lg text-slate-400' />
									</div>
									<InputBox onChange={handleChange} name='registerConfirmPassword' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' placeholder='Confirm Password' type={showConfirmPass ? 'text' : 'password'} />

									{showConfirmPass
										?
										<Div className="absolute inset-y-0 right-0 flex items-center pl-5 pr-5 cursor-pointer">
											<VscEye onClick={() => { setSetShowConfirmPass(!showConfirmPass) }} className='text-lg text-slate-400' />
										</Div>
										:
										<Div className="absolute inset-y-0 right-0 flex items-center pl-5 pr-5 cursor-pointer">
											<VscEyeClosed onClick={() => { setSetShowConfirmPass(!showConfirmPass) }} className='text-lg text-slate-400' />
										</Div>
									}
								</Div>
							</Div>
						</Div>

						<Button onClick={handleRegistration} className='bg-[#086FA4] w-full text-white rounded-md py-4 text-xl mb-5'>Register</Button>


						<Typhography as='small' className='heading text-[#e2e4ff] text-lg font-regular mb-16 mt-5'>
							Already have an account?
							<Link href="/login" className='text-white underline font-bold ml-2'>Login</Link>
						</Typhography>
					</Div>


				</Div>
			</main>
		</>
	)
}

import { useState, useEffect } from 'react';

import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import InputBox from '@/components/InputBox'
import Div from '@/components/Div'
import Typhography from '@/components/Typhography'
import { FaKey, FaPhoneAlt, } from 'react-icons/fa';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import axios from 'axios';
import Button from '@/components/Button'
import Link from 'next/link'
import ErrorMsg from '@/components/ErrorMsg';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
	let [showPass, setSetShowPass] = useState(false);
	let [showConfirmPass, setSetShowConfirmPass] = useState(false);
	const router = useRouter()
	const [formData, setFormData] = useState({
		phone: "",
		password: "",
		password_confirmation: "",
	});

	const [formErrData, setFormErrData] = useState({
		phone: "",
		password: "",
		password_confirmation: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value });
		setFormErrData({ ...formErrData, [name]: "" })
	}

	const handleForgotPass = async () => {
		if (formData.phone === "") {
			setFormErrData({ ...formErrData, phone: "Phone Number Required." })
		} else if (formData.password === "") {
			setFormErrData({ ...formErrData, password: "Password Required." })
		} else if (formData.password_confirmation === "") {
			setFormErrData({ ...formErrData, password_confirmation: "Confirm Password Required." })
		} else {
			let url = 'https://dev.funnelliner.com/api/v1/client/update-password'
			let config = {
				headers: {
					"X-Requested-With": "XMLHttpRequest"
				}
			}

			let updatePassword = await axios.post(url, {
				phone: formData.phone,
				password: formData.password,
				password_confirmation: formData.password_confirmation,
			}, config)

			router.push('/login')
		}
	}


	let [sentOTP, setSentOTP] = useState(false);
	let [sentOTPErr, setSentOTPErr] = useState("");

	let [verifiedOTP, setVerifiedOTP] = useState(false);
	let [verifiedOTPErr, setVerifiedOTPErr] = useState(false);

	let [sendOtpPhone, setSendOtpPhone] = useState('');

	let [verifyOTPPhone, setVerifyOTPPhone] = useState('');
	let [verifyOTPNumber, setVerifyOTPNumber] = useState('');

	const handleSendOtp = async () => {
		let url = 'https://dev.funnelliner.com/api/v1/client/forget-password'
		let config = {
			headers: {
				"X-Requested-With": "XMLHttpRequest"
			}
		}
		let sendOtp = await axios.post(url, {
			phone: sendOtpPhone,
		}, config)

		if (sendOtp.data.success == true) {
			setSentOTP(true)
			toast.success('OTP Sent Successfully.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else {
			setSentOTPErr(sendOtp.data.message)
		}
	}

	const handleVerifyOtp = async () => {
		let url = 'https://dev.funnelliner.com/api/v1/client/otp-verify'
		let config = {
			headers: {
				"X-Requested-With": "XMLHttpRequest"
			}
		}
		let verifyOtp = await axios.post(url, {
			phone: verifyOTPPhone,
			otp: verifyOTPNumber,
		}, config)

		if (verifyOtp.data.success == true) {
			toast.success('OTP Verified Successfully.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setVerifiedOTP(true)
		} else {
			setVerifiedOTPErr(verifyOtp.data.message)
		}
	}

	return (
		<>
			<Head>
				<title>Forgot Password</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<main className={styles.main}>
				<Div className="flex flex-col">
					{verifiedOTP ?
						<Div className={styles.card}>
							<Typhography as="h1" className="text-3xl font-bold underline mb-2 text-white">Forgot Password</Typhography>
							<Typhography as='small' className='heading text-[#f3f4ff] text-xl font-medium opacity-50'>Change your password</Typhography>

							<>
								<Div className="flex flex-col mt-5">
									<Div className='block mb-5'>
										<Div className='relative'>
											<Div className="absolute inset-y-0 left-0 flex items-center pl-5">
												<FaPhoneAlt className='text-lg text-slate-400' />
											</Div>
											<InputBox onChange={handleChange} name='phone' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type='number' placeholder='Phone Number' />
										</Div>
										{formErrData.phone &&
											<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
												<Typhography as='h3'>{formErrData.phone}</Typhography>
											</ErrorMsg>
										}
									</Div>

									<Div className='block mb-5'>
										<Div className='relative'>
											<Div className="absolute inset-y-0 left-0 flex items-center pl-5">
												<FaKey className='text-lg text-slate-400' />
											</Div>
											<InputBox onChange={handleChange} name='password' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' placeholder='Password' type={showPass ? 'text' : 'password'} />
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

										{formErrData.password &&
											<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
												<Typhography as='h3'>{formErrData.password}</Typhography>
											</ErrorMsg>
										}
									</Div>

									<Div className='block mb-5'>
										<Div className='relative'>
											<Div className="absolute inset-y-0 left-0 flex items-center pl-5">
												<FaKey className='text-lg text-slate-400' />
											</Div>
											<InputBox onChange={handleChange} name='password_confirmation' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' placeholder='Confirm Password' type={showConfirmPass ? 'text' : 'password'} />

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

										{formErrData.password_confirmation &&
											<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded'>
												<Typhography as='h3'>{formErrData.password_confirmation}</Typhography>
											</ErrorMsg>
										}
									</Div>
								</Div>

								<Div className="flex gap-5">
									<Button onClick={handleForgotPass} className='bg-[#086FA4] w-full text-white rounded-md py-4 text-xl mb-5'>Change Password</Button>
									<Link href="/login" className='text-center bg-[#cdd2d4] w-full text-[#086FA4] rounded-md py-4 text-xl mb-5'>Cancle</Link>
								</Div>
							</>
						</Div>
						:
						<Div className={styles.card}>
							<Typhography as="h1" className="text-3xl font-bold underline mb-2 text-white">OTP Verification</Typhography>
							<Typhography as='small' className='heading text-[#f3f4ff] text-xl font-medium opacity-50'>Enter the code sent to your phone number.</Typhography>

							{sentOTP ?
								<Div>
									<Div className='block mb-5 mt-5'>
										<Div className='relative'>
											<Div className="absolute inset-y-0 left-0 flex items-center pl-5">
												<FaPhoneAlt className='text-lg text-slate-400' />
											</Div>
											<InputBox onChange={(e) => setVerifyOTPPhone(e.target.value)} name='phone' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type='number' placeholder='Phone Number' />
										</Div>
									</Div>

									<Div className="otp flex mt-5 gap-5 mb-5">
										<InputBox onChange={(e) => setVerifyOTPNumber(e.target.value)} name='otp' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-full border border-slate-300 font-semibold text-[#11175D] rounded-md p-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-left text-2xl' type='text' placeholder='000000' maxlength="6" />
									</Div>

									<Div className="flex gap-3">
										<Button onClick={handleVerifyOtp} className='bg-[#086FA4] w-full text-white rounded-md py-4 text-xl mb-5'>Verify OTP</Button>
										<Link href="/login" className='text-center bg-[#cdd2d4] w-full text-[#086FA4] rounded-md py-4 text-xl mb-5'>Cancle</Link>
									</Div>
									{verifiedOTPErr &&
										<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded mb-5'>
											<Typhography as='h3'>{verifiedOTPErr}</Typhography>
										</ErrorMsg>
									}
								</Div>
								:
								<Div>
									<Div className='block mb-5 mt-5'>
										<Div className='relative'>
											<Div className="absolute inset-y-0 left-0 flex items-center pl-5">
												<FaPhoneAlt className='text-lg text-slate-400' />
											</Div>
											<InputBox onChange={(event) => setSendOtpPhone(event.target.value)} name='phone' className='placeholder:text-slate-400 placeholder:text-lg block bg-white w-[25vw] border border-slate-300 text-xl font-semibold text-[#11175D] rounded-md py-4 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type='number' placeholder='Phone Number' />
										</Div>
									</Div>

									<Div className="flex gap-3">
										<Button onClick={handleSendOtp} className='bg-[#086FA4] w-full text-white rounded-md py-4 text-xl mb-5'>Send OTP</Button>
										<Link href="/login" className='text-center bg-[#cdd2d4] w-full text-[#086FA4] rounded-md py-4 text-xl mb-5'>Cancle</Link>
									</Div>
									{sentOTPErr &&
										<ErrorMsg className='bg-red-500 text-left text-white px-5 py-3 mt-3 font-medium text-lg rounded mb-5'>
											<Typhography as='h3'>{sentOTPErr}</Typhography>
										</ErrorMsg>
									}
								</Div>
							}

							<Typhography as='small' className='heading text-[#e2e4ff] text-lg font-regular mb-16 mt-5'>
								Already have an account?
								<Link href="/login" className='text-white underline font-bold ml-2'>Login</Link>
							</Typhography>
						</Div>
					}
				</Div>
			</main>
		</>
	)
}

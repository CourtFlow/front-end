'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

export default function LoginPage() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    try {
        // console.log('Logging in with', email, password);
        // console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email,
            password,
        });
        router.push('/dashboard');
        } catch {
            setIsError(true);
        }
    };

    const handleRegister = async () => {
		if (password !== confirmPassword) {
			setIsError(true);
			return;
		}

		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
				email,
				password,
			});
			// auto login after register
			await handleLogin();
		} catch {
			setIsError(true);
		}
	};

    return (
		<div className="flex w-dvw h-dvh items-center justify-center">
			{/* <Image
				className="-z-10"
				src="/background.png"
				fill
				alt="Background Image"
			/> */}

			<div className="w-[90dvw] h-[90dvh] flex flex-row items-center bg-white rounded-lg border-2 border-black">
				{/* left side - welcome section */}
				<div className="w-full flex flex-col items-center">
					<p className="font-istok text-black text-3xl pb-5">Welcome to</p>
                    <p className="font-istok text-black text-4xl">Court Flow</p>
					<Image src="/logo.svg" alt="C-V2X logo" width={300} height={80} />
				</div>

				{/* right side - login/register form */}
				<div className="w-full flex flex-col items-center">
					<p className="font-istok text-black text-h2 pb-4">
						{isRegister ? 'Register' : 'Sign In'}
					</p>

					<div className="flex flex-col items-center w-full gap-8">
						{/* email */}
						<div className="flex flex-col w-3/5 gap-2">
							<p className="font-istok text-black text-p1">Email</p>
							<input
								className={`px-8 py-4 rounded-md border-2 ${
									isError ? 'border-red' : 'border-black'
								} focus:outline-blue font-istok text-black text-p3`}
								type="text"
								placeholder="Email"
								value={email}
								onChange={(e) => {
									setIsError(false);
									setEmail(e.target.value);
								}}
							/>
						</div>

						{/* password */}
						<div className="flex flex-col w-3/5 gap-2">
							<p className="font-istok text-black text-p1">Password</p>
							<input
								className={`px-8 py-4 rounded-md border-2 ${
									isError ? 'border-red' : 'border-black'
								} focus:outline-blue font-istok text-black text-p3`}
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => {
									setIsError(false);
									setPassword(e.target.value);
								}}
							/>
						</div>

						{/* confirm password (only register mode) */}
						{isRegister && (
							<div className="flex flex-col w-3/5 gap-2">
								<p className="font-istok text-black text-p1">Confirm Password</p>
								<input
									className={`px-8 py-4 rounded-md border-2 ${
										isError ? 'border-red' : 'border-black'
									} focus:outline-blue font-istok text-black text-p3`}
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => {
										setIsError(false);
										setConfirmPassword(e.target.value);
									}}
								/>
							</div>
						)}

						{/* error message */}
						<p className="font-istok text-red text-p4">
							{isError &&
								(isRegister
									? 'Register failed! Please check your inputs.'
									: 'Login failed! Invalid email or password.')}
						</p>
					</div>

					{/* buttons */}
					<div className="w-[40%] flex flex-col items-center gap-8">
                    <button
                        onClick={isRegister ? handleRegister : handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-all duration-200">
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                    <p className="font-istok text-p4">
                        {isRegister ? (
                            <>
                            Already have an account?{' '}
                            <button
                                className="text-blue underline"
                                onClick={() => {
                                setIsError(false);
                                setIsRegister(false);
                                setPassword('');
                                setConfirmPassword('');
                                }}
                            >
                                Sign in
                            </button>
                            </>
                        ) : (
                            <>
                            Don't have an account?{' '}
                            <button
                                className="text-blue underline"
                                onClick={() => {
                                setIsError(false);
                                setIsRegister(true);
                                setPassword('');
                                setConfirmPassword('');
                                }}
                            >
                                Register
                            </button>
                            </>
                        )}
                        </p>
					</div>
				</div>
			</div>
		</div>
	);

}
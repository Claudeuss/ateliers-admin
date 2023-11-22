'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { auth } from '../../../lib/firebase/page';


const Page = () => {
    const { push } = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: FormEvent) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {

            push("/");


        }
        ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            console.log(errorCode)
        });
        e.preventDefault();
        console.log("onSubmit");
        console.log(email);
        console.log(password);
    };
    return (
        <div>
            <>
                <div className='bg-white w-screen h-screen grid grid-cols-2'>

                    <div className='h-screen relative mr-10'>

                        <Image
                            src="/assets/images/loginpage.png"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                        />

                        <div className='absolute flex pl-10 pt-6'>
                            <img className='h-16 w-16 mr-4' src="/assets/images/1.png" alt="" />
                            <h1 className='text-2xl text-white my-auto'>Ateliers.GO</h1>

                        </div>
                        <div className='absolute mt-60 ml-20 mr-28'>
                            <h1 className='text-3xl text-white font-semibold pb-2 pt-8'>Welcome to Ateliers</h1>

                            <p className='text-l text-white'>Disini adalah tempat login bagi admin ateliers.go silahkan login untuk mengakses halaman yang sesuai dengan pekerjaan anda Terima Kasih..</p>



                        </div>



                    </div>
                    <div className='mr-10'>
                        <div className='flex justify-center mt-20'>
                            <img className='w-20 h-20' src="/assets/images/7.png" alt="" />

                        </div>
                        <div className='flex justify-center mt-3'>
                            <h1 className='text-center text-3xl font-semibold font-mono'>Hello Again!</h1>
                        </div>
                        <form className='px-24 py-20' onSubmit={onSubmit}>
                            <div className='pb-2'>
                                <div className='flex border-b border-black '>
                                    <img className='my-auto h-5 w-5' src="assets/images/imel.png" alt="" />
                                    <input className='pl-2 w-full text-black py-2 outline-none focus:none'
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='pb-10'>
                                <div className='flex border-b border-black'>
                                    <img className='my-auto h-5 w-5' src="assets/images/pass.png" alt="" />
                                    <input className='pl-2 w-full text-black py-2  outline-none focus:none'
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button className="tracking-wider bg-[#1B24FF] text-[#ffffff] py-3 px-6 font-mono font-black hover:bg-black hover:text-white text-center rounded-full transition-all duration-500 w-full"><a href="/" >
                                    Confirm
                                </a>
                                </button>
                            </div>




                        </form>

                    </div>

                </div>
            </>
        </div>
    );
}

export default Page;
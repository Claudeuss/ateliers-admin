'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { auth, db } from '../../../lib/firebase/page';
import { doc, setDoc } from 'firebase/firestore';
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { PiOfficeChairBold } from "react-icons/pi";



const RegisterPage = () => {
    const { push } = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user role to the database
            const userDocRef = doc(db, 'account', user.uid);
            await setDoc(userDocRef, { email, role, name });

            console.log('User successfully registered.');

            // Redirect to login_admin page after successful registration
            push('/login_admin');
        } catch (error) {
            const errorCode = error;
            const errorMessage = error;
            alert(errorMessage);
            console.error(errorCode);
        }

        console.log('onSubmit');
        console.log(email);
        console.log(name);
        console.log(password);
        console.log(role);
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

                            <p className='text-l text-white'>Disini adalah tempat register bagi admin ateliers.go silahkan login untuk mengakses halaman yang sesuai dengan pekerjaan anda Terima Kasih..</p>

                        </div>
                    </div>
                    <div className='mr-10'>
                        <div className='flex justify-center mt-10'>
                            <img className='w-20 h-20' src="/assets/images/7.png" alt="" />

                        </div>
                        <div className='flex justify-center mt-3'>
                            <h1 className='text-center text-3xl font-semibold font-mono'>Hello Again!</h1>
                        </div>
                        <form className='px-24 py-20' onSubmit={onSubmit}>
                            <div className='pb-2'>
                                <div className='flex border-b border-black '>
                                    <MdOutlineEmail classname="w-5 h-5 my-auto" />
                                    <input className='pl-2 w-full text-black py-2 outline-none focus:none'
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='pb-2'>
                                <div className='flex border-b border-black '>
                                    <FaRegUser classname="w-5 h-5 my-auto" />
                                    <input className='pl-2 w-full text-black py-2 outline-none focus:none'
                                        type="text"
                                        placeholder="Name"
                                        id="name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='pb-2'>
                                <div className='flex border-b border-black '>
                                    <GoLock classname="my-auto h-5 w-5" />

                                    <input className='pl-2 w-full text-black py-2 outline-none focus:none'
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='pb-10'>
                                <div className='flex border-b border-black '>
                                    <PiOfficeChairBold classname="my-auto w-5 h-5" />
                                    <input className='pl-2 w-full text-black py-2 outline-none focus:none'
                                        type="text"
                                        placeholder="Role"
                                        id="role"
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center mb-5'>
                                <button className="tracking-wider bg-[#1B24FF] text-[#ffffff] py-3 px-6 font-mono font-black hover:bg-black hover:text-white text-center rounded-full transition-all duration-500 w-full">
                                    Confirm
                                </button>
                            </div >
                            <a className='flex justify-center' href="/login_admin"><p className='font-semibold'>Login.</p></a>

                        </form>

                    </div>

                </div>
            </>
        </div>
    );
}

export default RegisterPage;

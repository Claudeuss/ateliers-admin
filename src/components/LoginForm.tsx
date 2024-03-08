'use client';
import { useState } from 'react';
import Image from 'next/image';

const LoginForm = () => {
    return (
        <div className="flex">
            <div className="w-1/2 h-screen bg-gray-100 flex justify-center items-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {/* Input fields for login form */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    {/* Submit button for login form */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 h-screen">
                <Image src="/login-image.jpg" alt="Login Image" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
};

const RegisterForm = () => {
    return (
        <div className="flex">
            <div className="w-1/2 h-screen">
                <Image src="/register-image.jpg" alt="Register Image" layout="fill" objectFit="cover" />
            </div>
            <div className="w-1/2 h-screen bg-gray-100 flex justify-center items-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {/* Input fields for register form */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Emails
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    {/* Submit button for register form */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AuthPage = () => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const toggleFormVisibility = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {isLoginFormVisible ? <LoginForm /> : <RegisterForm />}
            <div className="absolute top-0 right-0 m-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={toggleFormVisibility}
                >
                    {isLoginFormVisible ? 'Register' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
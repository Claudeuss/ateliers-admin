"use client";
import { useState } from 'react';
import PopupForm from './popup_form';

const PopupCostumer = ({ isVisible, onClose }: { isVisible?: any, onClose?: any }) => {
    const [showModul, setShowModul] = useState(false);
    if (!isVisible) return null;
    return (
        <div className='z-20 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-[#D9D9D9] w-[650px] flex flex-col '>
                <div className='flex justify-between'>
                    <h1 className='text-xl m-2'>Data Customer</h1>
                    <button className='m-2 pr-1 text-Black text-xl' onClick={() => onClose()}>X</button>

                </div>


                <div className='bg-white p-3 pl-[26px] py-5 rounded '>
                    <div className='flex justify-between pb-3'>

                        <input
                            type="search"
                            name="search"
                            placeholder="search"
                            className="bg-[#D9D9D9] px-5 pr-10 rounded-md text-sm focus:outline-none w-[400px] AiOutlineSearch"


                        />
                        <button className="mr-[15px] w-[180px] place-self-end tracking-wider bg-[#1b23ff] text-[#ffffff] py-2 hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 " onClick={() => setShowModul(true)}>

                            <p className='text-xs'>
                                +New Customer
                            </p>


                        </button>
                    </div>
                    <div className="bg-white drop-shadow-lg h-[230px] overflow-y-auto overflow-x-hidden '>">

                        <table className="table w-full">
                            <thead className='bg-[#D9D9D9]'>
                                <tr className='P-4'>
                                    <th><p className='font-normal mx-1'>No</p></th>
                                    <th><p className='font-normal mx-1'>Name</p></th>
                                    <th><p className='font-normal mx-1'>Address</p></th>
                                    <th><p className='font-normal mx-1'>Came</p></th>
                                    <th><p className='font-normal mx-1'>Categories</p></th>
                                    <th><p className='font-normal mx-2'>Action</p></th>
                                </tr>
                            </thead>
                            <tbody className='overflow-y-auto overflow-x-hidden h-[238px]'>
                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>
                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>

                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>
                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>
                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>
                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>
                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>

                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>  <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>
                                <tr>
                                    <td><p className='text-center'>1</p></td>
                                    <td><p className='text-center'>Udin Melduaks</p></td>
                                    <td><p className='text-center'>Parongpong</p></td>
                                    <td><p className='text-center'>10x</p></td>
                                    <td><p className='text-center'>Wheels</p></td>
                                    <td> <button className="my-2 tracking-wider bg-[#1b23ff] text-[#ffffff]  text-xs  hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full py-1" >
                                        Add+

                                    </button></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <PopupForm isVisible={showModul} onClose={() => setShowModul(false)} />
        </div>
    );
}

export default PopupCostumer;

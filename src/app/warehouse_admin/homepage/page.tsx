import SidebarGudang from '@/components/sidebar_gudang';
import Stockitem from '@/components/stockitem';
import React from 'react'
import { BsBoxSeam, BsBoxes } from "react-icons/bs";
import { SlSocialDropbox } from "react-icons/sl";

const WarehouseDashboard = () => {
    return (
        <>
            <SidebarGudang />
            <div className=' h-full w-screen pl-28 bg-[#EAEAEA] overflow-x-hidden'>
                <div className=' p-5 overflow-y-auto overflow-x-hidden'>
                    <p className=' text-2xl font-semibold'>
                        Dasboard
                    </p>
                    <div className=' px-5'>
                        <div className=' grid grid-cols-3 gap-4 py-4'>
                            <Stockitem icon={<BsBoxes className=" text-white m-auto text-4xl" />} title={'Total Stock'} total={'1000'} />
                            <Stockitem icon={<BsBoxSeam className=" text-white m-auto text-4xl" />} title={'Low Stock'} total={'100'} />
                            <Stockitem icon={<SlSocialDropbox className=" text-white m-auto text-4xl" />} title={'Empty Stock'} total={'10'} />
                        </div>

                        {/* Table User */}

                        <div className='border bg-white p-2 rounded-lg '>
                            <p className=' text-2xl font-semibold my-2'>User</p>
                            <div className=' overflow-y-scroll h-[400px]'>
                                <table className=' table w-full border border-black overflow-y-auto'>
                                    <thead className=' py-2 h-10 border bg-slate-100'>
                                        <tr>
                                            <th className=' w-10 border border-black'>
                                                <p>Id</p>
                                            </th>
                                            <th className=' border w-[400px] border-black'>
                                                <p>Name</p>
                                            </th>
                                            <th className=' border w-[400px] border-black'>
                                                <p>Address</p>
                                            </th>
                                            <th className=' border border-black'>
                                                <p>Come</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className=' overflow-y-auto overflow-x-hidden h-[300px]'>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>
                                                <p>1</p>
                                            </td>
                                            <td className=' border-r border-slate-600 px-2'>
                                                <p>Udin Benedectus</p>
                                            </td>
                                            <td className=' border-r border-slate-600 px-2'>
                                                <p>Cichago</p>
                                            </td>
                                            <td className=' border-r border-slate-600 text-center'>
                                                <p>20x</p>
                                            </td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                        <tr className=' py-2 border-b'>
                                            <td className=' border-r border-slate-600 text-center'>1</td>
                                            <td className=' border-r border-slate-600 px-2'>Udin Benedectus</td>
                                            <td className=' border-r border-slate-600 px-2'>Cicahem</td>
                                            <td className=' border-r border-slate-600 text-center'>10x</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default WarehouseDashboard

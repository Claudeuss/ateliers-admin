'use client';
import SidebarSuper from '@/components/sidebar_super'
import React from 'react'

const page = () => {
  return (
    <>
      <SidebarSuper/>
      <div className='min-h-screen w-full pl-28 bg-[#EAEAEA] overflow-hidden'>
        <div className='p-5'>
            <h1 className='mx-3 text-2xl font-semibold'>User</h1>
            <div className="w-full h-[500px] xl:h-[850px] bg-white my-2 rounded-md shadow-md border border-slate-200 shadow-slate-500 overflow-auto">
                        <table className="table w-full">
                            <thead className='bg-slate-200'>
                                <tr className="border-b border-slate-500">
                                    <th className="w-10 py-2">Id</th>
                                    <th className="w-1/4 py-2">Customer</th>
                                    <th className="w-1/4 py-2">Date</th>
                                    <th className="w-1/4 py-2">Product Name</th>
                                    <th className="w-44 py-2">Quantity</th>
                                    <th className="w-52 py-2">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
        </div>
      </div>
    </>
  )
}

export default page

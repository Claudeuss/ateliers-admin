'use client'
import ChartCard from '@/components/ChartCard'
import SidebarGudang from '@/components/sidebar_gudang'
import React from 'react'


const page: React.FC = () => {
  return (
    <>
    <SidebarGudang/>
    <div className='min-h-screen w-screen pl-28 bg-[#EAEAEA] overflow-x-hidden'>
        <div className='p-5 overflow-y-auto overflow-x-hidden'>
          <p className='text-2xl font-semibold'>
            Admin
          </p>
          <div>
            <ChartCard/>
          </div>
        </div>
    </div>
    </>
  )
}

export default page

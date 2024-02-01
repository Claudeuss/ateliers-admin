'use client'
import ChartCard from '@/components/ChartCard'
import SidebarSuper from '@/components/sidebar_super'
import React from 'react'


const page: React.FC = () => {
  const data = [30, 20, 25, 15, 10];
  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
  return (
    <>
    <SidebarSuper/>
    <div className='min-h-screen w-screen pl-28 bg-[#EAEAEA] overflow-x-hidden'>
        <div className='p-5 overflow-y-auto overflow-x-hidden'>
          <p className='text-2xl font-semibold'>
            Admin
          </p>
          <div className='p-5 flex'>
            <ChartCard data={data} labels={labels}/>
          </div>
        </div>
    </div>
    </>
  )
}

export default page

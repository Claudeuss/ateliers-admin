'use client'
import ChartCard from '@/components/ChartCard'
import SidebarSuper from '@/components/sidebar_super'
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../lib/firebase/page'


const page: React.FC = () => {
  const data = [30, 20, 25, 15, 10];
  const labels = ['Label 1', 'Label 2'];

  const [cart, setCart] = useState<any[]>([]);
    const itemCollectionRef = collection(db, 'transactions');

    useEffect(() => {
        const getCart = async () => {
            try {
                const data: QuerySnapshot = await getDocs(itemCollectionRef);
                setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching spareparts:', error);
            }
        };

        getCart();
    }, []);
    
  return (
    <>
    <SidebarSuper/>
    <div className='min-h-screen w-screen pl-28 bg-[#EAEAEA] overflow-x-hidden'>
        <div className='p-5 overflow-y-auto overflow-x-hidden'>
          <p className='text-2xl font-semibold'>
            Admin
          </p>
          <div>
          <div className='p-5 flex gap-4'>
            <ChartCard data={data} labels={labels}/>
            <div className='flex flex-col flex-grow h-[300px]'>
                <table className='table w-full overflow-y-auto bg-white rounded-md h-[300px]'>
                  <thead>
                    <tr className=' border-b border-slate-500'>
                      <th className='w-10 py-2'>Id</th>
                      <th className='w-1/3 py-2'>Date</th>
                      <th className='w-1/3 py-2'>Product Name</th>
                      <th className='w-44 py-2'>Quantity</th>
                      <th className='w-52 py-2'>Edit</th>
                    </tr>
                  </thead>
                  <tbody className='overflow-auto flex-grow'>
                    {cart.map((item, index) => (
                      <tr className=' border-b' key={item.id}>
                        <td className='text-center border-r'>{index + 1}</td>
                          <td className=' text-center border-r px-2'>
                            {new Date(item.timestamp.seconds * 1000).toLocaleString('en-GB', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                          })}
                        </td>
                        <td className=' text-center border-r px-2'>{item.name}</td>
                        <td className=' text-center border-r'>{item.quantity}</td>
                        <td className='px-2 py-2'>
                            <div className='w-full h-full hover:bg-red-500 hover:text-white py-1 rounded-md'>
                                
                            </div>
                        </td>
                      </tr>
                    ))}
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

export default page

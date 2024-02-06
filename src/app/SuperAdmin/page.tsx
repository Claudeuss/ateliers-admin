'use client'
import ChartCard from '@/components/ChartCard'
import SidebarSuper from '@/components/sidebar_super'
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../lib/firebase/page'
import { BiEdit } from 'react-icons/bi'
import { BsTrash3 } from 'react-icons/bs'


const page: React.FC = () => {
  const data = [30, 20];
  const labels = ['Label 1', 'Label 2'];

  const [transaction, setTransaction] = useState<any[]>([]);
  const itemCollectionRef = collection(db, 'transactions');
  const [items, setitems] = useState<any[]>([]);
  const itemCollection = collection(db, 'sparepart');

  // fetch transaction data
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const data: QuerySnapshot = await getDocs(itemCollectionRef);
        setTransaction(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching spareparts:', error);
      }
    };

    getTransaction();
  }, []);

  // fetch sparepart data
  useEffect(() => {
    const getItem = async () => {
      try {
        const data: QuerySnapshot = await getDocs(itemCollection);
        setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching spareparts:', error);
      }
    };

    getItem();
  }, []);

  return (
    <>
      <SidebarSuper />
      <div className='min-h-screen min-w-screen pl-28 bg-[#EAEAEA] overflow-x-hidden'>
        <div className='p-5 overflow-y-auto overflow-x-hidden'>
          <p className='text-2xl font-semibold'>
            Home
          </p>
          <div className='p-5 gap-y-4'>
            <div className='flex gap-4'>
              <ChartCard data={data} labels={labels} />
              <div className=' overflow-y-scroll h-[300px] w-full'>
                <table className='table w-full overflow-y-auto bg-white rounded-md h-[270px]'>
                  <thead>
                    <tr className=' border-b border-slate-500'>
                      <th className='w-10 py-2'>Id</th>
                      <th className='w-1/3 py-2'>Date</th>
                      <th className='w-1/3 py-2'>Product Name</th>
                      <th className='w-44 py-2'>Quantity</th>
                      <th className='w-52 py-2'>Customer</th>
                    </tr>
                  </thead>
                  <tbody className='overflow-auto flex-grow'>
                    {transaction.map((item, index) => (
                      <tr className=' border-b' key={item.id}>
                        <td className='text-center border-r'>{index + 1}</td>
                        <td className=' text-center border-r px-2'>
                          {new Date(item.timestamp.seconds * 1000).toLocaleString('en-GB', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </td>
                        <td className=' text-center border-r px-2'>{item.name}</td>
                        <td className=' text-center border-r'>{item.quantity}</td>
                        <td className='px-2 py-2'>
                          <div className='w-full h-full text-center'>
                            {item.category}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* table sparepart */}
            <div className=' w-full h-[400px] py-2 bg-white rounded-md mt-4'>
              <div className=' mt-2 h-[340px] overflow-y-scroll'>
                <table className=' table border-t-2 border-black  w-full'>
                  <thead className=' border-b'>
                    <tr>
                      <th className=' min-w-10 xl:w-10 border-r'>Id</th>
                      <th className=' w-64 xl:min-w-96 border-r'>Name</th>
                      <th className=' w-64 xl:min-w-96 border-r'>Price</th>
                      <th className=' w-56 xl:min-w-96 border-r'>Category</th>
                      <th className=' w-56 xl:min-w-72 border-r'>Quantity</th>
                      <th className=' w-auto'>Type</th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {items.map((item, index) => (
                      <tr key={item.id} className='border-b'>
                        <td className='w-10 py-1 text-center border-r'>{index + 1}</td>
                        <td className='w-64 py-1 text-center border-r overflow-hidden whitespace-nowrap px-2'>{item.name}</td>
                        <td className=' w-64 py-1 text-center border-r'>{item.price}</td>
                        <td className=' w-56 py-1 text-center border-r'>{item.category}</td>
                        <td className=' w-56 py-1 text-center border-r'>{item.quantity}</td>
                        <td className=' h-auto py-1 text-center'>
                         {item.type}
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

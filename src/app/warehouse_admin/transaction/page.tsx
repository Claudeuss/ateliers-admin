'use client';
import React, { useEffect, useState } from 'react';
import { BsSearch, BsTrash3 } from 'react-icons/bs';
import { collection, getDocs, QuerySnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../lib/firebase/page';
import SidebarGudang from '@/components/sidebar_gudang';

const TransactionPage = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');

    const itemCollectionRef = collection(db, 'transactions');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data: QuerySnapshot = await getDocs(itemCollectionRef);
                setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleSearch = async () => {
        try {
            let querySnapshot;
            if (searchInput.trim() === '') {
                querySnapshot = await getDocs(itemCollectionRef);
            } else {
                const q = query(itemCollectionRef, where('customer', '==', searchInput));
                querySnapshot = await getDocs(q);
            }
            setTransactions(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error searching transactions:', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchInput]); // Trigger search whenever searchInput changes

    return (
        <>
            <SidebarGudang />
            <div className="min-h-screen pl-28 w-full h-screen bg-[#eaeaea]">
                <div className="p-5">
                    <div className="justify-between flex">
                        <h1 className="text-2xl font-semibold">Transaction</h1>
                        <div className="flex w-[400px] h-8 my-auto bg-white gap-2 py-1 px-2 rounded-md shadow-sm shadow-slate-500 items-center">
                            <BsSearch className="text-slate-700" />
                            <input
                                placeholder="Search Here"
                                type="search"
                                name=""
                                id=""
                                className="w-full border-none outline-none text-base"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                    </div>
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
                                {transactions.map((item, index) => (
                                    <tr className="border-b" key={item.id}>
                                        <td className="text-center border-r">{index + 1}</td>
                                        <td className="text-center border-r">{item.customer}</td>
                                        <td className="xl:w-40 text-center border-r px-2">
                                            {new Date(item.timestamp.seconds * 1000).toLocaleString('en-GB', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="text-center border-r px-2">{item.name}</td>
                                        <td className="text-center border-r">{item.quantity}</td>
                                        <td className="px-2 py-2">
                                            <div className='mx-auto w-40 h-full hover:bg-red-500 hover:text-white py-1 rounded-xl bg-[#ff000062] hover:opacity-100 text-red-500'>
                                                <BsTrash3 className='mx-auto text-xl ' />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionPage;

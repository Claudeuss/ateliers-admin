'use client';
import SidebarGudang from '@/components/sidebar_gudang';
import Stockitem from '@/components/stockitem';
import { QuerySnapshot, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BsBoxSeam, BsBoxes } from "react-icons/bs";
import { SlSocialDropbox } from "react-icons/sl";
import { auth, db } from '../../../../lib/firebase/page';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

const WarehouseDashboard = () => {
    const [spareparts, setSparepart] = useState<any[]>([]);
    const itemCollectionRef = collection(db, 'sparepart');
    const { push } = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    // Assuming your database structure has a collection 'accounts' and each document has 'email' and 'role' fields
                    const userDocRef = doc(db, 'account', currentUser.uid);
                    const userDocSnapshot = await getDoc(userDocRef);

                    if (userDocSnapshot.exists()) {
                        const userRole = userDocSnapshot.data().role;

                        if (userRole === 'gudang') {
                            push('/warehouse_admin/homepage');
                        } else if (userRole === 'kasir') {
                            push('/');
                        } else {
                            // Handle other roles or no role as needed
                        }
                    } else {
                        // Handle the case where user data doesn't exist in the database
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                push('/login_admin');
            }
        });

        return () => unsubscribe();
    }, [auth, push]);

    useEffect(() => {
        const getSpareparts = async () => {
            try {
                const data = await getDocs(itemCollectionRef);
                setSparepart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching spareparts:', error);
            }
        };

        getSpareparts();
    }, []);
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
                            <Stockitem
                                icon={<BsBoxes className=" text-white m-auto text-4xl" />}
                                title={'Total Stock'}
                                total={spareparts.filter((item) => item.quantity >= 1).length} />
                            <Stockitem
                                icon={<BsBoxSeam className=" text-white m-auto text-4xl" />}
                                title={'Low Stock'}
                                total={spareparts.filter((item) => item.quantity < 10 && item.quantity >= 1).length} />
                            <Stockitem
                                icon={<SlSocialDropbox className=" text-white m-auto text-4xl" />}
                                title={'Empty Stock'}
                                total={spareparts.filter((item) => item.quantity === 0).length} />
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

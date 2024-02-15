/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import SidebarGudang from '@/components/sidebar_gudang';
import Stockitem from '@/components/stockitem';
import { QuerySnapshot, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';

import { BiEdit, BiSearch } from 'react-icons/bi';
import { BsBoxSeam, BsBoxes, BsTrash3 } from 'react-icons/bs';
import { SlSocialDropbox } from 'react-icons/sl';
import { auth, db } from '../../../../../lib/firebase/page';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import EditSparepartForm from '@/components/EditSparepartForm';
import { useEffect, useState } from 'react';

interface Sparepart {
    id: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

const sparepartpage = () => {
    const [spareparts, setSparepart] = useState<any[]>([]);
    const itemCollectionRef = collection(db, 'sparepart');
    const router = useRouter();
    const [newName, setNewName] = useState('')
    const [newType, setNewType] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newPrice, setNewPRice] = useState('')

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
                            push('/warehouse_admin/sparepart/sparepartpage');
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

    useEffect(
        () => {
            const getSparepart = async () => {
                try {
                    const data: QuerySnapshot = await getDocs(itemCollectionRef);
                    setSparepart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                } catch (error) {
                    console.error('Error fetching spareparts:', error);
                }
            };

            getSparepart();
        }, []
    );

    // Search Function
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredSpareparts = spareparts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Delete Item Function
    // ...

    // Delete Item Function
    const handleDelete = async (id: string) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // If the user confirms, proceed with deletion
        if (isConfirmed) {
            console.log('Deleting item with ID:', id);

            try {
                // Delete the document with the specified ID
                await deleteDoc(doc(db, 'sparepart', id));

                // Log after deletion
                console.log('Item deleted. Updating local state.');

                // Update the local state to remove the deleted item
                setSparepart((prevSpareparts) => prevSpareparts.filter((item) => item.id !== id));
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    };

    // ...


    const handleUpdateClick = async (id: any) => {
        router.push(`/warehouse_admin/sparepart/edit?id=${id}`);

        const docRef = doc(db, "sparepart", id);
        const docSnap = await getDoc(docRef);
        let data: any[] = [];

        data.push(docSnap.data());
        setNewName(data[0].newName);
        setNewType(data[0].newType);
    };
    const handlePopup = async (id: any) => {
        // Set the service ID in the URL
        router.push(`/warehouse_admin/sparepart/sparepartpage?id=${id}`);
        // Show the update modal
        // const docRef = doc(db, "service", idd);
        // const docSnap = await getDoc(docRef);
        // let data: any[] = [];
        // data.push(docSnap.data());
        // setNewServiceid(data[0].serviceid)
        // setNewMototype(data[0].mototype)
        // setNewOwner(data[0].owner)
        // setNewAddress(data[0].address)
        // setNewStatus(data[0].status)
        setShowItem(true);
    };

    const [showDetail, setShowItem] = useState(false);
    return (
        <>
            <SidebarGudang />
            <div className=' w-full pl-28 bg-[#EAEAEA] overflow-hidden'>
                <div className=' p-5'>
                    <h1 className='mx-3 text-2xl font-semibold'>Sparepart</h1>
                    <div className='px-3 py-3'>
                        <div className=' grid grid-cols-3 gap-4 pb-4'>
                            <Stockitem icon={<BsBoxes className=" text-white m-auto text-4xl" />} title={'Total Stock'} total={spareparts.filter((item) => item.quantity >= 1).length} />
                            <Stockitem icon={<BsBoxSeam className=" text-white m-auto text-4xl" />} title={'Low Stock'} total={spareparts.filter((item) => item.quantity < 10 && item.quantity >= 1).length} />
                            <Stockitem icon={<SlSocialDropbox className=" text-white m-auto text-4xl" />} title={'Empty Stock'} total={spareparts.filter((item) => item.quantity === 0).length} />
                        </div>
                        <div className=' w-full h-[400px] py-2 bg-white rounded-md'>
                            <div className=' flex px-5 justify-between'>
                                <div className='flex gap-5 justify-between'>
                                    <p className=' text-lg font-medium text-[#1b24ff] bg-[#EAEAEA] py-1 px-2 rounded-md'>Sparepart Data</p>
                                    <a href="/warehouse_admin/sparepart/input_spareparts">
                                        <p className=' hover:text-[#1b24ff] hover:bg-[#EAEAEA] text-lg font-medium text-black py-1 px-2 rounded-md'>Validator</p>
                                    </a>
                                </div>
                                <div className=' w-96 py-1 bg-[#EAEAEA] flex rounded-md px-2 gap-1'>
                                    <BiSearch className=' text-slate-700 text-xl m-auto' />
                                    <input
                                        placeholder='Search...'
                                        type="text"
                                        name="search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className=' w-full px-2 bg-transparent border-none outline-none' />
                                </div>
                            </div>
                            <div className=' mt-2 h-[340px] overflow-y-scroll'>
                                <table className=' table border-t-2 border-black  w-full'>
                                    <thead className=' border-b'>
                                        <tr>
                                            <th className=' w-10 border-r'>Id</th>
                                            <th className=' w-64 border-r'>Name</th>
                                            <th className=' w-64 border-r'>Price</th>
                                            <th className=' w-56 border-r'>Category</th>
                                            <th className=' w-56 border-r'>Quantity</th>
                                            <th className=' '>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>

                                        {filteredSpareparts.map((item, index) => (
                                            <tr key={item.id} className='border-b'>
                                                <td className='w-10 py-1 text-center border-r'>{index + 1}</td>
                                                <td className='w-64 py-1 text-center border-r overflow-hidden whitespace-nowrap px-2'>{item.name}</td>
                                                <td className=' w-64 py-1 text-center border-r'>{item.price}</td>
                                                <td className=' w-56 py-1 text-center border-r'>{item.category}</td>
                                                <td className=' w-56 py-1 text-center border-r'>{item.quantity}</td>
                                                <td className=' h-auto px-2 py-2 flex m-auto'>
                                                    <div className='w-full hover:bg-blue-800 hover:text-white py-1 rounded-md m-auto'
                                                        onClick={() => handlePopup(item.id)}
                                                    >
                                                        <BiEdit className='mx-auto text-xl ' />
                                                    </div>
                                                    <div className='w-full h-full hover:bg-red-500 hover:text-white py-1 rounded-md m-auto  '
                                                        onClick={() => handleDelete(item.id)}
                                                    >
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
                </div>
                <EditSparepartForm isVisible={showDetail} onClose={() => setShowItem(false)} />
            </div >
        </>

    )
}

export default sparepartpage
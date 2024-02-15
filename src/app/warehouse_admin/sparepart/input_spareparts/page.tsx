"use client";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../../../../../lib/firebase/page';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import SidebarGudang from '@/components/sidebar_gudang';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

const AddPage = () => {

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
                            push('/warehouse_admin/sparepart/input_spareparts');
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

    let [count, setCount] = useState(0);
    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        if (count > 0) {
            count = count - 1;
            setCount(count);
        }
    }

    const [newName, setNewName] = useState<string>('');
    const [newType, setNewType] = useState<string>('');
    const [newCategory, setNewCategory] = useState<string>('');
    const [newPrice, setNewPrice] = useState<string>('');
    const [newDesc, setNewDesc] = useState<string>('');
    const [downloadURL, setDownloadURL] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [img, setImg] = useState('')
    const usersCollectionRef = collection(db, "sparepart")

    // Function to handle file upload
    const handleSelectedFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            setLoading(true);

            const uploadTasks = Array.from(files).map((file) => {
                return new Promise<string>(async (resolve, reject) => {
                    const storageRef = ref(storage, `files/${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            // Handle progress (if needed)
                        },
                        (error) => {
                            // Handle error
                            console.error('Upload error:', error);
                            reject(error.message);
                        },
                        () => {
                            // Upload completed successfully, don't resolve here
                        }
                    );

                    // No need to resolve here; resolve after the upload is completed
                    uploadTask.then(() => {
                        const url = getDownloadURL(storageRef);
                        url.then((downloadURL) => {
                            console.log('Download URL:', downloadURL);
                            resolve(downloadURL);
                        }).catch((urlError) => {
                            console.error('Error getting download URL:', urlError);
                            reject(urlError);
                        });
                    });
                });
            });

            try {
                // Wait for all files to be uploaded
                const downloadURLs = await Promise.all<string>(uploadTasks);

                // Set the download URLs in state or use them as needed
                setDownloadURL(downloadURLs);

                // Perform additional actions if needed, for example, update state or send to backend
            } catch (error) {
                console.error('Error uploading files:', error);
                alert('Error uploading files: ' + error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('No files selected');
        }
    };

    // Function to send data to the database
    const AddData = async () => {
        
        try {
            // Add the document to the collection
            await addDoc(usersCollectionRef, {
                name: newName,
                type: newType,
                price: newPrice,
                description: newDesc,
                assets: downloadURL,
                quantity: count,
                category: newCategory
            });

            alert('Data added successfully.');

            // Reset form-related states
            setNewName('');
            setNewType('');
            setNewCategory('');
            setNewPrice('');
            setNewDesc('');
            setDownloadURL([]);
            setCount(0);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            alert('Error adding data: ' + errorMessage);
        }
    };

    return (
        <>
            <SidebarGudang />
            <div className=' pl-28 bg-[#EAEAEA]'>
                <div className='p-5'>
                    <h1 className=' text-2xl font-semibold pb-4'>Sparepart</h1>
                    <div className=' w-full h-full bg-white rounded-md py-2'>
                        <div className='flex gap-5 px-4 pb-2'>
                            <a href="/warehouse_admin/sparepart/sparepartpage">
                                <p className=' text-lg font-medium text-black py-1 px-2 rounded-md hover:text-[#1b24ff] hover:bg-[#EAEAEA]'>
                                    Spareparts Data
                                </p>
                            </a>
                            <p className=' text-lg font-medium text-[#1b24ff] bg-[#EAEAEA] py-1 px-2 rounded-md'>Add Sparepart</p>
                        </div>
                        <form className=' w-full border-t-2 border-black px-12 py-8' onSubmit={AddData}>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Name</p>
                                <input
                                    id='name'
                                    name='name-product'
                                    required
                                    onChange={(event) => setNewName(event.target.value)}
                                    placeholder='Product Name'
                                    type="text"
                                    className=' w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2' />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Type</p>
                                <input
                                    id='type'
                                    name='type-product'
                                    required
                                    onChange={(event) => setNewType(event.target.value)}
                                    placeholder='Product Type'
                                    type="text"
                                    className=' w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2' />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Category</p>
                                <div className='flex w-3/4 justify-start gap-10 pl-1'>
                                    <div className='flex gap-2'>
                                        <p>Accesories</p>
                                        <input
                                            name='radio'
                                            placeholder='Product Name'
                                            type="radio"
                                            className=' w-5 checked:accent-blue-700'
                                            onChange={() => setNewCategory("Accesories")} />
                                    </div>
                                    <div className='flex gap-2'>
                                        <p>Wheels</p>
                                        <input
                                            name='radio'
                                            placeholder='Product Name'
                                            type="radio"
                                            className='w-5 checked:accent-blue-700'
                                            onChange={() => setNewCategory("Wheels")} />
                                    </div>
                                    <div className='flex gap-2'>
                                        <p>Maintenance</p>
                                        <input
                                            name='radio'
                                            placeholder='Product Name'
                                            type="radio"
                                            className='w-5 checked:accent-blue-700'
                                            onChange={() => setNewCategory("Maintenance")} />
                                    </div>
                                    <div className='flex gap-2'>
                                        <p>Engine</p>
                                        <input
                                            name='radio'
                                            placeholder='Product Name'
                                            type="radio"
                                            className='w-5 checked:accent-blue-700'
                                            onChange={() => setNewCategory("Engine")} />
                                    </div>
                                </div>
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Price</p>
                                <input

                                    name='price'
                                    required
                                    onChange={(event) => setNewPrice(event.target.value)}
                                    placeholder='Product Price'
                                    type="text"
                                    className=' w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2' />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Quantity</p>
                                <div className=' w-3/4'>
                                    <div className=' rounded-md border border-black flex w-40 justify-between'>
                                        <div onClick={decrementCount}>
                                            <div className=' rounded-md border-r p-1 border-black bg-slate-200'>
                                                <BiMinus className=' text-lg' />
                                            </div>
                                        </div>
                                        <input
                                            name='count'
                                            className=' w-20 text-center '
                                            type="text"
                                            value={count}
                                            onChange={(event) => setCount(parseFloat(event.target.value))}
                                        />
                                        {/* <p>{count}</p> */}
                                        <div onClick={incrementCount}>
                                            <div className=' p-1 border-l rounded-md border-black bg-slate-200'>
                                                <BiPlus className=' text-lg' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Form Input Description */}
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Description</p>
                                {/* <input
                                    type="text"
                                    placeholder='Add Description'
                                    maxLength={200}
                                    className=' w-3/4 h-28 bg-white rounded-md border border-slate-400 outline-blue-700 px-2'
                                /> */}
                                <textarea
                                    id="desc"
                                    onChange={(event) => setNewDesc(event.target.value)}
                                    className=' min-h-[100px] w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2 py-1'
                                    placeholder='Add Description'
                                />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Image</p>
                                <input
                                    required
                                    onChange={handleSelectedFile}
                                    multiple  // Tambahkan atribut ini untuk memungkinkan pemilihan beberapa file
                                    type="file"
                                    className='block w-3/4 border rounded-lg border-slate-400 file:bg-[#1b24ff] file:py-1 file:px-4 file:rounded-md  file:border-0 file:text-white font-medium file:font-semibold file:hover:bg-[#1b23ffe1] hover:bg-slate-100'
                                    id='multiple_files'
                                    name='image'
                                />

                            </div>
                            <div className='flex justify-end w-full py-4'>
                                <button
                                    type='submit'
                                    className=' bg-[#1b24ff] py-1 w-80 rounded-md shadow-md hover:shadow-inner shadow-[#eaeaea] hover:bg-[#1b23ffe1]'>
                                    <p className=' text-white text-lg font-medium'>Submit</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPage
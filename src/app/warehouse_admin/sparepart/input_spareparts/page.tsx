"use client";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { db, storage } from '../../../../../lib/firebase/page';
import { addDoc, collection } from 'firebase/firestore';
import SidebarGudang from '@/components/sidebar_gudang';
import { BiMinus, BiPlus } from 'react-icons/bi';

const AddPage = () => {
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
    const [newName, setNewName] = useState("")
    const [newType, setNewType] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [newPrice, setNewPRice] = useState("")
    const [downloadURL, setDownloadURL] = useState('')
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState('')
    const usersCollectionRef = collection(db, "sparepart")
    const price = 'Rp ' + newPrice


    const handleSelectedFile = (filee: { files: any; }) => {
        const files = filee.files
        if (files && files[0].size < 10000000) {
            setImg(files[0])
            try {
                console.log(files)
                if (files) {
                    setLoading(true)
                    const name = files[0].name
                    const imgRef = ref(storage, `files/${name}`)
                    const uploadTask = uploadBytesResumable(imgRef, files[0])

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            console.log(progress)
                        },
                        (error) => {
                            alert(error.message)
                        },
                        () => {

                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                //url is download url of file
                                console.log(url)
                                setDownloadURL(url)
                                setLoading(false)
                            })
                        },
                    )



                } else {
                    alert("error")
                }




            } catch (error) {
                console.error("An error occured", error);
            }

            console.log(files[0])
        } else {
            alert('File size to large')
        }
    }

    const AddData = async () => {
        addDoc(usersCollectionRef, {
            name: newName,
            type: newType,
            price: price,
            assets: downloadURL,
            quantity: count,
            category: newCategory

        })
    }


    return (
        <>
            <SidebarGudang />
            <div className=' pl-28 bg-[#EAEAEA]'>
                <div className='p-5'>
                    <h1 className=' text-2xl font-semibold pb-4'>Sparepart</h1>
                    <div className=' w-full h-[500px] bg-white rounded-md py-2'>
                        <div className='flex gap-5 px-4 pb-2'>
                            <a href="/warehouse_admin/sparepart/sparepartpage">
                                <p className=' text-lg font-medium text-black py-1 px-2 rounded-md'>Spareparts Data</p>
                            </a>
                            <p className=' text-lg font-medium text-[#1b24ff] bg-[#EAEAEA] py-1 px-2 rounded-md'>Add Sparepart</p>
                        </div>
                        <form className=' w-full border-t-2 border-black px-12 py-8' onSubmit={AddData}>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Name</p>
                                <input
                                    required
                                    onChange={(event) => setNewName(event.target.value)}
                                    placeholder='Product Name'
                                    type="text"
                                    className=' w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2' />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Type</p>
                                <input
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
                                    required
                                    onChange={(event) => setNewPRice(event.target.value)}
                                    placeholder='Product Price'
                                    type="number"
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
                                        <p>{count}</p>
                                        <div onClick={incrementCount}>
                                            <div className=' p-1 border-l rounded-md border-black bg-slate-200'>
                                                <BiPlus className=' text-lg' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Image</p>
                                <input
                                    required
                                    onChange={(files) => handleSelectedFile(files.target)}
                                    multiple
                                    type="file"
                                    className='block w-3/4 border rounded-lg border-slate-400 file:bg-[#1b24ff] file:py-1 file:px-4 file:rounded-md  file:border-0 file:text-white font-medium file:font-semibold file:hover:bg-[#1b23ffe1] hover:bg-slate-100' id='multiple_files' />
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
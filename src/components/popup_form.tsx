"use client";
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { db, storage } from '../../lib/firebase/page';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const PopupForm = ({ isVisible, onClose }: { isVisible?: any, onClose?: any }) => {
    const [newName, setNewName] = useState("")
    const [newAdress, setNewAdress] = useState("")
    const [newCame, setNewCame] = useState(0)
    const [newCategory, setNewCategory] = useState("Customer")
    const usersCollectionRef = collection(db, "users")
    const [downloadURL, setDownloadURL] = useState('')
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState('')

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

    const createUser = async () => {


        addDoc(usersCollectionRef, {
            name: newName,
            adress: newAdress,
            came: 0,
            category: newCategory,

        });



    }




    const [showModul, setShowModul] = useState(false);
    if (!isVisible) return null;
    return (
        <div className='z-20 fixed inset-0 flex justify-center items-center'>
            <div className='bg-[#D9D9D9] w-[650px] flex flex-col '>
                <div className='flex justify-between'>
                    <h1 className='text-xl m-2'>New Customer</h1>


                </div>

                <div className='bg-white  rounded h-[314px] p-5'>
                    <div className='bg-white drop-shadow-lg p-9 rounded h-full '>
                        <form >
                            <div>
                                <p className='ml-1'>
                                    Name
                                </p>
                                <input
                                    type="text"
                                    name="text"
                                    placeholder='Udin Meleduaks'
                                    className="bg-[#D9D9D9] px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch"
                                    onChange={(event) => setNewName(event.target.value)}


                                />
                            </div>
                            <div className='py-2'>
                                <p className='ml-1'>
                                    Address
                                </p>
                                <input
                                    type="text"
                                    name="text"
                                    placeholder='Baghdad'
                                    className="bg-[#D9D9D9] px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch"
                                    onChange={(event) => setNewAdress(event.target.value)}


                                />
                            </div>
                            <div className='flex justify-between gap-2' >
                                <button className="w-full place-self-end tracking-wider bg-[#1b23ff] text-[#ffffff] py-2 hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 " onClick={createUser}>

                                    <p className='text-xs'>
                                        Add
                                    </p>



                                </button>
                                <button className="w-full place-self-end tracking-wider bg-black text-[#ffffff] py-2 hover:bg-[#1a1a1a] hover:text-white text-center rounded-md transition-all duration-500 " onClick={() => onClose()}>
                                    <a href="" >
                                        <p className='text-xs'>
                                            Cancel
                                        </p>
                                    </a>


                                </button>
                            </div>

                            {/* <input
                            type="search"
                            name="search"
                            placeholder="search"
                            className="bg-[#D9D9D9] px-5 pr-10 rounded-md text-sm focus:outline-none w-[400px] AiOutlineSearch"



                        />
                        <button className="mr-[15px] w-[180px] place-self-end tracking-wider bg-[#1b23ff] text-[#ffffff] py-2 hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 " >
                            <a href="" >
                                <p className='text-xs'>
                                    +New Customer
                                </p>
                            </a>


                        </button> */}
                        </form>

                    </div>
                </div>

            </div>


        </div>
    );
}

export default PopupForm;

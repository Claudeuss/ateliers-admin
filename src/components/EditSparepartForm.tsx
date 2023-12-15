// components/EditSparepartForm.tsx

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase/page';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useRouter, useSearchParams } from 'next/navigation';

const EditSparepartForm = ({ namee }: { namee?: any }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('')
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [newCategory, setNewCategory] = useState('')
    const searchParams = useSearchParams();
    const id = searchParams.get('id')
    const [selectedCategory, setSelectedCategory] = useState('');
    const router = useRouter();

    let [count, setCount] = useState(0);
    function incrementCount() {
        setCount((prevCount) => prevCount + 1)
    }
    function decrementCount() {
        if (count > 0) {
            setCount((prevCount) => prevCount - 1)
        }
    }

    // Fetch data from Firebase
    useEffect(() => {
        const fetchData = async (idd: any) => {
            try {
                const docRef = doc(db, 'sparepart', idd);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name);
                    setType(data.type)
                    setPrice(data.price);
                    setCount(data.quantity);

                    // Fetch selected category
                    setSelectedCategory(data.category || '');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchData(id);
    }, []);

    const handleUpdate = async (idd: any) => {
        const docRef = doc(db, 'sparepart', idd);
        await updateDoc(docRef, {
            name: name,
            type: type,
            price: price,
            quantity: count,
            category: selectedCategory
        });
        alert('Edit Success')
        router.push('/warehouse_admin/sparepart/sparepartpage')
    };

    return (
        <div className='w-full pl-28 bg-[#EAEAEA] overflow-hidden'>
            <div className=' p-5 '>
                <h2 className='text-2xl font-semibold '>Edit Sparepart</h2>
                <form
                    className=' p-4 bg-white mt-4 rounded-md'
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleUpdate(id);
                    }}
                >
                    <label className=' w-full flex justify-between text-xl font-semibold py-2 my-auto'>
                        Name
                        <input
                            className=' w-3/4 text-base font-normal bg-white rounded-md border border-slate-400 outline-blue-700 px-2'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className=' w-full flex justify-between text-xl font-semibold py-2 my-auto'>
                        type
                        <input
                            className=' w-3/4 text-base font-normal bg-white rounded-md border border-slate-400 outline-blue-700 px-2'
                            type="text"
                            value={type}
                            onChange={(e) => setType((e.target.value))} />
                    </label>
                    <label className=' w-full flex justify-between text-xl font-semibold py-2 my-auto'>
                        Category
                        <div className='flex w-3/4 justify-start gap-10 pl-1 text-base'>
                            <div className='flex gap-2'>
                                <p>Accesories</p>
                                <input
                                    name='radio'
                                    placeholder='Product Name'
                                    type="radio"
                                    className=' w-5 checked:accent-blue-700'
                                    onChange={() => setSelectedCategory("Accesories")}
                                    checked={selectedCategory === "Accesories"} />
                            </div>
                            <div className='flex gap-2'>
                                <p>Wheels</p>
                                <input
                                    name='radio'
                                    placeholder='Product Name'
                                    type="radio"
                                    className='w-5 checked:accent-blue-700'
                                    onChange={() => setSelectedCategory("Wheels")}
                                    checked={selectedCategory === "Wheels"} />
                            </div>
                            <div className='flex gap-2'>
                                <p>Maintenance</p>
                                <input
                                    name='radio'
                                    placeholder='Product Name'
                                    type="radio"
                                    className='w-5 checked:accent-blue-700'
                                    onChange={() => setSelectedCategory("Maintenance")}
                                    checked={selectedCategory === "Maintenance"} />
                            </div>
                            <div className='flex gap-2'>
                                <p>Engine</p>
                                <input
                                    name='radio'
                                    placeholder='Product Name'
                                    type="radio"
                                    className='w-5 checked:accent-blue-700'
                                    onChange={() => setSelectedCategory("Engine")}
                                    checked={selectedCategory === "Engine"} />
                            </div>
                        </div>
                    </label>
                    <label className=' w-full flex justify-between text-xl font-semibold py-2'>
                        Price
                        <input
                            className=' w-3/4 text-base bg-white rounded-md border border-slate-400 outline-blue-700 px-2'
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </label>
                    <label className='w-full flex justify-between text-xl font-semibold py-2'>
                        Qty
                        <div className='w-3/4'>
                            <div className=' rounded-md border border-black flex w-40 justify-between text-base'>
                                <div onClick={decrementCount}>
                                    <div className=' rounded-md border-r p-1 border-black bg-slate-200'>
                                        <BiMinus className=' text-lg' />
                                    </div>
                                </div>
                                <input
                                    className=' w-20 text-center  '
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
                    </label>
                    <label className=' w-full flex justify-between text-xl font-semibold py-2'>
                        Image
                        <input
                            multiple
                            className='block w-3/4 border rounded-lg border-slate-400 file:bg-[#1b24ff] file:py-1 file:px-4 file:rounded-md  file:border-0 file:text-white font-medium text-base file:hover:bg-[#1b23ffce] hover:bg-slate-100' id='multiple_files'
                            type="file"
                        />
                    </label>

                    <div className=' flex justify-end py-2'>
                        <button
                            className='py-1 w-1/3 bg-blue-700 rounded-md text-white text-lg font-semibold hover:bg-blue-500'
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSparepartForm;

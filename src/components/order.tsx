"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import PopupCostumer from './popup_costumer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase/page';
import PopupItemService from './popup_item_service';
import { QuerySnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';

const Order = ({ selectedItems, onClose, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity }: { selectedItems?: any, onClose?: any, onRemoveItem?: any, onIncreaseQuantity?: any, onDecreaseQuantity?: any }) => {
    const ordersCollectionRef = collection(db, "orders")

    const [orders, setOrders] = useState<any[]>([]); // Replace 'any[]' with the appropriate type for your users
    // const orders = snapshot.val();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    useEffect(() => {
        const getOrders = async () => {
            try {
                const data: QuerySnapshot = await getDocs(ordersCollectionRef);

                // Update the component's state with the fetched data
                setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Call the getUsers function when the component mounts (empty dependency array)
        getOrders();
    }, []);
    const newTotalPrice = orders.reduce((acc, order) => acc + order.totalprice, 0,);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    let [count, setCount] = useState(0);

    const handleCustomerSelection = (customerName: any) => {
        setSelectedCustomer(customerName);
        setShowModal(false); // Close the customer popup after selection
    };
    const [orderList, setOrderList] = useState<any[]>([]);

    const addToOrder = (selectedSparepart: any) => {
        setOrderList((prevList) => [...prevList, selectedSparepart]);
    };



    const handleRemoveSpares = async (id: any) => {
        try {

            // Delete the document from Firestore
            await deleteDoc(doc(db, 'orders', id));

            // Update the local state to remove the deleted item
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };


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
    const handlePayment = async () => {
        try {
            alert('Processing payment...');
            for (const order of orders) {
                const orderDocRef = doc(db, 'orders', order.id);
                const orderDocSnapshot = await getDoc(orderDocRef);

                if (orderDocSnapshot.exists()) {
                    const orderData = orderDocSnapshot.data();

                    // Add the order data to the transactions collection
                    const transactionsCollectionRef = collection(db, 'transactions');
                    await addDoc(transactionsCollectionRef, {
                        sparepart: orderData.sparepart,
                        name: orderData.name,
                        category: orderData.category,
                        price: orderData.price,
                        totalprice: orderData.totalprice,
                        type: orderData.type,
                        quantity: orderData.quantity,
                        assets: orderData.assets,
                        description: orderData.description,
                        timestamp: serverTimestamp(), // Add a timestamp if needed
                    });

                    // Update the quantity in the "sparepart" collection
                    const sparepartDocRef = doc(db, 'sparepart', orderData.sparepart);
                    const sparepartDocSnapshot = await getDoc(sparepartDocRef);

                    if (sparepartDocSnapshot.exists()) {
                        const sparepartData = sparepartDocSnapshot.data();
                        const updatedQuantity = sparepartData.quantity - orderData.quantity;

                        await updateDoc(sparepartDocRef, {
                            quantity: updatedQuantity > 0 ? updatedQuantity : 0,
                        });
                    } else {
                        console.error('Sparepart document not found for ID: ', orderData.sparepart);
                    }

                    await deleteDoc(orderDocRef);
                } else {
                    console.error('Order document not found for ID: ', order.id);
                }
            }

            setOrders([]);
            alert('Payment successful!');
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    // useEffect(() => {
    //     // Calculate


    //     setTotalPrice(newTotalPrice);
    // }, [orders]);
    const [showDetail, setShowItem] = useState(false);
    return (
        <div className='z-40'>


            <div className='p-1 w-[360px] h-screen fixed bg-white z-40 top-0 right-0'>
                <div className='pl-5 pb-2 pt-1
            '>
                    <h1 className='text-2xl font-semibold'>
                        Orders
                    </h1>
                </div>
                <div className='w-auto h-[280px] pl-6 pr-2 overflow-y-auto overflow-x-hidden '>
                    {orders.map((order) => (
                        <div key={order.id} className='bg-white w-auto h-14 my-1  shadow-md flex'>

                            {/* <div className='flex'> */}
                            <img className='h-12 w-12 my-auto mx-1' src="/assets/images/ban.png" alt="" />

                            <div className='flex justify-between w-full'>

                                <div className='my-auto mx-1 w-6/12'>
                                    <h1 className='font-semibold line-clamp-1'>{order.name}</h1>
                                    <p className='text-[#595959] text-xs font-semibold'>Rp. {order.totalprice}</p>

                                </div>


                                <div className='m-auto flex items-center w-6/12'>
                                    <button onClick={decrementCount}><AiOutlineMinusCircle className='text-[#595959] text-lg' /></button>
                                    <p className='p-2'>{order.quantity}</p>
                                    <button onClick={incrementCount}><AiOutlinePlusCircle className='text-[#595959] text-lg ' /></button>

                                    <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' onClick={() => handleRemoveSpares(order.id)} />

                                </div>
                            </div>



                        </div>
                    ))}



                </div>
                <div className='px-5 '>
                    <button className="tracking-wider bg-[#1b23ff] text-[#ffffff] py-1   hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2" onClick={() => setShowModal(true)} >
                        Customer

                    </button>


                </div>
                <div className='px-5'>
                    <p className='text-[#595959] text-center'>------------------------------------------</p>
                    <div className='flex items-center pt-1'>
                        <p className='text-[#595959] text-md'>Sub Total</p>
                        <p className='text-[#000000] text-sm fixed right-[22px]'>Rp. {newTotalPrice},00</p>

                    </div>
                    <div className='flex items-center'>
                        <p className='text-[#595959] text-md'>Discount</p>
                        <p className='text-[#000000] text-sm fixed right-[22px]'>Rp. 0,00</p>

                    </div>
                    <div className='flex items-center py-4'>
                        <p className='text-[#595959] text-md'>Total</p>
                        <p className='text-[#000000] text-sm fixed right-[22px]'>Rp. {newTotalPrice},00</p>

                    </div>
                    <div className='flex items-center pb-4'>
                        <p className='text-[#595959] text-md'>Name</p>
                        <p className='text-[#000000] text-sm fixed right-[22px]'>{selectedCustomer}</p>


                    </div>

                    <button className="tracking-wider bg-black text-[#ffffff] py-2   hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2" onClick={handlePayment}>
                        Payment

                    </button>

                </div>
                <PopupItemService isVisible={showDetail} onClose={() => setShowItem(false)} />
                <PopupCostumer isVisible={showModal} onClose={() => setShowModal(false)} onSelect={handleCustomerSelection} />


            </div>
        </div >
    );
}

export default Order;
// transform hover:scale-105 hover:shadow-xl  shadow-inner shadow-lg
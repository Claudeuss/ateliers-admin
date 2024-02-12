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
import jsPDF from 'jspdf';

const Order = () => {
    const ordersCollectionRef = collection(db, "orders")
    const handleCustomerSelection = (customerName: any) => {
        console.log('Selected Customer:', customerName);

        setSelectedCustomer(customerName);
        setShowModal(false); // Close the customer popup after selection

        // Update the selected customer in each order document
        const updatedOrders = orders.map(order => ({ ...order, customer: customerName }));
        console.log('Updated Orders:', updatedOrders);

        setOrders(updatedOrders);
    };
    const handleCustomerName = (customerName2: any) => {
        console.log('Selected Customer:', customerName2);

        setSelectedCustomerName(customerName2);
        setShowModal(false); // Close the customer popup after selection

        // Update the selected customer in each order document
        const updatedOrders = orders.map(order => ({ ...order, customer: customerName2 }));
        console.log('Updated Orders:', updatedOrders);

        setOrders(updatedOrders);
    };

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
    const [selectedCustomerName, setSelectedCustomerName] = useState(null);
    let [count, setCount] = useState(0);


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

                    // Check if order quantity is greater than sparepart quantity
                    const sparepartDocRef = doc(db, 'sparepart', orderData.sparepart);
                    const sparepartDocSnapshot = await getDoc(sparepartDocRef);

                    if (sparepartDocSnapshot.exists()) {
                        const sparepartData = sparepartDocSnapshot.data();
                        const sparepartQuantity = sparepartData.quantity;

                        if (orderData.quantity <= sparepartQuantity) {
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
                                customer: selectedCustomer, // Include the selected customer name
                                timestamp: serverTimestamp(),
                            });

                            // Update the quantity in the "sparepart" collection
                            const updatedQuantity = sparepartQuantity - orderData.quantity;
                            await updateDoc(sparepartDocRef, {
                                quantity: updatedQuantity > 0 ? updatedQuantity : 0,
                            });

                            // Delete the order document
                            await deleteDoc(orderDocRef);
                        } else {
                            // Alert when order quantity exceeds sparepart quantity
                            alert('Barang kelebihan. Tidak dapat memproses pesanan.');
                        }
                    } else {
                        console.error('Sparepart document not found for ID:', orderData.sparepart);
                    }
                } else {
                    console.error('Order document not found for ID:', order.id);
                }
            }

            // transaction documents
            generatePDF(orders, selectedCustomerName, newTotalPrice);
            setOrders([]);
            alert('Payment successful!');
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };


    const generatePDF = (orders: any[], customerName: string | null, totalPrice: number) => {
        const doc = new jsPDF('p', 'mm', 'a4'); // Specify page orientation and unit

        // Add content to the PDF document
        doc.setFontSize(12);
        doc.text('Shopping Receipt', 15, 15);

        let yOffset = 30; // Initial y-offset for content

        // Add order details
        orders.forEach((order, index) => {
            const itemDetails = `${order.name} - Rp. ${order.totalprice}`;
            doc.text(itemDetails, 15, yOffset + index * 10);
        });

        // Add customer name
        yOffset += orders.length * 10 + 10;
        doc.text(`Customer: ${customerName || 'N/A'}`, 15, yOffset);

        // Add total price
        yOffset += 10;
        doc.text(`Total Price: Rp. ${totalPrice}`, 15, yOffset);

        // Save the PDF document
        doc.save('shopping_receipt.pdf');
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
                        <p className='text-[#000000] text-sm fixed right-[22px]'>{selectedCustomerName}</p>


                    </div>

                    <button className="tracking-wider bg-black text-[#ffffff] py-2   hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2" onClick={handlePayment}>
                        Payment

                    </button>

                </div>
                <PopupItemService isVisible={showDetail} onClose={() => setShowItem(false)} />
                <PopupCostumer isVisible={showModal} onClose={() => setShowModal(false)} onSelect={handleCustomerSelection} onSelectId={handleCustomerName} />


            </div>
        </div >
    );
}

export default Order;
// transform hover:scale-105 hover:shadow-xl  shadow-inner shadow-lg
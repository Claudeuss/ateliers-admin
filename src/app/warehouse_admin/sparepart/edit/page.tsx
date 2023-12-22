// pages/spareparts/edit/[id].tsx
'use client'
import EditSparepartForm from '@/components/EditSparepartForm';
import SidebarGudang from '@/components/sidebar_gudang';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth, db } from '../../../../../lib/firebase/page';
import { doc, getDoc } from 'firebase/firestore';

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
                        push('/warehouse_admin/sparepart/edit');
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

const EditSparepartPage = () => {
    const router = useRouter();

    return (
        <div>
            <SidebarGudang />
            <EditSparepartForm />
        </div>
    );
};

export default EditSparepartPage;

// pages/spareparts/edit/[id].tsx
'use client'
import EditSparepartForm from '@/components/EditSparepartForm';
import SidebarGudang from '@/components/sidebar_gudang';
import { onAuthStateChanged } from 'firebase/auth';

import { useEffect } from 'react';
import { auth, db } from '../../../../../lib/firebase/page';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const EditSparepartPage = () => {

    return (
        <div>
            <SidebarGudang />
            <EditSparepartForm />
        </div>
    );
};

export default EditSparepartPage;

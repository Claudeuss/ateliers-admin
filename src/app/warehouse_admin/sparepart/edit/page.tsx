// pages/spareparts/edit/[id].tsx
'use client'
import EditSparepartForm from '@/components/EditSparepartForm';
import SidebarGudang from '@/components/sidebar_gudang';
import { useRouter } from 'next/navigation';



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

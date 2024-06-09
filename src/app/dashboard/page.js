"use client";
import React, { useEffect, useState } from "react";
import DashboardTable from "../../components/privates/table/DashboardTable";
import { useRouter } from 'next/navigation'; // Menggunakan useRouter untuk Client Components
import { supabase } from "../../../lib/supabaseClient";

export default function Dashboard() {
    const columns = [
        { label: 'Product ID', dataKey: 'productID', width: 'w-1/6', align: 'left' },
        { label: 'Product Name', dataKey: 'productName', width: 'w-1/6', align: 'left' },
        { label: 'Brand', dataKey: 'brand', width: 'w-1/6', align: 'left' },
        { label: 'Category', dataKey: 'category', width: 'w-1/6', align: 'left' },
        { label: 'Stock', dataKey: 'stock', width: 'w-1/6', align: 'center' },
        { label: '', dataKey: 'aksi', width: 'w-1/6', align: 'center' },
    ];

    const [data, setData] = useState([]);
    const router = useRouter(); // Menggunakan useRouter untuk Client Components

    useEffect(() => {
        async function fetchData() {
            const { data: products, error: productError } = await supabase
                .from('product')
                .select('*');

            if (productError) {
                console.error('Error fetching products:', productError);
                return;
            }

            const formattedData = [];

            for (const product of products) {
                const { data: items, error: itemsError } = await supabase
                    .from('item')
                    .select('count', { count: 'count(*)' })
                    .eq('product_id', product.product_id);

                if (itemsError) {
                    console.error(`Error fetching items for product ${product.product_id}:`, itemsError);
                    return;
                }

                const stock = items.length > 0 ? items[0].count : 0;

                formattedData.push({
                    productID: product.product_id,
                    productName: product.name,
                    brand: product.brand,
                    category: product.category,
                    stock: stock,
                });
            }

            setData(formattedData);
        }

        fetchData();
    }, []);

    const handleRowClick = (row) => {
        router.push(`/dashboard/${row.productID}`);
    };

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <h1 className='text-brown-2 bold-48 mt-16 mb-4'>Dashboard</h1>
            <DashboardTable columns={columns} data={data} setData={setData} onRowClick={handleRowClick} message='No data available' />
        </div>
    );
}

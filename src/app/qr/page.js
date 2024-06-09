"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/src/components/shares/Input";

export default function QRpage() {
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [expDate, setExpDate] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const jsonData = {
            product_id: "12345",
            name: productName,
            brand: brand,
            category: category,
            rack_id: "11",
            exp_date: expDate
        };
        router.push(`/qrResult?jsonData=${encodeURIComponent(JSON.stringify(jsonData))}`);
    };

    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <div className="flex flex-row gap-10">
                <div>
                    <div className='text-brown-2 bold-48 mt-16'>Generate QR</div>
                    <div className="text-gray-2 medium-24 mt-2">Simply fill out the form beside <br />to find your desired product</div>
                </div>
                <div className="grow bg-white border border-gray-200 rounded-3xl shadow mt-20 mb-20" style={{ width: 866, height: 691 }}>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-8 px-12 pt-12">
                            <Input 
                                label="Product Name" 
                                placeholder="Enter Product Name" 
                                value={productName} 
                                onChange={(e) => setProductName(e.target.value)} 
                            />
                            <Input 
                                label="Brand" 
                                placeholder="Enter Product Brand" 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)} 
                            />
                            <Input 
                                label="Category" 
                                placeholder="Enter Product Category" 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)} 
                            />
                            <Input 
                                label="Expired Date" 
                                placeholder="Enter Product Expired Date" 
                                value={expDate} 
                                onChange={(e) => setExpDate(e.target.value)} 
                            />
                        </div>
                        <div className="w-fit flex flex-row bg-brown-2 rounded-3xl px-12 py-3 mt-[60px] gap-8 mx-12 mt-11">
                            <button type="submit" className="text-white medium-18 text-center">
                                Generate Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

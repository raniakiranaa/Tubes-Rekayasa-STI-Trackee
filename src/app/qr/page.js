"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/src/components/shares/Input";
import { supabase } from '../../../lib/supabaseClient';

export default function QRpage() {
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [expDate, setExpDate] = useState('');
    const [categories, setCategories] = useState([]);
    const [rackId, setRackId] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('rack')
                .select('rack_id, category');
            if (error) {
                console.error('Failed to fetch categories:', error.message);
            } else {
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        const selectedRackId = categories.find(cat => cat.category === selectedCategory)?.rack_id || '';
        setRackId(selectedRackId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let product_id;
            
            // Check if the product already exists
            const { data: existingProduct, error: existingProductError } = await supabase
                .from('product')
                .select('product_id')
                .eq('name', productName)
                .eq('category', category)
                .eq('brand', brand)
                .single();

            if (existingProductError) {
                console.error('Error checking existing product:', existingProductError.message);
            }

            if (existingProduct) {
                product_id = existingProduct.product_id;
            } else {
                // Generate a new product ID
                const { data: maxProduct, error: maxProductError } = await supabase
                    .from('product')
                    .select('product_id')
                    .order('product_id', { ascending: false })
                    .limit(1)
                    .single();

                if (maxProductError) {
                    console.error('Error fetching max product ID:', maxProductError.message);
                }

                product_id = maxProduct ? parseInt(maxProduct.product_id) + 1 : 1;
            }

            const jsonData = {
                product_id,
                name: productName,
                brand: brand,
                category: category,
                rack_id: rackId,
                exp_date: expDate
            };

            router.push(`/qrResult?jsonData=${encodeURIComponent(JSON.stringify(jsonData))}`);
        } catch (error) {
            console.error('Error:', error.message);
        }
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
                            <div className="flex flex-col">
                                <label className="block mb-2 text-sm bold-20 text-brown-2 pb-3">Category</label>
                                <select
                                    className="bg-gray-50 border border-gray-3 text-gray-2 text-sm rounded-lg block w-full p-4 medium-16 appearance-none"
                                    value={category}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">Enter Product Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.rack_id} value={cat.category}>{cat.category}</option>
                                    ))}
                                </select>
                            </div>
                             <div className="flex flex-col">
                                <label className="block mb-2 text-sm bold-20 text-brown-2 pb-3">Expired Date</label>
                                <input
                                    type="date"
                                    className="bg-gray-50 border border-gray-3 text-gray-2 text-sm rounded-lg block w-full p-4 medium-16"
                                    value={expDate}
                                    onChange={(e) => setExpDate(e.target.value)}
                                />
                            </div>
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

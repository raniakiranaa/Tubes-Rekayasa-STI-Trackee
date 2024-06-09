"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";


export const Navbar = () => {
    const [active, setActive] = useState(0);
    const location = usePathname();

    useEffect(() => {
        if (location == "/") {
          setActive(0);
        } else if (location == "/dashboard") {
          setActive(1);
        } else if (location == "/qr") {
          setActive(2);
        } else if (location == "/locate" || location == "/result") {
          setActive(3);
        } else {
          setActive(-1);
        }
      }, [location]);

    return (
        <nav className="bg-brown-3 fixed w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3">
                    <img src='/logo.svg' alt="logo"/>
                </a>
                <div className="flex md:order-2 space-x-3">
                    <button type="button" className="text-white bg-brown-2 hover:bg-brown-1 rounded-3xl text-semibold-24 px-10 py-2 text-center">Sign Up</button>
                </div>
                <div className="items-center justify-between md:order-1">
                    <ul className="flex flex-col md:p-0 mt-4 font-medium md:space-x-24 md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link
                                href="/"
                                className={`${
                                active == 0
                                    ? "font-bold text-brown-1 bg-white py-2 px-8 rounded-3xl"
                                    : "font-medium text-white"
                                } text-semibold-24 hover:font-extrabold hover:text-brown-1 truncate`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard"
                                className={`${
                                active == 1
                                    ? "font-bold text-brown-1 bg-white py-2 px-8 rounded-3xl"
                                    : "font-medium text-white"
                                } text-semibold-24 hover:font-extrabold hover:text-brown-1 truncate`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/qr"
                                className={`${
                                active == 2
                                    ? "font-bold text-brown-1 bg-white py-2 px-8 rounded-3xl"
                                    : "font-medium text-white"
                                } text-semibold-24 hover:font-extrabold hover:text-brown-1 truncate`}
                            >
                                QR
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/locate"
                                className={`${
                                active == 3
                                    ? "font-bold text-brown-1 bg-white py-2 px-8 rounded-3xl"
                                    : "font-medium text-white"
                                } text-semibold-24 hover:font-extrabold hover:text-brown-1 truncate`}
                            >
                                Locate
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
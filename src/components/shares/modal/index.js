"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import close from "@/public/icons/close.svg";

export const Modal = ({ open, setOpen, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`top-0 left-0 absolute w-full h-screen overflow-y-auto z-50 ${
        open
          ? "transition-opacity ease-in duration-100 opacity-100"
          : "transition-opacity ease-out duration-100 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="bg-opacity-50 backdrop-blur-[2px] absolute top-0 left-0 w-full h-full z-0"
        onClick={() => {
          setOpen(false);
        }}
      ></div>

      <div className="flex justify-center items-center h-full">
        <div
          className={`relative bg-white p-8 rounded-2xl drop-shadow-2xl w-1/2 z-30 max-h-[80vh] overflow-y-auto
          ${
            open
              ? "transition-transform ease-in-out duration-300 scale-100 translate-y-0"
              : "scale-0 transform translate-y-full"
          }
          `}
        >
          {children}
          <button
            className="absolute top-0 right-0 mt-8 mr-8 p-[4px]"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Image src={close} alt="close" />
          </button>
        </div>
      </div>
    </div>
  );
};
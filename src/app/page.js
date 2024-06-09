import Image from "next/image";
import Homepage from "./home/page";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Homepage/>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
      /> */}
    </main>
  );
}

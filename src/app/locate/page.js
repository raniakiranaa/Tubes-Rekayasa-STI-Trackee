import { Input } from "@/components/shares/Input"

export default function Locate() {
    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <div className="flex flex-row gap-10">
                <div>
                    <div className='text-brown-2 bold-48 mt-16'>Locate Product</div>
                    <div className="text-gray-2 medium-24 mt-2">Find your preferred product <br/> through filling out this form.</div>
                </div>
                <div class="grow bg-white border border-gray-200 rounded-3xl shadow mt-20" style={{ width: 866, height: 691 }}>
                    <form>
                        <div className="flex flex-col gap-8 px-12 pt-12">
                            <Input label="Product ID*" placeholder="Enter Product ID"/>
                            <Input label="Product Name" placeholder="Enter Product Name"/>
                        </div>
                    </form>
                    <div className="w-fit flex flex-row bg-brown-2 rounded-3xl px-12 py-3 mt-[322px] gap-8 mx-12 mt-11">
                        <a href="/result" class="text-white medium-18 text-center">
                            Locate Product
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
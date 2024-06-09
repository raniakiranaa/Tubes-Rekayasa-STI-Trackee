import { Data } from '@/components/privates/result'

export default function Result() {
    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <div className="flex flex-row gap-10">
                <div>
                    <div className='text-brown-2 bold-48 mt-16'>Locate Result</div>
                    <div className="text-gray-2 medium-24 mt-2">Take a glance where your  <br/> product is located.</div>
                </div>
                <div className="grow bg-white border border-gray-200 rounded-3xl shadow mt-20" style={{ width: 866, height: 691 }}>
                    <Data id="#PA001" name="Indomie Varian Mie Goreng" shelf="123" row="1" column="1"/>
                </div>
            </div>
        </div>
    )
}
import { Card } from '../../components/shares/Card'

export default function Homepage(){
    return (
        <div className="w-full flex min-h-screen flex-col pt-16 px-20">
            <div className='text-brown-2 bold-48 mt-16'>Welcome to <span className='underline'>Trackee</span></div>
            <div className="text-gray-2 medium-24 mt-2">From chaos to control, we make inventory simple.</div>
            <div className="flex flex-row mt-4 justify-between">
                <Card image='/dashboard.svg' title="Dashboard" desc="Gain real-time insights into your inventory with our interactive dashboard." linkPage="/dashboard"/>
                <Card image='/qr.svg' title="Generate QR" desc="Generate unique QR codes effortlessly for easier product identification." linkPage="/qr"/>
                <Card image='/locate.svg' title="Locate Product" desc="Find your product of choice simply through filling out our form." linkPage="/locate"/>
            </div>
        </div>
    )
}
export const Card = (props) => {
    return (
        <div class="max-w-sm mt-12 bg-white border border-gray-200 rounded-3xl shadow" style={{ width: 409, height: 478 }}>
            <div class="flex justify-center pt-8">
                <img src={props.image} alt="img"/>
            </div>
            <p class="mb-3 px-[52px] regular-16 text-gray-2 mt-7" style={{ textAlign: "center" }}>Find your product of choice simply through filling out our form.</p>
            <div className="w-fit flex flex-row bg-brown-2 rounded-3xl px-6 py-3 gap-8 justify-center items-center mx-auto mt-11">
                <a href="#" class="text-white semibold-24 text-center">
                    {props.desc}
                </a>
                <img src='/arrow.svg' alt="arrow"/>
            </div>
        </div>
    )
}
export const Input = (props) => {
    return (
        <div>
            <label for={props.label} class="block mb-2 text-sm bold-20 text-brown-2 pb-3">{props.label}</label>
            <input type="text" id={props.label} class="bg-gray-50 border border-gray-3 text-gray-2 text-sm rounded-lg block w-full p-4 medium-16" placeholder={props.placeholder} required />
        </div>
    )
}
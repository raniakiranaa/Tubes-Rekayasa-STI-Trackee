export const Input = (props) => {
    return (
        <div>
            <label htmlFor={props.label} className="block mb-2 text-sm bold-20 text-brown-2 pb-3">{props.label}</label>
            <input 
                type="text" 
                id={props.label} 
                className="bg-gray-50 border border-gray-3 text-gray-2 text-sm rounded-lg block w-full p-4 medium-16" 
                placeholder={props.placeholder} 
                value={props.value}
                onChange={props.onChange}
                required={props.required}
            />
        </div>
    )
}

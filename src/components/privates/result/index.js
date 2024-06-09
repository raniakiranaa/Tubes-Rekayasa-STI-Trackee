export const Data = (props) => {
    return(
        <div className="pt-9 flex flex-col gap-6 px-12 pt-12">
            <div className="bold-20 text-brown-2">Item ID : <span className="regular-20">{props.id}</span></div>
            <div className="bold-20 text-brown-2">Product Name : <span className="regular-20">{props.name}</span></div>
            <div className="bold-20 text-brown-2">Shelf Number : <span className="regular-20">{props.shelf}</span></div>
            <div className="bold-20 text-brown-2">Row Number : <span className="regular-20">{props.row}</span></div>
            <div className="bold-20 text-brown-2">Column Number : <span className="regular-20">{props.column}</span></div>
        </div>
    )
}
import '../Style/Input.css';

function Input() {
    return ( 
    <>
        <div className="flex fixed bottom-0 w-full left-100 items-center">
        <input type="text" name="" id="" placeholder="Message" className="h-lg w-4xl border ml-4 mr-2 mt-4 mb-4 p-2 text-lg rounded-lg cursor-text border-lime-900 background focus:outline-none"/>
        <button className="h-lg w-24 md:w-45 border p-2 mt-4 mr-4 mb-4 text-lg rounded-lg background-button flex justify-center cursor-pointer ">
            <img src="../../public/send-light.png" className="h-6" alt="" srcset="" />
        </button>
        </div>
    </> 
    );
}

export default Input;
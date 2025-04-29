import '../Style/Input.css';

function Input() {
    return ( 
    <>
        <div className="flex">
        <input type="text" name="" id="" placeholder="Message" className="h-lg w-full border ml-4 mr-2 mt-4 p-2 text-lg rounded-lg cursor-text border-lime-900 background"/>
        <button className="h-lg w-24 md:w-sm border p-2 mt-4 mr-4 text-lg rounded-lg background-button flex justify-center cursor-pointer ">
            <img src="../../public/send-light.png" className="h-6" alt="" srcset="" />
        </button>
        </div>
    </> 
    );
}

export default Input;
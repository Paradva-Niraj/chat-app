import '../Style/Input.css';

function Input() {
    return (
        <>
            <div className="Input flex w-full m-4">
                <input type="text" name="Messmage" className="focus:border-blue-500 flex-1 border rounded-lg p-2 font-bold text-2xl "  id="" placeholder='Message' />
                <button className="w-1/6 border border-cyan-700 flex justify-center items-center rounded-lg ml-2 hover:bg-blue-50">
                    <img src="send-light.png" className="h-6" alt="" srcset="" />
                </button>
            </div>
        </>
    );
}

export default Input;
import '../Style/Input.css';

function Input() {
    return (
        <div className="sidepannel">
            <div className="chats">
                <div className="recive-message message">Hi there!</div>
                <div className="send-message message">Hello! How are you?</div>
                <div className="recive-message message">I'm good, thanks!</div>
                
                <div className="recive-message message">Hi there!</div>
                <div className="send-message message">Hello! How are you?</div>
                <div className="recive-message message">I'm good, thanks!</div>
                <div className="recive-message message">Hi there!</div>
                <div className="send-message message">Hello! How are you?</div>
                <div className="recive-message message">I'm good, thanks!</div>
                <div className="recive-message message">Hi there!</div>
                <div className="send-message message">Hello! How are you?</div>
                <div className="recive-message message">I'm good, thanks!</div>
                <div className="recive-message message">Hi there!</div>
                <div className="send-message message">Hello! How are you?</div>
                <div className="recive-message message">I'm good, thanks!</div>
                <div className="recive-message message">Hi there!</div>
                <div className="send-message message">Hello! How are you?</div>
                <div className="recive-message message">I'm good, thanks!</div>
                <div className="recive-message message">Hi there!</div>
                <div className="send-message message">Hello! How are you?</div>
                <div className="recive-message message">I'm good, thanks!</div>     
            </div>
            <div className="input-box">
                <input type="text" name="Messmage" className="input" id="" placeholder='Message' />
                <button className="send">
                    <img src="send-light.png" className="send-image" alt="" />
                </button>
            </div>
        </div>
    );
}

export default Input;
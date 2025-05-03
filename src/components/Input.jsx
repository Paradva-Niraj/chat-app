import '../Style/Input.css';

function Input() {
    return (
        <div className="sidepannel">
            <div className="chats">
                <div class="recive-message message">Hi there!</div>
                <div class="send-message message">Hello! How are you?</div>
                <div class="recive-message message">I'm good, thanks!</div>
                
                <div class="recive-message message">Hi there!</div>
                <div class="send-message message">Hello! How are you?</div>
                <div class="recive-message message">I'm good, thanks!</div>
                <div class="recive-message message">Hi there!</div>
                <div class="send-message message">Hello! How are you?</div>
                <div class="recive-message message">I'm good, thanks!</div>
                <div class="recive-message message">Hi there!</div>
                <div class="send-message message">Hello! How are you?</div>
                <div class="recive-message message">I'm good, thanks!</div>
                <div class="recive-message message">Hi there!</div>
                <div class="send-message message">Hello! How are you?</div>
                <div class="recive-message message">I'm good, thanks!</div>
                <div class="recive-message message">Hi there!</div>
                <div class="send-message message">Hello! How are you?</div>
                <div class="recive-message message">I'm good, thanks!</div>
                <div class="recive-message message">Hi there!</div>
                <div class="send-message message">Hello! How are you?</div>
                <div class="recive-message message">I'm good, thanks!</div>     
            </div>
            <div className="input-box">
                <input type="text" name="Messmage" className="input" id="" placeholder='Message' />
                <button className="send">
                    <img src="send-light.png" className="send-image" alt="" srcset="" />
                </button>
            </div>
        </div>
    );
}

export default Input;
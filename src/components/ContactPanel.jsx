import { useState, useEffect } from 'react';
import '../Style/ContactPanel.css';
import { useNavigate } from 'react-router-dom';

function ContactPanel() {
    const [showPopup, setShowPopup] = useState(false);
    const [contacts, steConatcts] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Ella']);
    const [latest, setLatest] = useState(['Alice', 'Bob']);

    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        nav('/login');
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && showPopup) {
                setShowPopup(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showPopup]);

    return (
        <>
            <div className="contact">
                <span>
                {contacts.map((name, index) => (
                    <div key={index} className="contact-item">
                        {name}
                    </div>
                ))}
                </span>
                <span>
                <button onClick={handleLogout} className='logout' style={{width:'100%'}}>Log Out</button>
                </span>
            </div>
            <div className='menu'>
                <div className="menu-box" onClick={() => setShowPopup(!showPopup)}>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
                </div>
                <div>
                    <button onClick={handleLogout} className='logout'>Log Out</button>
                </div>
            </div>
                {showPopup && (
                    <div className="popup">
                        {contacts.map((name, index) => (
                            <div key={index} className="contact-item">
                                {name}
                            </div>
                        ))}
                    </div>
                )}
        </>
    );
}

export default ContactPanel;

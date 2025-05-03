import { useState, useEffect } from 'react';
import '../Style/ContactPanel.css';

function ContactPanel() {
    const [showPopup, setShowPopup] = useState(false);
    const [contacts, steConatcts] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Ella']);
    const [latest, setLatest] = useState(['Alice', 'Bob']);

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
                {contacts.map((name, index) => (
                    <div key={index} className="contact-item">
                        {name}
                    </div>
                ))}
            </div>
             <div className="menu-box" onClick={() => setShowPopup(!showPopup)}>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
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

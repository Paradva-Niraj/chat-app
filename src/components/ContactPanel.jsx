import { useState, useEffect } from 'react';
import '../Style/ContactPanel.css';
import { useNavigate } from 'react-router-dom';

function ContactPanel() {
    const [showPopup, setShowPopup] = useState(false);
    const [contacts, steConatcts] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Alice', 'Bob', 'Charlie', 'David', 'Ella']);
    const [latest, setLatest] = useState(['Alice', 'Bob']);
    const [morefeature, SetMorefeature] = useState(false);

    const popFeature = () => {
        SetMorefeature(!morefeature);
    }

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
                    <input type="text" name="phone" id="" className="search" placeholder='Search' />
                    {contacts.map((name, index) => (
                        <div key={index} className="contact-item">
                            {name}
                        </div>
                    ))}
                </span>
                <span className='feature'>
                    <button onClick={handleLogout} className='logout' style={{ width: '49%' }}>Log Out</button>
                    <button onClick={handleLogout} className='logout' style={{ width: '49%', background: 'rgb(94, 255, 190)' }}>Add New</button>
                </span>
            </div>
            <div className='menu'>
                <div className="menu-box" onClick={() => setShowPopup(!showPopup)}>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
                </div>
                <div className='phone-search'>
                    <input type="text" name="search" className='search' id="" placeholder='Search' />
                </div>
                <div className='more'>
                    <span id="more-feature" onClick={popFeature}>
                        <span className='dot'></span>
                        <span className='dot'></span>
                        <span className='dot'></span>
                    </span>

                    {morefeature && (
                        <div className="popup-menu">
                            <button onClick={handleLogout} className='logout' style={{ width: '100%' }}>Log Out</button>
                            <button onClick={handleLogout} className='logout' style={{ width: '100%', background: 'rgb(94, 255, 190)' }}>Add New</button>
                        </div>
                    )}
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

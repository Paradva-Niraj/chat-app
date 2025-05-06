import { useState, useEffect } from 'react';
import '../Style/ContactPanel.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function ContactPanel() {
    const [showPopup, setShowPopup] = useState(false);
    const [contacts, steConatcts] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Alice', 'Bob', 'Charlie', 'David', 'Ella']);
    const [morefeature, SetMorefeature] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setresult] = useState([])
    const [loading,setLoading] = useState(false); 
    const URL = import.meta.env.VITE_SEARCH_URL;

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

    useEffect(() => {
        const fetchUser = async () => {

            if (searchQuery.trim().length > 0 && searchQuery.length == 10) {
                try {
                    setLoading(true)
                    const users = await axios.get(`${URL}searchnew?phone=${searchQuery}`);
                    setresult(users.data);
                }
                catch (err) {
                    // alert(err.response?.data?.msg || "no found");
                    setresult([]);
                    setLoading(false);
                }
            }
            else {
                setresult([]);
                setLoading(false);
            }
        }
        fetchUser();
    }, [searchQuery])

    return (
        <>
            <div className="contact">
                <span className='contact-list'>
                    <input type="text" name="phone" id="" className="search" placeholder='Search' />
                    {contacts.map((name, index) => (
                        <div key={index} className="contact-item">
                            {name}
                        </div>
                    ))}
                </span>
                <span className='feature'>
                    <button onClick={handleLogout} className='logout' style={{ width: '49%' }}>Log Out</button>
                    <button onClick={() => { setShowSearchModal(!showSearchModal) }} className='logout' style={{ width: '49%', background: 'rgb(94, 255, 190)' }}>Add New</button>
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
                            <button onClick={() => { setShowSearchModal(!showSearchModal) }} className='logout' style={{ width: '100%', background: 'rgb(94, 255, 190)' }}>Add New</button>
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
            {showSearchModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowSearchModal(!showSearchModal)}>X</button>
                        <input
                            type="text"
                            className="search"
                            placeholder="Search by phone number"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value) }}
                        />
                        <div className="search-results">
                            {result.length > 0 ? (
                                result.map((user, idx) => (
                                    <div key={idx} className="contact-item">
                                        <div className="name-box">
                                            <div className="name">
                                                {user.name}                                               
                                            </div>
                                            <div className="name-contact">
                                                {user.phone}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (loading ? 
                                searchQuery.length === 10 && <div className='loader'>
                                    
                                </div>:<div>No Data Found</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ContactPanel;

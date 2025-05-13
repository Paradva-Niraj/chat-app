import { useState, useEffect } from 'react';
import '../Style/ContactPanel.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactPanel({ onSelectFrd }) {
    const [showPopup, setShowPopup] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [morefeature, setMorefeature] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addingFriend, setAddingFriend] = useState(false);
    const [searchContactvalue, setSearchContactValue] = useState('');
    const [filter, setFilter] = useState(null);
    const URL = import.meta.env.VITE_SEARCH_URL;
    const friendurl = import.meta.env.VITE_FRIEND_URL;

    const token = localStorage.getItem("token");
    const location = useLocation();
    const cphone = location.state?.user?.phone || localStorage.getItem('userPhone');
    // console.log(cphone);
    
    // Debug token
    useEffect(() => {
        if (token) {
            try {
                // Just log the first few characters for debugging
                console.log('Token available:', token.substring(0, 15) + '...');
            } catch (err) {
                console.error('Token issue:', err);
            }
        } else {
            console.warn('No token found in localStorage');
        }
    }, []);

    const popFeature = () => {
        setMorefeature(!morefeature);
    }

    const nav = useNavigate();


    // logout 
    const handleLogout = () => {
        localStorage.removeItem('token');
        nav('/login');
    }


    // responsive contact hide and dsplay
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && showPopup) {
                setShowPopup(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showPopup]);


    // ftech users for display - friend list
    useEffect(() => {
        const fetchUser = async () => {
            if (searchQuery.trim().length > 0) {
                try {
                    setLoading(true);
                    setError(null);

                    // Make a POST request to the backend with phone in the request body
                    const users = await axios.post(
                        `${URL}searchnew`,
                        { phone: searchQuery },  // Send the phone number in the request body
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,  // Pass the token for authorization
                            },
                        }
                    );
                    // console.log('Search results:', users.data);
                    setResult([users.data]);  // Store the result in state
                    setLoading(false);
                } catch (err) {
                    setResult([]);
                    setLoading(false);
                    setError('Search failed: ' + (err.response?.data?.msg || err.message));
                    console.error("Search error:", err.response?.data || err.message);
                }
            } else {
                setResult([]);
                setLoading(false);
            }
        }

        if (searchQuery.length >= 10) {
            fetchUser();
        }
    }, [searchQuery, URL, token]);


    // Friend list function - fetching fron server
    const fetchFriends = async () => {
        try {
            setError(null);
            console.log('Fetching friends list...');
            const response = await axios.get(`${friendurl}list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log('Friends list response:', response.data);
            setContacts(response.data);
        }
        catch (err) {
            setError('Failed to load contacts: ' + (err.response?.data?.msg || err.message));
            console.error("Error fetching friends:", err.response?.data || err);
        }
    }

    useEffect(() => {
        if (token) {
            fetchFriends();
        }
    }, [token]);

    // add friend function 
    const addFriend = async (friendPhone) => {

        try {
            setAddingFriend(true);
            setError(null);
            // console.log('Adding friend with phone:', friendPhone);

            const response = await axios.post(
                `${friendurl}add`,
                { friendPhone, userphone: cphone },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // console.log('Add friend response:', response.data);
            setAddingFriend(false);
            fetchFriends();
            setShowSearchModal(false);
        } catch (err) {
            setAddingFriend(false);
            const errorMsg = err.response?.data?.msg || err.message || 'Unknown error';
            setError('Failed to add contact: ' + errorMsg);
            // console.error("Error adding friend:", errorMsg) ;
            alert(errorMsg);
            // Log additional error details for debugging
            if (err.response) {
                console.error("Error status:", err.response.status);
                console.error("Error details:", err.response.data);
            }
        }
    };

    // search from already added frd contact component right side
    useEffect(() => {
        if (searchContactvalue.trim().length > 0) {
            const filtered = contacts.filter(contact =>
                contact.name?.toLowerCase().includes(searchContactvalue.toLowerCase()) ||
                contact.phone?.includes(searchContactvalue)
            );
            setFilter(filtered);
        } else {
            setFilter(contacts);
        }
        if (searchContactvalue.length > 0 && window.innerWidth < 1024) {
            setShowPopup(true);
        }
        else {
            setShowPopup(false);
        }
    }, [searchContactvalue, contacts]);


    //

    return (
        <>
            <div className="contact">
                <span className='contact-list'>
                    <input type="text" name="phone" value={searchContactvalue} id="" onChange={(e) => setSearchContactValue(e.target.value)} className="search" placeholder='Search' />
                    {contacts.length > 0 ? (
                        filter.map((contact, index) => (
                            <div key={index} className="contact-item" onClick={() => onSelectFrd(contact)}>
                                {contact.name || contact.phone}
                            </div>
                        ))
                    ) : (
                        <div className="no-contacts">No contacts found</div>
                    )}
                    {/* {console.log("con-"+JSON.stringify(contacts))} */}
                </span>
                <span className='feature'>
                    <button onClick={handleLogout} className='logout' style={{ width: '49%' }}>Log Out</button>
                    <button onClick={() => { setShowSearchModal(!showSearchModal); setError(null); }} className='logout' style={{ width: '49%', background: 'rgb(94, 255, 190)' }}>Add New</button>
                </span>
            </div>

            <div className='menu'>
                <div className="menu-box" onClick={() => setShowPopup(!showPopup)}>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
                    <span className="line rounded-sm"></span>
                </div>
                <div className='phone-search'>
                    <input type="text" name="search" value={searchContactvalue} onChange={(e) => setSearchContactValue(e.target.value)} className='search' id="" placeholder='Search' />
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
                            <button onClick={() => { setShowSearchModal(!showSearchModal); setError(null); }} className='logout' style={{ width: '100%', background: 'rgb(94, 255, 190)' }}>Add New</button>
                        </div>
                    )}
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    {filter.map((contact, index) => (
                        <div key={index} className="contact-item" onClick={() => {
                            onSelectFrd(contact);
                            setShowPopup(false);
                        }}>
                            {contact.name || contact.phone}
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
                            {loading ? (
                                <div className='loader'></div>
                            ) : result.length > 0 ? (
                                result.map((user, idx) => (
                                    <div key={idx} className="contact-item">
                                        <div className="name-box">
                                            <div className="name">{user.name}</div>
                                            <div className="name-contact">{user.phone}</div>
                                            <div
                                                className="add-btn"
                                                onClick={() => addFriend(user.phone)}
                                                style={{ cursor: addingFriend ? 'not-allowed' : 'pointer' }}
                                            >
                                                {addingFriend ? '...' : '+'}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No Data Found</div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ContactPanel;
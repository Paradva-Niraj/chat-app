import '../Style/ContactPanel.css';

function ContactPanel() {
    return (
        <>
            <div className="hidden lg:block h-screen-100 w-md mt-4 ml-4 mb-4 rounded-xl border-2 contact">
                contact
            </div>
            <div className="flex lg:hidden menu-box rounded-md">
                <span className="line rounded-sm"></span>
                <span className="line rounded-sm"></span>
                <span className="line rounded-sm"></span>
            </div>
        </>
    );
}

export default ContactPanel;

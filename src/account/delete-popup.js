import { React } from "react";
import "../styles/global-styles.css";
import { IoClose } from "react-icons/io5";

function DeleteAccountPopup({ userId, onClose }) {
    
    function deleteAccount() {
        // delete account
        // route to the sign up page
    }
	return (
		<div className="fixed wd-delete-popup-bg">
			<div className="fixed bg-white wd-delete-popup">
				<div
					className="float-right p-4 pt-3 hover:cursor-pointer text-2xl text-stone-600 hover:text-stone-400"
					onClick={() => onClose(false)}>
					<IoClose />
				</div>
				<div className="p-5 pt-6">
					<span>
						Are you sure you want to delete your account? This
						action cannot be undone.
					</span>
                    <div className="w-full flex justify-center mt-4 mb-2">
                        <button className="wd-btn wd-btn-danger wd-btn-large !mr-4">
                            Yes, I'm sure
                        </button>
                        <button onClick={() => onClose(false)} className="wd-btn wd-btn-large !ml-4">
                            No, cancel
                        </button>
                    </div>
				</div>
			</div>
		</div>
	);
}
export default DeleteAccountPopup;

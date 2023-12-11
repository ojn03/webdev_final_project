import { React } from "react";
import "../../styles/global-styles.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function SigninPromptPopup({ onClose }) {
	return (
		<div className="fixed wd-delete-popup-bg">
			<div className="fixed bg-white wd-delete-popup p-2">
				<div
					className="float-right p-4 pt-3 hover:cursor-pointer text-2xl text-stone-600 hover:text-stone-400"
					onClick={() => onClose(false)}>
					<IoClose />
				</div>
				<div className="p-5 pt-6">
					<div className="wd-sub-title">
						Unlock all the features for FREE.
					</div>
          <div className="mt-2">
						Log in or create a free account to keep the pan sizzling and the recipes coming.
					</div>
					<div className="w-full flex flex-wrap justify-center mt-6 mb-2">
            <Link to="/login">
							<button className="wd-btn wd-btn-large !mr-4">
								Sign In
							</button>
						</Link>
						<Link to="/signup">
							<button className="wd-btn wd-btn-success wd-btn-large !ml-4">
								Create an Account
							</button>
						</Link>

					</div>
				</div>
			</div>
		</div>
	);
}
export default SigninPromptPopup;

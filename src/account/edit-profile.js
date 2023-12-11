import { React, useState } from "react";
import "../styles/global-styles.css";
import { Link, Navigate } from "react-router-dom";
import DeleteAccountPopup from "./delete-popup";

function EditProfile() {
	// should actually be setting the state using the user's data in the db
	// except password, they should not be allowed to see the inital value for security
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState(undefined);
	const [error, setError] = useState(undefined);
	const [deletePopup, setDeletePopup] = useState(false);
	const update = () => {
		let newUser = {};
		// try to create new user
		// if successful, update user and set user to new user
		// else, give an error
		setUser(newUser);
	};
	const deleteAccount = () => {
		setDeletePopup(true);
		// sign up
	};

	return (
		<div className={"flex w-full justify-center"}>
			<div>
				{deletePopup && (
					<DeleteAccountPopup
						userId={"fake id"}
						onClose={setDeletePopup}
					/>
				)}
			</div>
			<div className="flex flex-col">
				<h1 className="wd-title mt-6 self-center">Edit Profile</h1>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Full Name
				</span>
				<input
					type={"text"}
					placeholder="Full Name"
					className="wd-input-small m-2"
					onChange={(e) => setName(e.target.value)}></input>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Username
				</span>
				<input
					type={"text"}
					placeholder="Username"
					className="wd-input-small m-2"
					onChange={(e) => setUsername(e.target.value)}></input>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Email Address
				</span>
				<input
					type={"email"}
					placeholder="Email Address"
					className="wd-input-small m-2"
					onChange={(e) => setEmail(e.target.value)}></input>

				<span className="ml-1 wd-sub-sub-title text-stone-700">
					New Password
				</span>
				<input
					type={"password"}
					placeholder="New Password"
					className="wd-input-small m-2"
					onChange={(e) => setNewPassword(e.target.value)}></input>
				
        <span className="ml-1 wd-sub-sub-title text-stone-700">
					Confirm Password
				</span>
				<input
					type={"password"}
					placeholder="Confirm Password"
					className="wd-input-small m-2"
					onChange={(e) =>
						setPasswordConfirm(e.target.value)
					}></input>

				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Old Password
				</span>
				<input
					type={"password"}
					placeholder="Old Password"
					className="wd-input-small m-2"
					onChange={(e) => setPassword(e.target.value)}></input>

				<br className="m-5"></br>
				{error && <p>{error.message}</p>}
				{/* if successful, route to profile. Otherwise, stay on some page */}
				<button
					className="wd-btn wd-btn-success w-60 self-center"
					onClick={() => update()}>
					Update
					{user && <Navigate to="/profile" replace={true} />}
				</button>
				<button
					className="wd-btn w-60 self-center"
					onClick={() => update()}>
					Cancel
          {user && <Navigate to="/profile" replace={true} />}
				</button>
				<button
					className="wd-btn wd-btn-danger w-60 self-center"
					onClick={() => deleteAccount()}>
					Delete Account
				</button>
			</div>
		</div>
	);
}
export default EditProfile;

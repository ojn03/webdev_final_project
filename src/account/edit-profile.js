import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import { useNavigate } from "react-router-dom";
import DeleteAccountPopup from "./delete-popup";
import * as client from "../client";

function EditProfile() {
	// should actually be setting the state using the user's data in the db
	// except password, they should not be allowed to see the inital value for security
	const navigate = useNavigate();
	const [account, setAccount] = useState(null);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [restaurant, setRestaurant] = useState("");
	const [experience, setExperience] = useState("");
	const [isChef, setIsChef] = useState(false);
	const [error, setError] = useState(undefined);
	const [deletePopup, setDeletePopup] = useState(false);

	const fetchAccount = async () => {
		try {
			const account = await client.account();
			setAccount(account);
			setFirstName(account.first);
			console.log(account.first)
			setLastName(account.last);
			setUsername(account.username);
			setIsChef(account.type === "Chef");
			if (account.type === "Chef") {
				setRestaurant(account.restaurant);
			} else {
				setExperience(account.experience);
			}
		}
		catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAccount();
	}, []);


	const update = async () => {
		try {
			if (password && password !== account.password) {
				setError("Incorrect password");
				return;
			}
			if (newPassword && newPassword !== passwordConfirm) {
				setError("Passwords do not match");
				return;
			}
			const userObject = {
				id: account._id,
				first: firstName,
				last: lastName,
				username: username,
				password: newPassword ? newPassword : account.password,
				...(!isChef && { experience: experience }),
				...(isChef && { restaurant: restaurant }),
				type: isChef ? "chef" : "basic"
			}
			await client.updateUser(userObject);
			await client.signin({ username: userObject.username, password: userObject.password })
			navigate('/profile')
		}
		catch {
			setError("Failed to update account");
		}
	};
	const deleteAccount = async () => {
		setDeletePopup(true);
	};

	if (!account) {
		return <div>Loading...</div>;
	}


	return (
		<div className={"flex w-full justify-center"}>
			<div>
				{deletePopup && (
					<DeleteAccountPopup
						userId={account._id}
						onClose={setDeletePopup}
					/>
				)}
			</div>
			<div className="flex flex-col">
				<h1 className="wd-title mt-6 self-center">Edit Profile</h1>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					First Name
				</span>
				<input
					type={"text"}
					placeholder="First Name"
					className="wd-input-small m-2"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}></input>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Last Name
				</span>
				<input
					type={"text"}
					placeholder="Last Name"
					className="wd-input-small m-2"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}></input>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Username
				</span>
				<input
					type={"text"}
					placeholder="Username"
					className="wd-input-small m-2"
					value={username}
					onChange={(e) => setUsername(e.target.value)}></input>
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
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					User Type
				</span>
				<select name="userType" id="userType" className="wd-dropdown" value={isChef ? "chef" : "normal"} onChange={(e) => setIsChef(e.target.value === "chef")}>
					<option value="normal">Home Cook</option>
					<option value="chef">Professional Chef</option>
				</select>
				{!isChef ?
					<>
						<span className="ml-1 wd-sub-sub-title text-stone-700">
							Experience Level
						</span>
						<select id="experience" className="wd-dropdown" value={experience} onChange={(event) => setExperience(event.target.value)}>;
							<option value="">Select</option>
							<option value="1">Level 1</option>
							<option value="2">Level 2</option>
							<option value="3">Level 3</option>
							<option value="4">Level 4</option>
							<option value="5">Level 5</option>
						</select> </> : <>
						<span className="ml-1 wd-sub-sub-title text-stone-700">
							Restaurant Name
						</span>
						<input
							type={"restaurant"}
							placeholder="Restaurant Name"
							className="wd-input-small m-2"
							value={restaurant}
							onChange={(e) => setRestaurant(e.target.value)}></input>
					</>}

				<br className="m-5"></br>
				{error}
				{/* if successful, route to profile. Otherwise, stay on some page */}
				<button
					className="wd-btn wd-btn-success w-60 self-center"
					onClick={() => update()}>
					Update
				</button>
				<button
					className="wd-btn w-60 self-center"
					onClick={() => navigate("/profile")}>
					Cancel
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

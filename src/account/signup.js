import { React, useState } from "react";
import "../styles/global-styles.css";
import { Link } from "react-router-dom";
import * as client from "../client";
import { useNavigate } from "react-router";



function Signup() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");
	const [isChef, setIsChef] = useState(false);
	const [experienceLevel, setExperienceLevel] = useState('');
	const [restaurant, setRestaurant] = useState('');
	const navigate = useNavigate();

	const handleClick = async () => {
		try {
			if (password !== passwordConfirm) {
				setError("Passwords do not match");
				return;
			}
			const userObject = {
				first: firstName,
				last: lastName,
				username: username,
				password: password,
				...(!isChef && { experienceLevel: experienceLevel }),
				...(isChef && { restaurant: restaurant }),
				type: isChef ? "chef" : "basic"
			}
			const currentUser = await client.signup(userObject);
			navigate("/profile");
		} catch (error) {
			setError(error.toString())
		}
	};

	return (
		<div className={"flex w-full justify-center"}>
			<div className="flex flex-col">
				<h1 className="wd-title mt-6 self-center">Create an Account</h1>
				{error && (
					<span className="text-red-500 text-sm self-center">
						{error.message}
					</span>
				)}
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					First Name
				</span>
				<input
					type={"text"}
					placeholder="First Name"
					className="wd-input-small m-2"
					onChange={(e) => setFirstName(e.target.value)}></input>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Last Name
				</span>
				<input
					type={"text"}
					placeholder="Last Name"
					className="wd-input-small m-2"
					onChange={(e) => setLastName(e.target.value)}></input>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Username
				</span>
				<input
					type={"text"}
					placeholder="Username"
					className="wd-input-small m-2"
					onChange={(e) => setUsername(e.target.value)}></input>
				<span className="ml-1 wd-sub-sub-title text-stone-700">
					Password
				</span>
				<input
					type={"password"}
					placeholder="Password"
					className="wd-input-small m-2"
					onChange={(e) => setPassword(e.target.value)}></input>
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
					User Type
				</span>
				<select name="userType" id="userType" className="wd-dropdown" onChange={(e) => setIsChef(e.target.value === "chef")}>
					<option value="normal">Home Cook</option>
					<option value="chef">Professional Chef</option>
				</select>
				{!isChef ?
					<>
						<span className="ml-1 wd-sub-sub-title text-stone-700">
							Experience Level
						</span>
						<select id="experience" className="wd-dropdown" value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)}>;
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
							onChange={(e) => setRestaurant(e.target.value)}></input>
					</>}
				<br className="m-5"></br>

				{/* if successful, route to profile. Otherwise, stay on some page */}
				<button
					className="wd-btn wd-btn-success w-60 self-center"
					onClick={handleClick}>
					Sign Up
				</button>

				<span className="mt-2 self-center mb-4">
					Already have an account?{" "}
					<Link
						to={`/${"login"}`}
						className="text-stone-500 underline hover:text-stone-400">
						Sign in now
					</Link>
				</span>
			</div>
		</div >
	);
}
export default Signup;

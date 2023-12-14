import { React, useState } from "react";
import "../styles/global-styles.css";
import { Link } from "react-router-dom";
import * as client from "../client";
import { useNavigate } from "react-router";



function Signup() {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [isChef, setIsChef] = useState(false);
	const navigate = useNavigate();

	const signUp = async () => {
		try {
			if (password !== passwordConfirm) {
				setError("Passwords do not match");
				return;
			}
			const userObject = {
				name: name,
				username: username,
				password: password,
				email: email,
				isChef: isChef
			}
			const currentUser = await client.signUp(userObject);
			navigate("/signin");
		} catch (error) {
			setError(error)
		}
	};

	return (
		<div className={"flex w-full justify-center"}>
			<div className="flex flex-col">
				<h1 className="wd-title mt-6 self-center">Create an Account</h1>
				{error && (
					<span className="text-red-500 text-sm self-center">
						{error}
					</span>
				)}
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
				<br className="m-5"></br>

				{/* if successful, route to profile. Otherwise, stay on some page */}
				<button
					className="wd-btn wd-btn-success w-60 self-center"
					onClick={() => signUp()}>
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
		</div>
	);
}
export default Signup;

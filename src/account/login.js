import { React, useState } from "react";
import "../styles/global-styles.css";
import { Link } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const signIn = () => {
		// sign in
	};

	return (
		<div className={"flex w-full justify-center"}>
			<div className="flex flex-col">
				<h1 className="wd-title mt-6 self-center">Sign In</h1>
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

				{/* if successful, route to profile. Otherwise, stay on some page */}
				<button
					className="wd-btn wd-btn-success w-60 self-center"
					onClick={() => signIn()}>
					Sign In
				</button>
				
				<span className="mt-2 self-center mb-4">
					Don't have an account?{" "}
					<Link
						to={`/${"signup"}`}
						className="text-stone-500 underline hover:text-stone-400">
						Sign up now
					</Link>
				</span>
			</div>
		</div>
	);
}
export default Login;

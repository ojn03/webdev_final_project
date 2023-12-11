import { React } from "react";
import "../styles/global-styles.css";
import "./acount-styles.css";
import { Link } from "react-router-dom";

function Profile() {
  // use params to get user id. If current user is logged in and there are no params, then show their own page
  // if user is logged in and there is an id in the param, show that profile of the user in the param
	const dummyUsername = "amazing_chef";
	const dummyName = "John Doe";

	return (
		<div className="flex m-6 w-full">
      <div className="flex w-full flex-wrap justify-between wd-top">
			<div className="">
				<span className="wd-sub-sub-title">@{dummyUsername}</span>
				<br></br>
				<span>{dummyName}</span>
			</div>
      {/* only show if this is the current user's account */}
      <div className="wd-profile-btn-bar">
        <Link to={`/${"profile/edit"}`}>
        <button className="wd-btn ">
          Edit
        </button></Link>
        <button className="wd-btn wd-btn-danger">
          Logout
        </button>
      </div></div>
		</div>
	);
}
export default Profile;

import { React, useState } from "react";
import "../styles/global-styles.css";
import "./acount-styles.css";
import { Link } from "react-router-dom";
import LikedRecipeCard from "../recipe-cards/liked-recipe";
import EndorsedRecipeCard from "../recipe-cards/endorsed-recipe";
import RecipeReviewCard from "../recipe-cards/recipe-review";

function Profile() {
	// use params to get user id. If current user is logged in and there are no params, then show their own page
	// if user is logged in and there is an id in the param, show that profile of the user in the param
	const dummyUsername = "amazing_chef";
	const dummyName = "John Doe";
	const [currentTab, setCurrentTab] = useState(0);

	const myUserTabs = ["Liked", "Following"];
	const myChefTabs = ["Liked", "Reviews", "Following", "Followers"];
	const otherChefTabs = ["Liked", "Reviews", "Following"];

	// fake liked IDs
	const dummyLiked = [1, 2, 3, 4, 5, 6];
	// fake user IDs
	const dummyFollowing = ["Carl_The_boss", "no-burnt-food", "best-chef-ever"];
	// fake endorsed IDs
	const dummyEndorsed = [1, 2, 3, 4, 5, 6];
	// fake review IDs
	const dummyReviews = [1, 2, 3, 4, 5, 6];
	//  fake follower usernames - in reality would probably be stored as an ID
	const dummyFollowers = ["Carl_The_boss", "no-burnt-food", "best-chef-ever"];

	// do some check to see if this is the user's profile and if the profile belongs to a chef
	const tabsToUse = myChefTabs;

	function getTabContent() {
		let tabToUse = tabsToUse[currentTab];
		if (tabToUse === "Liked") {
			return (
				<div>
					{dummyLiked.map((id) => (
						<div key={id}>
							<hr className="w-full" />
							<LikedRecipeCard recipeId={id} likedDate={id} />
						</div>
					))}
				</div>
			);
		} else if (tabToUse === "Following") {
			return (
				<div className="pb-2">
					{dummyFollowing.map((username, ind) => (
						<Link to={`/profile/${username}`}>
							<div
								key={username}
								className={`py-2 ${ind === 0 && "pt-0"}`}>
								<hr className="w-full py-2" />
								<span className="m-2 text-stone-600 hover:text-stone-400">
									@{username}
								</span>
							</div>
						</Link>
					))}
				</div>
			);
		} else if (tabToUse === "Endorsed") {
			return (
				<div>
					{dummyEndorsed.map((id) => (
						<div key={id}>
							<hr className="w-full" />
							<EndorsedRecipeCard recipeId={id} likedDate={id} />
						</div>
					))}
				</div>
			);
		} else if (tabToUse === "Reviews") {
      return (
				<div>
					{dummyReviews.map((id) => (
						<div key={id}>
							<hr className="w-full" />
							<RecipeReviewCard reviewId={id} />
						</div>
					))}
				</div>
			);
		} else if (tabToUse === "Followers") {
      return (
				<div className="pb-2">
					{dummyFollowers.map((username, ind) => (
							<div
								key={username}
								className={`py-2 ${ind === 0 && "pt-0"}`}>
								<hr className="w-full py-2" />
								<span className="m-2 text-stone-600">
									@{username}
								</span>
							</div>
					))}
				</div>
			);
		}
	}

	return (
		<div className="m-6 w-full">
			<div className="flex w-full flex-wrap justify-between wd-top">
				<div className="">
					<div className="wd-sub-title">@{dummyUsername}</div>

					<div className="ml-2 mt-2">{dummyName}</div>
				</div>
				{/* only show if this is the current user's account */}
				<div className="wd-profile-btn-bar">
					<Link to={`/${"profile/edit"}`}>
						<button className="wd-btn ">Edit</button>
					</Link>
					<button className="wd-btn wd-btn-danger">Logout</button>
				</div>

				{/* onlh show if this is not the current user's account */}
				<div className="w-full flex wd-follow">
					{/* if not already following */}
					<button className="wd-btn w-24">Follow</button>

					{/* if already following */}
					<button className="wd-btn wd-btn-danger w-24">
						Unfollow
					</button>
				</div>
			</div>

			<div className="flex w-full flex-wrap justify-center">
				<div className="wd-prof-content">
					{/* if chef's account and not user's account */}
					<div className="flex w-full flex-nowrap justify-between wd-prof-tab-bar">
						{tabsToUse.map((tab, ind) => (
							<div
								key={ind}
								className={`wd-prof-tab flex-grow hover:cursor-pointer p-2 wd-sub-heading text-stone-600 ${
									currentTab === ind && "wd-active"
								}`}
								onClick={() => setCurrentTab(ind)}>
								{tab}
							</div>
						))}
					</div>
					<div>{getTabContent()}</div>
				</div>
			</div>
		</div>
	);
}
export default Profile;

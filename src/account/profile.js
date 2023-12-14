import { React, useEffect, useState } from "react";
import "../styles/global-styles.css";
import "./acount-styles.css";
import { Link, useParams } from "react-router-dom";
import LikedRecipeCard from "../recipe-cards/liked-recipe";
// import EndorsedRecipeCard from "../recipe-cards/endorsed-recipe";
import RecipeReviewCard from "../recipe-cards/recipe-review";
import * as client from "../client.js";
import { useNavigate } from "react-router-dom";

function Profile() {
	const navigate = useNavigate();
	const [currentTab, setCurrentTab] = useState(0);
	const [loggedInAccount, setLoggedInAccount] = useState(null);
	const [profile, setProfile] = useState(null);
	const [likedArray, setLikedArray] = useState(null);
	const [reviewArray, setReviewArray] = useState(null);
	const { id: profileId } = useParams();

	const fetchData = async () => {
		try {
			const account = await client.account();

			if (!account && !profileId) {
				navigate("/login");
				return;
			}

			setLoggedInAccount(account);
			setProfile(await client.findUserById(profileId || account._id));
			setLikedArray(
				await client.findLikesByAuthorId(profileId || account._id)
			);
			setReviewArray(
				await client.findCommentsByAuthorId(profileId || account._id)
			);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchContent = async () => {
		setLikedArray(
			await client.findLikesByAuthorId(profileId || loggedInAccount._id)
		);
		setReviewArray(
			await client.findCommentsByAuthorId(profileId || loggedInAccount._id)
		);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		profileId && fetchContent();
	}, [profile]);

	if (!loggedInAccount || !profile || !likedArray || !reviewArray) {
		return <div>Loading...</div>;
	}

	const ourAccount = !profileId || loggedInAccount?._id === profileId;

	const handleLogOut = async () => {
		try {
			await client.signout();
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	const myUserTabs = ["Liked", "Following"];
	const myChefTabs = ["Liked", "Reviews", "Following", "Followers"];
	const otherChefTabs = ["Liked", "Reviews", "Following"];

	const tabsToUse = ourAccount
		? loggedInAccount.type === "Chef"
			? myChefTabs
			: myUserTabs
		: otherChefTabs;

	function getTabContent() {
		let tabToUse = tabsToUse[currentTab];
		if (tabToUse === "Liked") {
			return (
				<div>
					{likedArray.map((like) => (
						<div key={like.recipeId}>
							<hr className="w-full" />
							<LikedRecipeCard likeId={like._id} />
						</div>
					))}
				</div>
			);
		} else if (tabToUse === "Following") {
			return (
				<div className="pb-2">
					{profile.following?.map((username, ind) => (
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
		} else if (tabToUse === "Reviews") {
			return (
				<div>
					{reviewArray.map((review) => (
						<div key={review._id}>
							<hr className="w-full" />
							<RecipeReviewCard reviewId={review._id} />
						</div>
					))}
				</div>
			);
		} else if (tabToUse === "Followers") {
			return (
				<div className="pb-2">
					{profile.followers?.map((username, ind) => (
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
					<div className="wd-sub-title">@{profile.username}</div>
					<div className="ml-2 mt-2">
						{profile.first + " " + profile.last}
					</div>
				</div>
				{ourAccount ? (
					<div className="wd-profile-btn-bar">
						<Link to={`/${"profile/edit"}`}>
							<button className="wd-btn ">Edit</button>
						</Link>
						<button
							className="wd-btn wd-btn-danger"
							onClick={handleLogOut}>
							Logout
						</button>
					</div>
				) : (
					<div className="w-full flex wd-follow">
						{/* if not already following */}
						{loggedInAccount.following.includes(profile._id) ? (
							<button className="wd-btn wd-btn-danger w-24">
								Unfollow
							</button>
						) : (
							<button className="wd-btn w-24">Follow</button>
						)}
					</div>
				)}
			</div>

			<div className="flex w-full flex-wrap justify-center">
				<div className="wd-prof-content">
					{/* if chef's account and not user's account */}
					{/* I have no idea what you mean by this ^  */}
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

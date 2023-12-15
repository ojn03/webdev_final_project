import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import LikedRecipeCard from "../recipe-cards/liked-recipe";
import RecipeCard from "../recipe-cards/recipe-card.js";
import RecipeReviewCard from "../recipe-cards/recipe-review";
import * as client from "../client.js";

function Home() {
	const [account, setAccount] = useState(null);
	const [following, setFollowing] = useState(null);
	const [allReviews, setAllReviews] = useState(null);
	// const [followers, setFollowers] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [likes, setLikes] = useState(null);

	const fetchAccount = async () => {
		try {
			const account = await client.account();
			setAccount(account);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAllFollowing = async () => {
		const following = await client.findFollowing(account._id);
		// following.map((user) => user._id)
		setFollowing(following);
	};

	const arrayHasId = (array, id) => {
		let results = array.filter((elm) => elm._id === id);
		return results.length > 0;
	}


	const fetchAllReviews = async () => {
		try {
			
			let ids = following.map((elm) => elm._id);
			let rev3 = allReviews.filter((rev) => (ids.includes(rev.authorId)));
			rev3.sort((a, b) => {
				return new Date(b.createdAt) - new Date(a.createdAt);
			});
			setReviews(rev3);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAllComments = async () => {
		try {
			let allReviews = await client.findAllComments();
			setAllReviews(allReviews);
		} catch (error) {
			console.log(error);
		}
	}


	const fetchAllLikes = async () => {
		try {
			const allLikes = await client.findAllLikes();
			let likedRecipeIds = [];
			let allLikeRecipeIds = [];
			allLikes.forEach((like) => {
				allLikeRecipeIds.push(like.recipeId);
				!likedRecipeIds.includes(like.recipeId) &&
					likedRecipeIds.push(like.recipeId);
			});
			likedRecipeIds.sort((a, b) => {
				return (
					allLikeRecipeIds.filter((elm) => elm === b).length -
					allLikeRecipeIds.filter((elm) => elm === a).length
				);
			});
			setLikes(likedRecipeIds);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAccount();
		// fetchLikedRecipes();
	}, []);

	useEffect(() => {
		account ? fetchAllComments() : fetchAllLikes();
	}, [account]);

	useEffect(() => {
		// console.log("hi")
		if(account && !following) {
			fetchAllFollowing();
		} else {
			(account && allReviews) && fetchAllReviews();
		}
		
	}, [allReviews, following]);

	return (
		<div className="w-full mx-auto !mb-6">
			<h1 className="text-black wd-title ml-5 mt-3">Home</h1>
			{account
				? reviews?.map((review) => (
						<RecipeReviewCard reviewId={review._id} />
				  ))
				: likes?.map((like) => <RecipeCard recipeId={like} />)}
		</div>
	);
}
export default Home;

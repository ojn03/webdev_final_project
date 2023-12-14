import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import LikedRecipeCard from "../recipe-cards/liked-recipe";
import RecipeCard from "../recipe-cards/recipe-card.js";
import RecipeReviewCard from "../recipe-cards/recipe-review";
import * as client from "../client.js";

function Home() {
	const [account, setAccount] = useState(null);

  const [reviews, setReviews] = useState(null);
  const [likes, setLikes] = useState(null);


	const fetchAccount = async () => {
		try {
			const account = await client.account();
			setAccount(account);
		}
		catch (error) {
			console.log(error);
		}
	};

  const fetchAllReviews = async () => {
    try {
			const following = await client.findFollowing(account._id);
			let reviews = [];
      following.forEach(user => { reviews.push(fetchReviewsFromUser(user)) });
      reviews.sort((a,b) => {return new Date(b.createdAt) - new Date(a.createdAt);})
      setReviews(reviews);

		}
		catch (error) {
			console.log(error);
		}

  }

  const fetchReviewsFromUser = async (user) => {
    try {
			const reviews = await client.findCommentsByRecipeId(user._id);
			return reviews;
        
		}
		catch (error) {
			console.log(error);
		}
  }

  const fetchAllLikes = async () => {
    try {
			const allLikes = await client.findAllLikes();
      console.log(allLikes.length)
			let likedRecipeIds = [];
      let allLikeRecipeIds = [];
      allLikes.forEach(like => { allLikeRecipeIds.push(like.recipeId) ; !likedRecipeIds.includes(like.recipeId) && likedRecipeIds.push(like.recipeId) });
      likedRecipeIds.sort((a,b) => {return allLikeRecipeIds.filter((elm) => elm===b).length - allLikeRecipeIds.filter((elm) => elm===a).length;})
      setLikes(likedRecipeIds);
		}
		catch (error) {
			console.log(error);
		}
  }


	useEffect(() => {
		fetchAccount();
		// fetchLikedRecipes();
	}, []);


  useEffect(() => {
    account ? fetchAllReviews() : fetchAllLikes();
    console.log(likes);
  }, [account])


	return (
		<div className="w-full mx-auto !mb-6">
			<h1 className="text-black wd-title ml-5 mt-3">Home</h1>
      {account ? reviews?.map((review) => <RecipeReviewCard reviewId={review._id}/>) : likes?.map((like) => <RecipeCard recipeId={like}/>)}

		</div>
	);
}
export default Home;

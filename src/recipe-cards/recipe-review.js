import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/global-styles.css";
import "./recipe-cards.css";
import { FaUserCircle } from "react-icons/fa";
import * as client from "../client.js";
import { fetchRecipeById } from "../search/recipe-service";


function RecipeReviewCard({ reviewId }) {

	const [review, setReview] = useState(null);
	const [recipe, setRecipe] = useState(null);
	const [user, setUser] = useState(null);

	const fetchReview = async () => {
		const review = await client.findCommentById(reviewId);
		setReview(review);
	};

const fetchUser = async () => {
		const user = await client.findUserById(review.authorId);
		setUser(user);
	};

	useEffect(() => {
		fetchReview();
		// fetchRecipeById(review.recipeId).then((recipe) => {
		// 	setRecipe(recipe);
		// });
	}, []);
	

	useEffect(() => {
		review && fetchRecipeById(review.recipeId).then((recipe) => {
			setRecipe(recipe);})
			if (!review) return;
		fetchUser();
	}, [review])


	return (
		<div className="container wd-recipe-card my-0 p-0">
			<div className="p-6 ">
				<Link to={`/profile/${user?.username}`}><span className="inline-block wd-user-icon pb-3">
					<FaUserCircle /> @{user?.username}
				</span> </Link>
				<span className="float-right text-xs italic text-stone-500 ">Posted {new Date(review?.createdAt).toLocaleString()}</span>
				<p>{review?.text}</p>
			</div>
			<Link to={`/recipe/${recipe?.id}`}>
				<div className="m-0 p-0 wd-review-img-container">
					<img src={recipe?.image} alt={recipe?.label}></img>
				</div>

				<div className="wd-recipe-card-title px-6 py-2">
					<div>
						<p className="wd-recipe-title py-1">
							{recipe?.label}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
export default RecipeReviewCard;

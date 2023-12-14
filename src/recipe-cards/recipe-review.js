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

	const fetchReview = async () => {
		const review = await client.findCommentById(reviewId);
		setReview(review);
	};


	useEffect(() => {
		fetchReview();
		fetchRecipeById(review.recipeId).then((recipe) => {
			setRecipe(recipe);
		});
	}, []);


	return (
		<div className="container wd-recipe-card my-0 p-0">
			<div className="p-6 ">
				<Link to={`/profile/${review.user.username}`}><span className="inline-block wd-user-icon pb-3">
					<FaUserCircle /> @{review.user.username}
				</span> </Link>
				<span className="float-right text-xs italic text-stone-500 ">Posted {review.created}</span>
				<p>{review.text}</p>
			</div>
			<Link to={`/recipe/${recipe.id}`}>
				<div className="m-0 p-0 wd-review-img-container">
					<img src={recipe.image} alt={recipe.label}></img>
				</div>

				<div className="wd-recipe-card-title px-6 py-2">
					<div>
						<p className="wd-recipe-title py-1">
							{recipe.label}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
export default RecipeReviewCard;

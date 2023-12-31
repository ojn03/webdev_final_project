import { React, useState, useEffect } from "react";
import "../styles/global-styles.css";
import "./recipe-styles.css";
import { IoClose } from "react-icons/io5";
import ReviewNoRecipeCard from "../recipe-cards/review-no-recipe";
import * as client from "../client.js";

function RecipeReviewList({ recipeId, closeFunc }) {
	const [currReview, setCurrReview] = useState("");
	const [account, setAccount] = useState(null);
	const [reviews, setReviews] = useState(null);

	const fetchAccount = async () => {
		try {
			const account = await client.account();
			setAccount(account);
		}
		catch (error) {
			console.log(error);
		}
	};

	const fetchReviews = async () => {
		const reviews = await client.findCommentsByRecipeId(recipeId);
		setReviews(reviews);
	};

	const addReview = async () => {
		// add a new review using the current user logged in and the value of currReview
		console.log("addReview", currReview);
		await client.createComment({ text: currReview, authorId: account._id, recipeId: recipeId });
		document.getElementById("enter-review-box").value = "";
		setCurrReview("");
		fetchReviews();
	};

	useEffect(() => {
		fetchAccount();
		fetchReviews();
	}, []);

	return (
		<div className="fixed wd-review-popup-bg">
			<div className="fixed bg-white wd-review-popup">
				<div
					className="float-right p-4 pt-3 hover:cursor-pointer text-2xl text-stone-600 hover:text-stone-400"
					onClick={() => closeFunc()}>
					<IoClose />
				</div>
				<h2 className="wd-sub-title m-6">Reviews</h2>
				<hr className="w-9/10 mx-8 border-stone-400"></hr>
				<div className="overflow-y-auto wd-review-scroll w-full h-full">
					{/* if chef, show this so they can leave a review */}
					{account && account.type === "Chef" && <div><textarea
						id="enter-review-box"
						rows={4}
						className="w-full wd-leave-review ring-0 p-2"
						onChange={(e) =>
							
							setCurrReview(e.target.value)
						
							
						}></textarea>
					<div className="float-right wd-btn-bar">
						<button
							className="wd-btn wd-btn-success"
							onClick={() => addReview()}>
							Submit
						</button>
					</div></div>}
					{/* end chef-only area */}

					{/* map through reviews */}
					{reviews && reviews.map((review) => <ReviewNoRecipeCard reviewId={review._id} key={review._id} />)}
				</div>
			</div>
		</div>
	);
}
export default RecipeReviewList;

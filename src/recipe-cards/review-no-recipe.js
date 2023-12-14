import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/global-styles.css";
import "./recipe-cards.css";
import { FaUserCircle } from "react-icons/fa";
import * as client from "../client.js";

function ReviewNoRecipeCard({ reviewId }) {
	const [review, setReview] = useState(null);

	const fetchReview = async () => {
		const review = await client.findCommentById(reviewId);
		setReview(review);
	};

	useEffect(() => {
		fetchReview();
	}, []);

	return (
		<div className="container wd-no-recipe-card my-0 p-0">
			<div className="p-6 ">
				<Link to={`/profile/${review.user.username}`}><span className="inline-block wd-user-icon pb-3">
					<FaUserCircle /> @{review.user.username}
				</span> </Link>
				<span className="float-right text-xs italic text-stone-500 ">Posted {review.created}</span>
				<p>{review.text}</p>
			</div>
		</div>
	);
}
export default ReviewNoRecipeCard;
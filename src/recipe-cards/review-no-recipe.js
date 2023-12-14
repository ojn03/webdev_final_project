import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/global-styles.css";
import "./recipe-cards.css";
import { FaUserCircle } from "react-icons/fa";
import * as client from "../client.js";

function ReviewNoRecipeCard({ reviewId }) {
	const [review, setReview] = useState(null);
	const [user, setUser] = useState(null);
	const fetchReview = async () => {
		const review = await client.findCommentById(reviewId);
		setReview(review);
	};

	useEffect(() => {
		fetchReview();
		console.log("review", review);
	}, []);

	useEffect(() => {
		if (!review) return;
		fetchUser();
		console.log("user", user);
	}, [review]);

	const fetchUser = async () => {
		const user = await client.findUserById(review.authorId);
		console.log("user", user);
		setUser(user);
	};

	if (!review) {
		return <div>Loading...</div>;
	}

	console.log("review", review);
	const dateTime = new Date(review.createdAt).toLocaleString();

	return (
		<div className="container wd-no-recipe-card my-0 p-0">
			<div className="p-6 ">
				<Link to={`/profile/${review.authorId}`}>
					<span className="inline-block wd-user-icon pb-3">
						<FaUserCircle /> @ {user?.username}
					</span>
				</Link>
				<br />

				<span className="float-left text-xs italic text-stone-500 ">
					Posted {dateTime}
				</span>
				<br />
				<p>{review.text}</p>
			</div>
		</div>
	);
}
export default ReviewNoRecipeCard;

import { React } from "react";
import { Link } from "react-router-dom";
import "../styles/global-styles.css";
import "./recipe-cards.css";
import { FaUserCircle } from "react-icons/fa";

function RecipeReviewCard({reviewId}) {
	let dummyUsername = "the_best_chef";
	let dummyProfPic = <FaUserCircle />;
	let dummyRecipeTitle = "Creamy Mashed Potatoes";
	let dummyImgUrl =
		"https://www.allrecipes.com/thmb/JMkfc1WFQiiKmTzvz98IXhlOMsg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/24771-basic-mashed-potatoes-mfs321-158e1626bfeb48daadb4f25d737ffee91-912ba4ee2c3c40a1837a5690971cc554.jpg";
	let link = 1;
    let link2 = 2;
	let dummyReview =
		"This recipe is my go to on a busy weekday night! My kids love it, and I love how easy it is to make. The butter gives it the kind of richness that you get from a restaurant, and the herbs add an extra kick of flavor!";
        let dummyDate="10/15/2023";

	return (
		<div className="container wd-recipe-card my-0 p-0">
			<div className="p-6 ">
				<Link  to={`/profile/${link2}`}><span className="inline-block wd-user-icon pb-3">
					{dummyProfPic} @{dummyUsername}
				</span> </Link>
                <span className="float-right text-xs italic text-stone-500 ">Posted {dummyDate}</span>
				<p>{dummyReview}</p>
			</div>
			<Link to={`/recipe/${link}`}>
				<div className="m-0 p-0 wd-review-img-container">
					<img src={dummyImgUrl} alt="test"></img>
				</div>

				<div className="wd-recipe-card-title px-6 py-2">
					<div>
						<p className="wd-recipe-title py-1">
							{dummyRecipeTitle}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
export default RecipeReviewCard;

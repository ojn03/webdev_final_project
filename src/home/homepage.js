import { React} from "react";
import "../styles/global-styles.css";
import LikedRecipeCard from "../recipe-cards/liked-recipe";
import RecipeCard from "../recipe-cards/recipe-card";
import RecipeReviewCard from "../recipe-cards/recipe-review";
import ReviewNoRecipeCard from "../recipe-cards/review-no-recipe";

function Home() {

    let dummyRecipeTitle = "Creamy Mashed Potatoes";
    let dummyImgUrl = "https://www.allrecipes.com/thmb/JMkfc1WFQiiKmTzvz98IXhlOMsg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/24771-basic-mashed-potatoes-mfs321-158e1626bfeb48daadb4f25d737ffee91-912ba4ee2c3c40a1837a5690971cc554.jpg";

    
  return (
    <div className="w-full mx-auto">
        {/* <h1 className="text-black">Home</h1> */}
       <LikedRecipeCard recipeId="" likedDate="" />
       <RecipeCard recipeId=""/>
       <RecipeReviewCard reviewId=""/>
       <ReviewNoRecipeCard reviewId=""/>
       {/* TODO: get list of liked recipes andn reviews from followed chefs, order them from newst to oldest, then display them as either LikedRecipeCards or RecipeReviewCards */}
    </div>
  );
}
export default Home;
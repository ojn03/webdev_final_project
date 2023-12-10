import React, { useState } from "react";
import "../styles/global-styles.css";
import { fetchRecipe } from "./recipe-service";
import { Button, Card } from 'react-bootstrap';
import RecipePreview from "./recipe_preview";

function Search() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFetchRecipe = async () => {
    try {
      const result = await fetchRecipe(searchTerm); // Assuming you have a fetchRecipe function
      console.log(result)
      setData(result || []);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type here..."
        value={searchTerm}
        onChange={handleInputChange}
        className="form-control mb-3"
      />
      <Button onClick={handleFetchRecipe} variant="primary" className="mb-3">
        Fetch Recipe
      </Button>
      <div className="row">
        {data.hits &&
          data.hits.map((hit, index) => (
            <RecipePreview apiResult={hit} />
          ))}
      </div>
    </div>
  )
}

export default Search;

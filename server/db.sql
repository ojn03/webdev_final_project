-- Postgres SQL
CREATE TABLE "User"(
    "user_id" serial PRIMARY KEY,
    "first" varchar(50) NOT NULL,
    "last" varchar(50) NOT NULL,
    "email" varchar(100) UNIQUE NOT NULL,
    "username" varchar(50) UNIQUE NOT NULL,
    "password" varchar(250) NOT NULL
);

CREATE TABLE "Recipe"(
    "recipe_id" serial PRIMARY KEY,
    "description" varchar(250),
    -- "likes" int NOT NULL DEFAULT 0,
);

CREATE TABLE "Ingredients"(
    "ingredient_id" serial PRIMARY KEY,
    "name" varchar(50) NOT NULL,
    "dollarCost" float,
);

CREATE TABLE "Recipe_Ingredients"(
    "recipe_id" int NOT NULL REFERENCES "Recipe"(recipe_id),
    "user_id" int NOT NULL REFERENCES "User"(user_id),
    PRIMARY KEY ('recipe_id', "user_id")
);

CREATE TABLE "Likes"(
    "user_id" int NOT NULL REFERENCES "User"(user_id),
    "recipe_id" int NOT NULL REFERENCES "Recipe"(recipe_id),
);

CREATE TABLE "Follows"(
    "followee" int NOT NULL REFERENCES "User"(user_id),
    "follower" int NOT NULL REFERENCES "User"(user_id),

    -- ensures someone cant follow themselves
    CHECK ("followee" <> "follower"),
);

-- todo queries and procdeures
-- add/remove a user
-- add a recipe
-- add ingredients


-- un/follow a person


-- get followers
-- get recipes liked by a person
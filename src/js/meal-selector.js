import { getCategories, getAreas, renderWithTemplate, getRecipesByAreaAndCategory, getLocalStorage, setLocalStorage, getMealById } from './utils.mjs';

// populate the selectors
async function selectorOptionsTemplate() {
    const category = document.getElementById("category");
    const area = document.getElementById("area");

    let categoryOptions = `<option value="" disabled selected hidden>Select One</option>`;
    let areaOptions = `<option value="" disabled selected hidden>Select One</option>`;

    try {
        const categories = await getCategories();
        const areas = await getAreas();

        for (let i = 0; i < categories.meals.length; i++) {
            categoryOptions += `<option value="${categories.meals[i].strCategory}" required>${categories.meals[i].strCategory}</option>`;
        }

        for (let i = 0; i < areas.meals.length; i++) {
            areaOptions += `<option value="${areas.meals[i].strArea}" required>${areas.meals[i].strArea}</option>`;
        }
    
        renderWithTemplate(categoryOptions, category);
        renderWithTemplate(areaOptions, area);
    
    } catch (error) {
        console.error('Error:', error);
    }
}

// create the list when the "Get Meal Ideas" button is clicked
export async function createList(area, category) {
    const recipes = await getRecipesByAreaAndCategory(area, category);
    const recipeList = document.getElementById("recipe-list");
    let listItems = ``;

    // Clear the element when initially called
    recipeList.innerHTML='';

    try {
        if (recipes.length == 0) {
            listItems = `<p class="notice">Sorry, no recipes match your search parameters.</p>`
        } else {
            listItems = `<h1>Recipes</h1>`
            for (let i = 0; i < recipes.length && i <= 10; i++) {
                listItems += `<div class="recipe-card">
                <a href="recipe_pages/index.html?recipe=${recipes[i].meals[0].idMeal}">
                <img src="${recipes[i].meals[0].strMealThumb}" alt="Image of ${recipes[i].meals[0].strMeal}">
                <h3>${recipes[i].meals[0].strMeal}</h3>
                </a>
                <span class="mealID" hidden>${recipes[i].meals[0].idMeal}</span>
                <button class="add-meals" type="submit" value="submit">Add To Meal Plan</button>
            </div>`;
            }    
        }
        renderWithTemplate(listItems, recipeList);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add the items to the meal plan section
export async function addToMealPlan(mealID) {
    let mealPlan = await getLocalStorage("mealPlan");

    if (mealPlan != null) {
        mealPlan.push(mealID);
        setLocalStorage("mealPlan", mealPlan);
    } else {
        mealPlan = mealID;
        setLocalStorage("mealPlan", Array(mealPlan));
    }
}

// Remove items from the meal plan section
export async function removeFromMealPlan(mealID) {
    let mealPlan = await getLocalStorage("mealPlan");
    const index = mealPlan.indexOf(mealID)

    if (mealPlan != null) {
        if (index > - 1) {
            mealPlan.splice(index, 1);
        }
        setLocalStorage("mealPlan", mealPlan);
    } else {
        return
    }
}

// Create the meal plan section
export async function createMealPlan() {
    try {
        let mealPlanItems = await getLocalStorage("mealPlan");
        const mealPlanElement = document.getElementById("meal-plan");

        mealPlanElement.innerHTML='';

        let mealPlan = "<h1>My Meal Plan</h1>";

        if (mealPlanItems != null && mealPlanItems.length > 0) {
            for(let i=0; i < mealPlanItems.length; i++) {
                let meal = await getMealById(mealPlanItems[i]);
                mealPlan += `<div class="meal-card">
                <a href="recipe_pages/index.html?recipe=${meal.meals[0].idMeal}">
                <img src="${meal.meals[0].strMealThumb}" alt="Image of ${meal.meals[0].strMeal}">
                <h3>${meal.meals[0].strMeal}</h3>
                </a>
                <span class="mealID" hidden>${meal.meals[0].idMeal}</span>
                <button class="remove-meals" type="submit" value="submit">Remove From Meal Plan</button>
                <button class="favorite-meals" type="submit" value="submit">Favorite this Meal</button>
                </div>`
            }

        } else {
            mealPlan += `<p class="notice">You do not currently have any items in your meal plan.</p>`;
        }

        renderWithTemplate(mealPlan, mealPlanElement)
    } catch (error) {
        console.error('Error:', error);
    }
}

selectorOptionsTemplate();
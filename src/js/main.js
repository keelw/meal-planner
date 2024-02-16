import { loadHeaderFooter } from "./utils.mjs";
import { createList } from "./meal-selector";

const getMeals = document.getElementById("get-meals");
const form = document.getElementById("meal-picker");

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const categoryValue = document.getElementById("category").value;
    const areaValue = document.getElementById("area").value;

    createList(categoryValue, areaValue);
});

loadHeaderFooter();
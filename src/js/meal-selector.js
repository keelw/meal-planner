import { getCategories, getAreas, renderWithTemplate } from './utils.mjs';

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

export async function createList(category, area) {
    console.log(category);
    console.log(area);
}

selectorOptionsTemplate();
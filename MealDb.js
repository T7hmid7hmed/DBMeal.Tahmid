async function connect() {
    const query = document.getElementById("searchBox").value.trim();
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = "";

    if (!query) {
        displayArea.textContent = "Please enter a meal or food title.";
        return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.meals) {
            displayArea.textContent = "No meals found. Try another search term.";
            return;
        }

        data.meals.forEach((meal) => {
            const card = document.createElement("div");
            card.className = "meal-card";

            const title = document.createElement("h4");
            title.textContent = meal.strMeal;

            const img = document.createElement("img");
            img.src = meal.strMealThumb;
            img.alt = meal.strMeal;
            img.loading = "lazy";

            card.appendChild(title);
            card.appendChild(img);
            displayArea.appendChild(card);
        });
    } catch (error) {
        displayArea.textContent = "Could not load meals right now.";
        console.error(error);
    }
}
document.getElementById('searchBtn').addEventListener('click', function() {
    const ingredients = document.getElementById('ingredient').value;
    fetch(`/search?ingredients=${encodeURIComponent(ingredients)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            if (data.length === 0) {
                resultsDiv.innerHTML = '<p>No recipes found.</p>';
            } else {
                data.forEach(recipe => {
                    resultsDiv.innerHTML += `
                        <div class="recipe-card">
                            <h3>${recipe['name']}</h3>
                            <img src="${recipe['image_url']}" alt="${recipe['name']}">
                            <p><strong>Description:</strong> ${recipe['description']}</p>
                            <p><strong>Diet:</strong> ${recipe['diet']}</p>
                            <p><strong>Cuisine:</strong> ${recipe['cuisine']}</p>
                            <p><strong>Course:</strong> ${recipe['course']}</p>
                            <p><strong>Prep Time:</strong> ${recipe['prep_time']} minutes</p>
                            <p><strong>Ingredients:</strong> ${recipe['ingredients']}</p>
                            <p><strong>Instructions:</strong> ${recipe['instructions']}</p>
                        </div>
                    `;
                });
            }
        });
});

document.getElementById('viewAllBtn').addEventListener('click', function() {
    fetch('/list')
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            data.forEach(recipe => {
                resultsDiv.innerHTML += `
                    <div class="recipe-card">
                        <h3>${recipe['name']}</h3>
                        <p><strong>Description:</strong> ${recipe['description']}</p>
                    </div>
                `;
            });
        });
});

document.getElementById('listIngredientsBtn').addEventListener('click', function() {
    fetch('/ingredients')
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            if (data.length === 0) {
                resultsDiv.innerHTML = '<p>No ingredients found.</p>';
            } else {
                resultsDiv.innerHTML += '<h3>Ingredients:</h3><ul>';
                data.forEach(ingredient => {
                    resultsDiv.innerHTML += `<li>${ingredient}</li>`;
                });
                resultsDiv.innerHTML += '</ul>';
            }
        });
});

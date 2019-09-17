const suggestCulturalGoods = () => {

	function findMovies(event) {
	    const url = `https://api.themoviedb.org/3/search/movie?api_key=263e31d1ad0c4defa8822787e614e716&language=en-US&query=${event.value}&page=1&include_adult=false`;
	    if (event.value) {
		    fetch(url)
		      .then(blob => blob.json())
		      .then(data => displayCulturalGoods(data));
	    } else {
	    	suggestions.innerHTML = "";
	    }
	}

	function displayCulturalGoods(data) {
	  	const moviesArray = []
		  	data.results.forEach(result => moviesArray.push(result.original_title))
		  	const html = moviesArray.map(movie => {
			    return `
			      <li class="movie">
			        <span>${movie}</span>
			      </li>
			    `;
		  	}).join('');
		  	suggestions.innerHTML = html;

		function selectCulturalGood() {
			const movies = document.querySelectorAll(".movie");
			if (movies) {
				movies.forEach(movie => {
					movie.addEventListener("click", e => {
					titleInput.value = e.currentTarget.innerText;
					suggestions.innerHTML = "";
					});
				});
			}
		}
		selectCulturalGood();
	}

	const typeInput = document.querySelector("#memory_cultural_good_attributes_cultural_type");
	const titleInput = document.querySelector("#memory_cultural_good_attributes_title");
	const suggestions = document.querySelector('.suggestions');

	if (titleInput) {
		titleInput.addEventListener("keyup", function() {
			if (typeInput.value == "Cinema") { findMovies(this) };
		})	 
	}
}

export {suggestCulturalGoods};

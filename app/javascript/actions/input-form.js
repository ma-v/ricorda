const suggestCulturalGoods = () => {

	function findMovies(event) {
	    const url = `https://api.themoviedb.org/3/search/movie?api_key=263e31d1ad0c4defa8822787e614e716&language=en-US&query=${event.value}&page=1&include_adult=false`;
	    if (event.value) {
		    fetch(url)
		      .then(blob => blob.json())
		      .then(data => displayMovies(data));
	    } else {
	    	suggestions.innerHTML = "";
	    }
	}

	function displayMovies(data) {
	  	const movies = [];
		data.results.forEach(result => {
			movies.push({title: result.original_title, id: result.id});
		});
		const html = movies.map(movie => {
		    return `
		      <li class="movie-title" data-id="${movie.id}">
		        <span>${movie.title}</span>
		      </li>
		    `;
	  	}).join('');
		suggestions.innerHTML = html;

		function selectMovie() {
			const movieTitles = document.querySelectorAll(".movie-title");
			if (movieTitles) {
				movieTitles.forEach(title => {
					title.addEventListener("click", e => {
					titleInput.value = e.currentTarget.innerText;
					suggestions.innerHTML = "";
					});
				});
			}
		}
		selectMovie();
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

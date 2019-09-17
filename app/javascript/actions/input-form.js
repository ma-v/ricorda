const suggestMovies = () => {

	function findMovies() {
	    const url = `https://api.themoviedb.org/3/search/movie?api_key=263e31d1ad0c4defa8822787e614e716&language=en-US&query=${this.value}&page=1&include_adult=false`;
	    if (this.value) {
		    fetch(url)
		      .then(blob => blob.json())
		      .then(data => displayMovies(data));
	    } else {
	    	suggestions.innerHTML = "";
	    }
	}

	function displayMovies(data) {
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

	function selectMovie() {
		const movies = document.querySelectorAll(".movie");
		if (movies) {
			movies.forEach(movie => {
				movie.addEventListener("click", e => {
				console.log("we're in")
				titleInput.value = e.currentTarget.innerText;
				suggestions.innerHTML = "";
				});
			});
		}
	}
	selectMovie();


	}

	const titleInput = document.querySelector("#memory_cultural_good_attributes_title");
	const suggestions = document.querySelector('.suggestions');

	if (titleInput) {
	    titleInput.addEventListener("keyup", findMovies);
	}
}

export {suggestMovies};
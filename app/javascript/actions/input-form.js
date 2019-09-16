const suggestMovies = () => {

	const findMovies = (wordToMatch) => {
		const url = `https://api.themoviedb.org/3/search/movie?api_key=263e31d1ad0c4defa8822787e614e716&language=en-US&query=${wordToMatch}&page=1&include_adult=false`
		const movies = [];
		fetch(url)
		  .then(blob => blob.json())
		  .then(data => data.results.forEach(result => movies.push(result.original_title)));
		return movies;
	}

	function displayMovies() {
	  const moviesArray = findMovies(this.value);
	  const html = moviesArray.map(movie => {
	    return `
	      <li>
	        <span class="movie">${movieName}</span>
	      </li>
	    `;
	  });
	  suggestions.innerHTML = html;
	}
	
	const titleInput = document.querySelector("#memory_cultural_good_attributes_title");
	const suggestions = document.querySelector('.suggestions');

	if (titleInput) {
		titleInput.addEventListener("keyup", displayMovies);
	}
}

export {suggestMovies};
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
			movies.push({title: result.original_title, id: result.id, genre_id: result.genre_ids[0], year: result.release_date.slice(0,4)});
		});
		const html = movies.map(movie => {
		    return `
		      <li class="movie-title" data-id="${movie.id}" data-title="${movie.title}" data-genre="${movie.genre_id}">
		        <span>${movie.title} - ${movie.year}</span>
		      </li>
		    `;
	  	}).join('');
		suggestions.innerHTML = html;

		function selectMovie() {
			const movieTitles = document.querySelectorAll(".movie-title");
			if (movieTitles) {
				movieTitles.forEach(title => {
					title.addEventListener("click", e => {
					titleInput.value = e.currentTarget.dataset.title;
					mdbIdInput.value = e.currentTarget.dataset.id;
					suggestions.innerHTML = "";
					findDirector(e.currentTarget.dataset.id);
					findThematics(e.currentTarget.dataset.genre[0])
					});
				});
			}
		}
		selectMovie();

		function findDirector(id) {
			const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=263e31d1ad0c4defa8822787e614e716`
			fetch(url)
		      .then(blob => blob.json())
		      .then(data => {
		      	creatorInput.value = (data.crew.find(movie => movie.department === "Directing").name);
		  	})
		}

		function findThematics(id) {
			const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=263e31d1ad0c4defa8822787e614e716&language=fr-FR";
			fetch(url)
				.then(blob => blob.json())
				.then(data => {
					data.find(genre => {
						genre.id == id
					})
				})
		}
	}

	const typeInput = document.querySelector("#memory_cultural_good_attributes_cultural_type");
	const titleInput = document.querySelector("#memory_cultural_good_attributes_title");
	const mdbIdInput = document.querySelector("#memory_cultural_good_attributes_movie_db_id");
	const creatorInput = document.querySelector("#memory_cultural_good_attributes_creator_attributes_name");
	const suggestions = document.querySelector('.suggestions');

	if (titleInput) {
		titleInput.addEventListener("keyup", function() {
			if (typeInput.value == "Cinema") { findMovies(this) };
		})
	}
}

export {suggestCulturalGoods};

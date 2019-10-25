const suggestCulturalGoods = () => {

	//CINEMA
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
					creatorInput.removeAttribute("disabled");
					thematicInput.removeAttribute("disabled");
					findMovieDirector(e.currentTarget.dataset.id);
					findMovieThematics(e.currentTarget.dataset.genre);
					creatorInput.setAttribute("disabled", true);
					thematicInput.setAttribute("disabled", true);
					});
				});
			}
		}
		selectMovie();

		function findMovieDirector(id) {
			const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=263e31d1ad0c4defa8822787e614e716`
			fetch(url)
		      .then(blob => blob.json())
		      .then(data => {
		      	creatorInput.value = (data.crew.find(movie => movie.department === "Directing").name);
		  	})
		}

		function findMovieThematics(id) {
			const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=263e31d1ad0c4defa8822787e614e716&language=fr-FR";
			fetch(url)
					.then(blob => blob.json())
					.then(data => {
						thematicInput.value = (data.genres.find(genre => genre.id === parseInt(id)).name);
					})
		}
	}


	//TV SHOWS
	function findTvShows(event) {
	    const url = `https://api.themoviedb.org/3/search/tv?api_key=263e31d1ad0c4defa8822787e614e716&language=en-US&query=${event.value}&page=1&include_adult=false`;
	    if (event.value) {
		    fetch(url)
		      .then(blob => blob.json())
		      .then(data => displayTvShows(data));
	    } else {
	    	suggestions.innerHTML = "";
	    }
	}

		function displayTvShows(data) {
	  	const tvShows = [];
			data.results.forEach(result => {
				tvShows.push({name: result.original_name, id: result.id, genre_id: result.genre_ids[0], year: result.first_air_date.slice(0,4)});
			});
			const html = tvShows.map(show => {
		    return `
		      <li class="show-name" data-id="${show.id}" data-name="${show.name}" data-genre="${show.genre_id}">
		        <span>${show.name} - ${show.year}</span>
		      </li>
		    `;
	  	}).join('');
			suggestions.innerHTML = html;

		function selectTvShow() {
			const showName = document.querySelectorAll(".show-name");
			if (showName) {
				showName.forEach(name => {
					name.addEventListener("click", e => {
					titleInput.value = e.currentTarget.dataset.name;
					mdbIdInput.value = e.currentTarget.dataset.id;
					suggestions.innerHTML = "";
					creatorInput.removeAttribute("disabled");
					thematicInput.removeAttribute("disabled");
					findTvShowDirector(e.currentTarget.dataset.id);
					findTvShowThematics(e.currentTarget.dataset.genre);
					creatorInput.setAttribute("disabled", true);
					thematicInput.setAttribute("disabled", true);
					});
				});
			}
		}
		selectTvShow();

		function findTvShowDirector(id) {
			const url = `https://api.themoviedb.org/3/tv/${id}/season/1/credits?api_key=263e31d1ad0c4defa8822787e614e716`
			fetch(url)
		      .then(blob => blob.json())
		      .then(data => {
					if (data.crew.find(show => show.job === "Executive Producer")) {
						creatorInput.value = (data.crew.find(show => show.job === "Executive Producer").name);
					} else {
						creatorInput.value = "Unknown";
					}
		  	})
		}

		function findTvShowThematics(id) {
			const url = "https://api.themoviedb.org/3/genre/tv/list?api_key=263e31d1ad0c4defa8822787e614e716&language=fr-FR";
			fetch(url)
					.then(blob => blob.json())
					.then(data => {
						thematicInput.value = (data.genres.find(genre => genre.id === parseInt(id)).name);
					})
		}
	}

	//BOOKS
	function findBooks(event) {
	    const url = `https://www.googleapis.com/books/v1/volumes?q=${event.value}&orderBy=relevance`;
	    if (event.value) {
		    fetch(url)
		      .then(response => response.json())
		      .then(data => displayBooks(data));
	    } else {
	    	suggestions.innerHTML = "";
	    }
	}

	function displayBooks(data) {
	  	const books = [];
			data.items.forEach(item => {
				books.push({
					title: item.volumeInfo.title,
					author: (item.volumeInfo.authors ? item.volumeInfo.authors[0] : "Unknown Author"),
					id: item.id,
					category: (item.volumeInfo.categories ? item.volumeInfo.categories[0] : "No Category"),
					year: item.volumeInfo.publishedDate.slice(0,4)
				});
			});
			const html = books.map(book => {
		    return `
		      <li class="book-title" data-id="${book.id}" data-title="${book.title}" data-category="${book.category}" data-author="${book.author}">
		        <span>${book.title} - ${book.author} -${book.year}</span>
		      </li>
		    `;
	  	}).join('');
		suggestions.innerHTML = html;

		function selectBook() {
			const bookTitle = document.querySelectorAll(".book-title");
			if (bookTitle) {
				bookTitle.forEach(title => {
					title.addEventListener("click", e => {
					titleInput.value = e.currentTarget.dataset.title;
					suggestions.innerHTML = "";
					creatorInput.removeAttribute("disabled");
					thematicInput.removeAttribute("disabled");
					creatorInput.value = e.currentTarget.dataset.author;
					thematicInput.value = e.currentTarget.dataset.category;
					creatorInput.setAttribute("disabled", true);
					thematicInput.setAttribute("disabled", true);
					});
				});
			}
		}
		selectBook();
	}

	const switchCulturalType = () => {
		if (thematicInput.getAttribute("disabled") === "true") {
			thematicInput.removeAttribute("disabled");
		}
		if (creatorInput.getAttribute("disabled") == "true") {
			creatorInput.removeAttribute("disabled");
		}
		titleInput.value = "";
		creatorInput.value = "";
		thematicInput.value = "";
	}

	const typeInput = document.querySelector("#memory_cultural_good_attributes_cultural_type");
	const titleInput = document.querySelector("#memory_cultural_good_attributes_title");
	const mdbIdInput = document.querySelector("#memory_cultural_good_attributes_movie_db_id");
	const creatorInput = document.querySelector("#memory_cultural_good_attributes_creator_attributes_name");
	const thematicInput = document.querySelector("#memory_cultural_good_attributes_thematic");
	const suggestions = document.querySelector('.suggestions');

	if (typeInput) {
		typeInput.addEventListener("change", switchCulturalType)
	}

	if (titleInput) {
		titleInput.addEventListener("keyup", function() {
			if (typeInput.value == "Cinema") { findMovies(this) };
			if (typeInput.value == "TV Show") { findTvShows(this) };
			if (typeInput.value == "Book") { findBooks(this) };
		})
	}
}

export {suggestCulturalGoods};

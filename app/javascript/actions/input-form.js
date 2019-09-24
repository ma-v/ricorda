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
	  	const titlesArray = [];
	  	const creatorsArray = [];
		data.results.forEach(result => {
			titlesArray.push(result.original_title);
		});
		const html = titlesArray.map(title => {
		    return `
		      <li class="cultural-good-title">
		        <span>${title}</span>
		      </li>
		    `;
	  	}).join('');
		suggestions.innerHTML = html;

		function selectCulturalGood() {
			const culturalGoodTitles = document.querySelectorAll(".cultural-good-title");
			if (culturalGoodTitles) {
				culturalGoodTitles.forEach(title => {
					title.addEventListener("click", e => {
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
	const mdbIdInput = document.querySelector("#memory_cultural_good_attributes_movie_db_id");
	const suggestions = document.querySelector('.suggestions');

	if (titleInput) {
		titleInput.addEventListener("keyup", function() {
			if (typeInput.value == "Cinema") { findMovies(this) };
		})	 
	}
}

export {suggestCulturalGoods};

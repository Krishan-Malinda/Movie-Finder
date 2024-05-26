document.addEventListener("DOMContentLoaded", function () {

    const searchBtn = document.getElementById('searchBtn');

    searchBtn.onclick = async () => {

        console.clear();
        const inputBox = document.getElementById('inputBox').value;

        const container = document.getElementById('container');
        container.style.display = 'flex';
        container.innerHTML = '';

        const noResultBox = document.getElementById('noResultBox');

        console.log(inputBox);

        const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${inputBox}?exact=true&titleType=movie`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '65b6853292msh617bacfd44623fcp10ddb4jsnf2ec433baacc',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            if (result.entries === 0) {

                noResultBox.style.display = 'flex';

            } else {

                noResultBox.style.display = 'none';
                
                result.results.map((movie) => {
                    console.log(movie.id, '\n');
                    const img = document.createElement('img');
                    const movieTitle = document.createElement('span');

                    const subcontent = document.createElement('div');
                    subcontent.style.display = 'flex';
                    subcontent.style.flexDirection = 'column';
                    subcontent.style.justifyContent = 'start';
                    subcontent.style.alignItems = 'center';
                    subcontent.style.margin = '5px';
                    subcontent.style.paddingBottom = '5px';
                    subcontent.style.backgroundColor = 'rgb(209, 209, 209)';
                    subcontent.style.border = '2px solid rgb(80, 80, 80)';
                    subcontent.style.borderRadius = '10px';
                    subcontent.style.boxShadow = '5px 5px 20px 2px rgba(0, 0, 0, 0.5)';
                    subcontent.style.width = '265px';
                    subcontent.style.height = '410px';

                    const noImg = document.createElement('span');
                    noImg.style.color = 'red';
                    noImg.style.width = '200px';
                    noImg.style.margin = 'auto';
                    noImg.style.textAlign = 'center';
                    noImg.innerHTML = '';

                    var movieYear = '';
                    try{
                        movieYear = movie.releaseYear.year;
                    } catch {
                        movieYear = 'N/A';
                    }

                    movieTitle.textContent = `${movie.originalTitleText.text} (${movieYear})`;
                    movieTitle.style.justifyContent = 'inline-start';
                    movieTitle.style.padding = '5px';

                    try {
                        img.src = movie.primaryImage.url;
                        img.style.width = '250px';
                        img.style.height = '372px';
                        img.style.borderRadius = '10px';
                    } catch {
                        console.log(`The poster of movie id: ${movie.id}, is not available!`);
                        noImg.textContent = `The poster of this movie, is not available!`;
                    }

                    subcontent.appendChild(movieTitle);
                    subcontent.appendChild(img);
                    subcontent.appendChild(noImg);
                    container.appendChild(subcontent);
                });
            }

        } catch (error) {
            console.error(error);
        }
    }  
})
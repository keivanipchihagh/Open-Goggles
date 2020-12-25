function search_phrase()
{   
    document.getElementById('feedback').style.display = 'none'
    document.getElementById('phrase').classList.remove('is-invalid')

    // Formatted search phrase
    var search_phrase = document.getElementById('phrase').value.replaceAll(' ', '+').toLowerCase()
    var result = null

    var xmlHttp = new XMLHttpRequest();
    success = false
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            success = true
            result = xmlHttp.responseText
            
            if (result.includes('Incorrect IMDb ID')) {
                document.getElementById('phrase').classList.toggle('is-invalid')
                document.getElementById('feedback').style.display = 'block'
            } else {
                document.getElementById('phrase').classList.toggle('is-valid')
                process_result(result)
            }
        }
    }
    xmlHttp.open("GET", 'http://www.omdbapi.com/?apikey=' + document.getElementById('secret').value + '&t=' + search_phrase, true); // true for asynchronous 
    xmlHttp.send(null);    
}

function process_result(result) {
    result = JSON.parse(result)
    
    document.getElementById('Poster').src = result.Poster
    document.getElementById('Title').innerHTML = " <b>" + result.Title + "</b>"
    document.getElementById('Year').innerHTML = " <b>" + result.Year + "</b>"
    document.getElementById('Genre').innerHTML = " <b>" + result.Genre + "</b>"
    document.getElementById('Duration').innerHTML = " <b>" + result.Duration + "</b>"
    document.getElementById('Director').innerHTML = " <b>" + result.Director + "</b>"
    document.getElementById('Actors').innerHTML = " <b>" + result.Actors + "</b>"
    document.getElementById('Awards').innerHTML = " <b>" + result.Awards + "</b>"
    document.getElementById('Plot').innerHTML = " <b>" + result.Title + "</b>"
    document.getElementById('IMDB').innerHTML = result.Ratings[0].Value
    document.getElementById('RottenTomatoes').innerHTML = result.Ratings[1].Value
    document.getElementById('Metacritic').innerHTML = result.Ratings[2].Value

}
function search_phrase()
{   
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
            
            if (result.includes('Incorrect IMDb ID'))
                document.getElementById('phrase').classList.toggle('is-invalid')
            else {
                document.getElementById('phrase').classList.toggle('is-valid')
                process_result(result)
            }
        }
    }
    xmlHttp.open("GET", 'http://www.omdbapi.com/?apikey=' + document.getElementById('secret').value + '&t=' + search_phrase, true); // true for asynchronous 
    xmlHttp.send(null);    
}

function process_result(result) {
    result = JSON.parse(result);

    document.getElementById('phrase').value = result.Title;
    document.getElementById('Poster').src = result.Poster;

    document.getElementById('Title').innerHTML = "<b>" + result.Title + "</b>";
    document.getElementById('Rated').innerHTML = result.Rated;
    document.getElementById('Released').innerHTML = result.Released;
    document.getElementById('Genre').innerHTML = "&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;" + result.Genre;
    document.getElementById('Duration').innerHTML = "&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;" + duration_formatter(result.Runtime);

    document.getElementById('Language').innerHTML = "Language: <b>" + result.Language + "</b>";    
    document.getElementById('Writer').innerHTML = "Writer: <b>" + result.Writer + "</b>";
    document.getElementById('Director').innerHTML = "Director: <b>" + result.Director + "</b>";
    document.getElementById('Actors').innerHTML = "Stars: <b>" + actors_formatter(result.Actors) + "</b>";
    document.getElementById('Awards').innerHTML = "Awards: <b>" + result.Awards + "</b>";
    document.getElementById('Plot').innerHTML = result.Plot;

    document.getElementById('IMDB').innerHTML = "<b>" + result.Ratings[0].Value + "</b><br/>IMDB";
    document.getElementById('RottenTomatoes').innerHTML = "<b>" + result.Ratings[1].Value + "</b><br/>Rotten Tomatoes";
    document.getElementById('Metacritic').innerHTML = "<b>" + result.Ratings[2].Value + "</b><br/>Metacritic";
}

function duration_formatter(duration) {
    duration = duration.replace(' min', '');
    return Math.floor(duration / 60) + 'h ' + (duration % 60) + 'm';
}

function actors_formatter(actors) {
    actors = actors.split(', ');

    for (i = 0; i < actors.length; i++)
        actors[i] = "<a href='#' data-title='" + actors[i] + "' data-toggle='popover' data-trigger='focus' data-placement='top' data-content='Hi'>" + actors[i] + "</a> ";

        $(document).ready(function(){
            $('[data-toggle="popover"]').popover();   
        });

    return actors;
}
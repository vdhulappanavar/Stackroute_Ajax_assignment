function init(){
  apiKey = '4a9f640e502709dc6bcd23286de1426e';
  console.log("in init");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
        //document.getElementById("demo").innerHTML = xhttp.responseText;
        //console.log(xhttp.responseText)
        showUpcomingMovieData(JSON.parse(xhttp.responseText));
      }
  };
  xhttp.open("GET", `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&append_to_response=external_ids`, true);
  xhttp.send(); 
}

function createRow(data){
  let row = "";
  row += `<section class="row">`
  for(let i=0; i<3; i++){
    row+=`<article class="col-md-4"
              <div class="col-md-2">
                <img src=https://image.tmdb.org/t/p/w500/${data[i].poster_path}/>
              </div>
              <div class="col-md-2">
                results[i].titl
              </div>    
          </article>
    `
  }
  row+="<section>"
}
function showUpcomingMovieData(data){
  //console.log("inshowUpcomingMovieData" )
  //baseHTMLElement = <article class="col-md-3"><h3></h3></article>
  let divForUpcomingMovie = document.getElementById("upcomingMovieResult");
  console.log(data)
  if(data){    
    results = (data['results'])
    if(results){
      for(let i in results){
        //result = JSON.parse(results[i])
        console.log(typeof(results[i]))
        console.log(results[i])
        console.log(results[i].title)
        if(i%3 == 0){
          divForUpcomingMovie.innerHTML+='<section class="row">'
        }
        divForUpcomingMovie.innerHTML += '<article class="col-md-4 text-center">'+'<img class="col-md-2 hidden-sm" src="https://image.tmdb.org/t/p/w500/'+results[i].poster_path+'"/><p class="col-md-2 col-sm-4">'+results[i].title+"</p></article>";
        if(i%3 == 0){
          divForUpcomingMovie.innerHTML+='</section>'
        }
      }
      
    }
    else{
      divForUpcomingMovie.innerHTML = "Sorry No New Movies to show"
    }
  }
  else{
    divForUpcomingMovie .innerHTML = "Sorry Couldnt Fetch Data from Server"
    
  }
}

function showResults(){
  console.log("keyed UP")
  let searchBarInput = document.getElementById("searchInput").value;
  
  
  let selectForInput = document.getElementById("selectValueForInput").value;
  console.log(searchBarInput.value)
  console.log(selectForInput.value)
  apiKey = '4a9f640e502709dc6bcd23286de1426e';
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
        //document.getElementById("demo").innerHTML = xhttp.responseText;
        //console.log(xhttp.responseText)
        //showUpcomingMovieData(JSON.parse(xhttp.responseText));
        console.log("SEEEEEERCCHING");
        //console.log(xhttp.responseText);
        printSerchResults(JSON.parse(xhttp.responseText));
      }
  };
  let searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=`
  xhttp.open("GET", `${searchURL}${searchBarInput}`, true);
  xhttp.send();
  //console.log("")
  //searchResultsDiv
}

function printSerchResults(data){
  let len =9;
  results = (data['results'])
  let resultDiv = document.getElementById("searchResultsDiv");
  resultDiv.innerHTML += "<h1>Your Serch Results : </h1>"
  if(results.length < 10)
    len = length(results)
  console.log(data.length)
  for(let i=0;i<len;i++){
    console.log(i)
      if(i%3 == 0)
        resultDiv.innerHTML += '<div class="row">'
      resultDiv.innerHTML += '<div class="col-md-4">'+'<img class="col-md-2 hidden-sm" src="https://image.tmdb.org/t/p/w500/'+results[i].poster_path+'"/><p class="col-md-2 col-sm-4">'+results[i].title+"</p></article>";
      if(i%3 ==0)
        resultDiv.innerHTML += "</div>"
  }
}
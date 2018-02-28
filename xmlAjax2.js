function getlistele(data){
  return `
  <a href="#" class="list-group-item">
      <h4 class="list-group-item-heading">${data.title}</h4>
      <p class="list-group-item-text">WhatEver</p>
  </a>
  `
}

collection = [394117 , 353616]
function loadcollection(_collections , divName){
  let collectionList = document.getElementById(divName);
  for(i in _collections){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET" ,`https://api.themoviedb.org/3/movie/${_collections[i]}?api_key=4a9f640e502709dc6bcd23286de1426e&language=en-US` , true)
    xhttp.send()
    xhttp.onreadystatechange= function(){
      if(xhttp.readyState==4 && xhttp.status == 200){
        collectionList.innerHTML += getlistele(JSON.parse(xhttp.responseText))
      }
    }
  }
}
function foo2(id){
  console.log(id)
  //collection.push(id)
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", `https://api.themoviedb.org/3/movie/${id}?api_key=4a9f640e502709dc6bcd23286de1426e&language=en-US` , true)
  xhttp.send()
  xhttp.onreadystatechange = function(){
    console.log("readstaechange")
    if(xhttp.readyState==4 && xhttp.status==200){
      //foo1(JSON.parse(xhttp.responseText))
      let collectionList = document.getElementById("collectionList");
      collectionList.innerHTML += getlistele(JSON.parse(xhttp.responseText))
    }
  }
  
}

function showPopularMovieData(data){
  let divForUpcomingMovie = document.getElementById("popularMovieResult");
  console.log(data)
  if(data){    
    results = (data['results'])
    if(results){
      /*for(let i in results){
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
      }*/

      for(let i=0; i<results.length; i+=3){
        divForUpcomingMovie.innerHTML += createRow(results , i)
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
function toggleCarret(ele){
  eleClass = ele.className;
  //console.log(eleId)
  console.log(eleClass)
  console.log(eleClass=="glyphicon glyphicon-plus")
  if(eleClass=="glyphicon glyphicon-plus"){
      ele.className = "glyphicon glyphicon-minus"
  }
  if(eleClass=="glyphicon glyphicon-minus"){
    ele.className = "glyphicon glyphicon-plus"
}
}

function init(){
  collection = [394117 , 353616]
  let genresMap = {}
  loadcollection(collection , "collectionList")
  apiKey = '4a9f640e502709dc6bcd23286de1426e';
  console.log("in init");
  let xhttp = new XMLHttpRequest();
  let xhttp1 = new XMLHttpRequest();
  let xhttp2 = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
        //document.getElementById("demo").innerHTML = xhttp.responseText;
        //console.log(xhttp.responseText)
        showUpcomingMovieData(JSON.parse(xhttp.responseText));
      }
  };
  
  xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
        //document.getElementById("demo").innerHTML = xhttp.responseText;
        //console.log(xhttp.responseText)
        showPopularMovieData(JSON.parse(xhttp1.responseText));
      }
  };
  function getGenres(genres){
    if(genres.name == "Action" || genres.name == "Comedy" || genres.name == "Horror" || genres.name == "Music"){
      genresMap[genres.id] = genres.name
      xhttp3 = new XMLHttpRequest()
      xhttp3.open("GET" , `https://api.themoviedb.org/3/genre/${genres.id}/movies?api_key=4a9f640e502709dc6bcd23286de1426e&language=en-US&include_adult=false&sort_by=created_at.asc`)
      xhttp3.send()
      xhttp3.onreadystatechange = function(){console.log(genres)
        if(xhttp3.readyState === 4 && xhttp3.status == 200){
          //console.log(xhttp3.responseText)
          let _data = JSON.parse(xhttp3.responseText)
          //let divGenres = document.getElementById(_data.name)
          console.log(_data)
          //_data = _data["results"]
          console.log(_data.id)
          console.log(genresMap)
          console.log(genresMap[_data.id])
          let divGenres = document.getElementById(genresMap[_data.id])
          _data = _data["results"]
          console.log(_data)
          console.log()
          //let divGenres = document.getElementById(genres[i].name)
          for(i=0; i<_data.length;i+=3){
            divGenres.innerHTML += createRow(_data , i)
          }
        }
      }
    }}
  xhttp2.onreadystatechange = function(){
    
    if(this.readyState==4 && this.status == 200){
      genres = JSON.parse(xhttp2.responseText)
      console.log("in genres")
      console.log(genres['genres'])
      genres = genres['genres']
      for(i in genres){console.log("genres loop : " + i)
      getGenres(genres[i])
        
      }
    }
  }
  xhttp.open("GET", `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&append_to_response=external_ids`, true);
  xhttp1.open("GET",`http://api.themoviedb.org/3/discover/movie?%20%E2%86%B5%20sort_by=popularity.desc?&api_key=4a9f640e502709dc6bcd23286de1426e`,true)
  xhttp2.open("GET" , "https://api.themoviedb.org/3/genre/movie/list?api_key=4a9f640e502709dc6bcd23286de1426e&language=en-US" , true)
  xhttp1.send()
  xhttp.send(); 
  xhttp2.send()
}

function foo1(mdata){
  let modalData = document.getElementById("movieData1");
  
  data=`
        <h1 class="text-primary">${mdata['title']}</h1>
        <h3 class="text-success">Rating : ${mdata['vote_average']}</h3>
        <div class="text-center">
        </div>
  `
  modalData.innerHTML = data
}

function foo(data){
  console.log(data)
  document.getElementById("movieData").innerHTML = data;
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", `https://api.themoviedb.org/3/movie/${data}?api_key=4a9f640e502709dc6bcd23286de1426e&language=en-US` , true)
  xhttp.send()
  xhttp.onreadystatechange = function(){
    console.log("readstaechange")
    if(xhttp.readyState==4 && xhttp.status==200){
      foo1(JSON.parse(xhttp.responseText))
    }
  }
}

function showCollectionData(){
  console.log("sjow collection")
  console.log(collection)
  loadcollection(collection  , "collectionModalBody" )

}

function createRow(data , pos){
  console.log("createRow")
  //console.log(data[pos].poster_path)
  let row = "";
  row += `<section class="row">`
  for(let i=pos; i<pos+3; i++){
    console.log(i)
    //console.log(data[i].poster_path)
    //console.log(data[i].poster_path)
    console.log(data[i])
    //result = JSON.parse(data[i])
    if(data[i]){ console.log("inside if")
    console.log(data[i].poster_path)
      row+=`<article class="col-sm-4">
               <div class="panel panel-default panel-front">
                  <div class=" panel-heading">
                    <h4 class="panel-title"><img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}"/></h4>
                  </div>
                  <div class="panel-body">
                    <a onclick="foo(this.id)" id="${data[i].id}" data-toggle="modal" data-target="#myModal"><h3 class="text-primary">${data[i].title}</h3></a>
                    <h4>Rating : ${data[i].vote_average}</h4>
                  </div>  
                  <div class="panel-footer">
                      <button id="${data[i].id}"class="btn btn-danger" onclick="foo2(this.id)">+ Add</button>
                  </div>
                <div>  
            </article>
      `
      }
  }
  row+="<section>"
  return row;
}
function createRow1(data , pos){
  console.log("createRow")
  //console.log(data[pos].poster_path)
  let row = "";
  row += `<section class="row">`
  
    console.log(data[pos].poster_path)
      row+=`<article class="col-md-3">
               <div class="panel panel-default panel-front">
                  <div class=" panel-heading">
                    <h4 class="panel-title"><img src="https://image.tmdb.org/t/p/w500/${data[pos].poster_path}"/></h4>
                  </div>
                  <div class="panel-body">
                    <a onclick="foo(this.id)" id="${data[pos].id}" data-toggle="modal" data-target="#myModal"><h3 class="text-primary">${data[pos].title}</h3></a>
                    <h4>Rating : ${data[pos].vote_average}</h4>
                  </div>  
                  <div class="panel-footer">
                      <button id="${data[pos].id}"class="btn btn-danger" onclick="foo2(this.id)">+ Add</button>
                  </div>
                <div>  
            </article>
      `
     
  row+="<section>"
  return row;
}
function showUpcomingMovieData(data){
  //console.log("inshowUpcomingMovieData" )
  //baseHTMLElement = <article class="col-md-3"><h3></h3></article>
  let divForUpcomingMovie = document.getElementById("upcomingMovieResult");
  console.log(data)
  if(data){    
    results = (data['results'])
    if(results){
      /*for(let i in results){
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
      }*/

      for(let i=0; i<results.length; i+=3){
        divForUpcomingMovie.innerHTML += createRow(results , i)
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
  document.getElementById("searchResultsDiv").innerHTML="";
  let splitData = searchBarInput.split(" ");
  if(splitData.length>1){
    searchBarInput = splitData.join("%20")
  }
  
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
  /*for(let i=0;i<len;i++){
    console.log(i)
      if(i%3 == 0)
        resultDiv.innerHTML += '<div class="row">'
      resultDiv.innerHTML += '<div class="col-md-4">'+'<img class="col-md-2" src="https://image.tmdb.org/t/p/w500/'+results[i].poster_path+'"/><p class="col-md-2 col-sm-4">'+results[i].title+"</p></article>";
      if(i%3 ==0)
        resultDiv.innerHTML += "</div>"
  }*/

  /*for(let i=0; i<len; i+=1){console.log(i)
    resultDiv.innerHTML += createRow1(results , i )
  }*/


  for(let i=0; i<len; i+=3){
    resultDiv.innerHTML += createRow(results , i )
  }
}

//https://image.tmdb.org/t/p/w500/rDeGK6FIUfVcXmuBdEORPAGPMNg.jpg/
//https://image.tmdb.org/t/p/w500/3XNfYTW4XGscI81nXMSWGsQ8cpu.jpg
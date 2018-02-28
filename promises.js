function getData() {
  return new Promise((resolve, reject)=>{
      request( `http://www.omdbapi.com/?t=The+Matrix`, (error, res, movieData)=>{
          if (error) reject(error);
          else resolve(movieData);
      });
  });
}

getData()
  .then(data => console.log(data))
  .catch(error => console.log(error));


function add(a , b){
return new Promise((resolve, reject )=>{
  setTimeout( resolve(a+b) , 500)
})
}

function divide(a , b){
return new Promise((resolve, reject)=>{
  setTimeout(resolve(a/b) , 500)
})
}

add(10 , 20)
.then(data => console.log(data))

divide(20 , 10)
.then(data => console.log(data))


function average(a , b){
return new Promise((resolve, reject) =>{
  add(a , b).then(addRes => divide(addRes , 2).then(divideRes => resolve(divideRes)))
})
}



average(10 , 20).
then(data=> console.log(data))
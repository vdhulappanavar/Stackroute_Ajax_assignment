
console.log("hey!!!!!!!")
var user = require('./appStore');
function init(){
  console.log("in init");
  //console.log(localStorage['appStore']['collections'])
  let _appStore = JSON.parse(localStorage.getItem("appStore"))
  console.log(_appStore)
  console.log(user)
}
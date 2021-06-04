let dataLoc;
function getData() {
    dataLoct = fetch("http://localhost:3000/", {
		method: "GET",
		headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
	}).then((response) => {return response.json()});
    // console.log(dataLoc["Gamers:"])
    return dataLoc;
}

// new Vue({
//         el: '#app',
//         title: 'kmrk',
//         data: dataLoc

// });
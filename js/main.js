
var dataNew= []


//	const url = "https://api.covid19api.com/summary";
   // const url = " https://coronavirus-19-api.herokuapp.com/all";
   const url = "https://coronavirus-19-api.herokuapp.com/countries"
	$.get(url, function(data,status){

		//chuc nang search
		dataNew = [...data]
		
		$(".input-text").keyup(function (e) { 
			const value = $(this).val()
			var newArr = dataNew.filter(val => val.country.toLowerCase().includes(value.toLowerCase()))
			console.log(newArr);
			renderData(newArr)

		});

		var arrow = true
		$(".confimed").click(function (e) { 
			e.preventDefault();
			if(arrow){
				$(".down").hide()
				$(".up").show()
				arrow = !arrow

				var sortArr = [...data]
				sortArr = sortArr.filter((val,idx) =>{
					return idx > 0
				})
				sortArr.sort(function(a, b){return a.cases -b.cases});
				console.log(sortArr);
				renderData(sortArr)
			}
			else{
				$(".down").show()
				$(".up").hide()
				arrow = !arrow
				var sortArr = [...data]
				sortArr = sortArr.filter((val,idx) =>{
					return idx > 0
				})
				sortArr.sort(function(a, b){return b.cases - a.cases});
				renderData(sortArr)
			}
			
		});


		if(status=="success"){	
			
            animateNumber(data[0].cases, 5400, 0, function (number) {
				const formattedNumber = number.toLocaleString()
				document.querySelector(".num-confirmed").innerText = formattedNumber
			  })
			  animateNumber(data[0].recovered, 5400, 0, function (number) {
				const formattedNumber = number.toLocaleString()
				document.querySelector(".num-re").innerText = formattedNumber
			  })
			  animateNumber(data[0].deaths, 5400, 0, function (number) {
				const formattedNumber = number.toLocaleString()
				document.querySelector(".num-de").innerText = formattedNumber
			  })
			  animateNumber(data[0].critical, 5400, 0, function (number) {
				const formattedNumber = number.toLocaleString()
				document.querySelector(".num-cr").innerText = formattedNumber
			  })
			  animateNumber(data[0].todayCases, 5400, 0, function (number) {
				const formattedNumber = number.toLocaleString()
				document.querySelector(".ass-con").innerText = formattedNumber
			  })
			  animateNumber(data[0].todayDeaths, 5400, 0, function (number) {
				const formattedNumber = number.toLocaleString()
				document.querySelector(".ass-de").innerText = formattedNumber
			  })

			  var arrFirst = data.filter((val,idx) => {
				  return idx > 0
			  })

			  $(".delete-input").click(function (e) { 
				e.preventDefault();
				$(".input-text").val('')
				renderData(arrFirst)
			});
			renderData(arrFirst)
		}
		
	})



function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
	let currentNumber = startNumber
	const interval = window.setInterval(updateNumber, 17)
	function updateNumber() {
	  if (currentNumber >= finalNumber) {
		clearInterval(interval)
	  } else {
		let inc = Math.ceil(finalNumber / (duration / 17))
		if (currentNumber + inc > finalNumber) {
		  currentNumber = finalNumber
		  clearInterval(interval)
		} else {
		  currentNumber += inc
		}
		callback(currentNumber)
	  }
	}
  }
 


//   function test(){
// 	 const url = " https://coronavirus-19-api.herokuapp.com/all";
// 	// // const url = "https://coronavirus-19-api.herokuapp.com/countries";
// 	// https://coronavirus-19-api.herokuapp.com/countries/{countryName}
    
// 	$.get(url, function(data,status){
// 		console.log(data);
// 		if(status=="success"){
        
// 		}
		
// 	})

// }
// active: 15474211
// cases: 200264356
// casesPerOneMillion: 25692
// country: "World"
// critical: 92414
// deaths: 4258693
// deathsPerOneMillion: 546
// recovered: 180531452
// testsPerOneMillion: 0
// todayCases: 27272
// todayDeaths: 215

function renderData(list){
	
	$(".data").empty()
	// var newArr = list.filter((val,idx) =>{
	// 	return idx > 0
	// })
	list.forEach(val =>{
		$(".data").append(`
			<tr>
			<td class="name">${val.country}</td>
			<td class="con">${val.cases}</td>
			<td class="re">${val.recovered}</td>
			<td class="cr">${val.critical}<td>
			<td class="de">${val.deaths}</td>
		</tr>
	`)
	})
	
}







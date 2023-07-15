let btn = document.getElementById('searchBtn')
let link = `https://themealdb.com/api/json/v1/1/search.php?s=`
btn.addEventListener('click', () => {
    let search = document.getElementById('search').value
    if (search.length === 0) {
        console.log('error')
    } else {
        let food = fetch(`${link}${search}`)
        food.then((value) => {
            if (!value.ok) {
                console.log('error detected')
            }
            return value.json()
        }).then((response) => {
            console.log(response.meals[0].strIngredient)
            console.log(response)

            let ingredients = []
            let count = 1
            for (let menu in response.meals[0]) {
                let ingredient = "";
                let measure = "";
                if (menu.startsWith("strIngredient") && response.meals[0][menu]) {
                    ingredient = response.meals[0][menu];
                    measure = response.meals[0][`strMeasure` + count];
                    count += 1;
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
            console.log(ingredients)
search.innerHTML=' '
            document.getElementsByClassName('one')[0].innerHTML = `<div class=img><img src=${response.meals[0].strMealThumb}></div>
                                                       <div class=head>
                                                       <h3>Food name: &nbsp${response.meals[0].strMeal}</h3>
                                                       <h3> Country: &nbsp${response.meals[0].strArea}</h3>
                                                       </div>
                                                       <div class='mix'><div class='list'></div>
                                                       <div class='recipe'><p>${response.meals[0].strInstructions}<p></div></div>`
            let ul = document.createElement('ul')
          let list=  document.getElementsByClassName('list')[0]
            ingredients.forEach((ingre) => {

                let li = document.createElement('li')
                li.innerText = ingre
                ul.appendChild(li)
                list.appendChild(ul)
            

            })
        }).catch(()=>{
            
            document.getElementsByClassName('one')[0].innerHTML =`<h1>there might be an error in API</h1>`
        })

    }
})

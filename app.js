const searchBtn = document.getElementById('searchBtb')
const mealsItem = document.getElementById('mealsItem')
const searchInput = document.getElementById('searchInput')
const form = document.getElementById('formSearch')
const singleItem = document.getElementById('singleItem')
const single = document.getElementById('single')
const main = document.getElementById('main')
// UI Element Generate
const uiElement = (html, itemClass) => {
  let item = document.createElement('div')
  item.className = `${itemClass}`
  item.innerHTML = html
  mealsItem.appendChild(item)
}
// UI ingredient Generate
const getInfo = (id) => {
  singleItem.innerHTML = ''
  main.style.display = 'none'
  single.style.display = 'block'
  fetchById(id)
    .then((data) => ingredientFormate(data))
    .catch((err) => console.log(err))
}
// UI Formate Generate
const uiFormate = (data) => {
  const mealData = data.meals
  const selectedMeal = mealData.splice(0, 8)
  selectedMeal.forEach((meal) => {
    const html = `
          <div class="item">
              <img onclick="getInfo(${meal.idMeal})" src=${meal.strMealThumb} alt="" />
              <h4 class="item-title">
                  <a onclick="getInfo(${meal.idMeal})">${meal.strMeal}</a>
              </h4>
          </div>`
    uiElement(html, 'col-md-3 main-item')
  })
}
const ingredientFormate = (data) => {
  const meal = data.meals[0]
  // ingredient array to ingredient Value Generate
  const ingToValue = (ing) => {
    let value = meal[ing]
    if (value !== null && value !== '') {
      let list = document.createElement('li')

      const item = `
            <i class="fas fa-check-square"></i>
            <span>${value}</span>
            
        `
      list.innerHTML = item
      html2.appendChild(list)
      console.log(value)
    }
  }
  let html1
  let html2 = document.createElement('ul')
  html1 = `
    <img src=${meal.strMealThumb}  alt="" />
    <h2>${meal.strMeal}</h2>
    <h4>Ingredients</h4>
    `

  const mealKey = Object.keys(meal)
  const ingredient = []
  // Making ingredient array From Meal object
  mealKey.forEach((key) => {
    if (key.includes('strIngredient')) {
      ingredient.push(key)
    }
  })
  // ingredient array to ingredient Value
  ingredient.forEach((ing) => {
    ingToValue(ing)
  })
  let newDiv = document.createElement('div')
  newDiv.innerHTML = html1

  // Append Child for showing Ing. Output in UI

  singleItem.appendChild(newDiv)
  singleItem.appendChild(html2)
}

// Meal Result OutPut

const outputResult = (e) => {
  mealsItem.innerHTML = ''
  // Get Search Input Value
  const searchValue = searchInput.value
  // Search Simple Validation

  if (searchValue == '') {
    alert('Please Input Your Meal')
  } else {
    fetchData(searchValue)
      .then((data) => {
        // Formate And Generate UI using data
        uiFormate(data)
      })
      .catch((err) => {
        const html = `
          <div class="item">
              <h2>Your Meal Is Not Found In Our List Please Try Another Meal, Thanks </h2>
          </div>`
        // UI Element Generate
        uiElement(html, 'col-md-12 error-item')
      })
  }
  e.preventDefault()
}

// Display Single items event
document.getElementById('back-to-home').addEventListener('click', () => {
  main.style.display = 'block'
  single.style.display = 'none'
})
// Search Event By Submit Form
form.addEventListener('submit', outputResult)
// Search Event By Click btn
searchBtn.addEventListener('click', outputResult)
// Fetch Data From Api and query by name
async function fetchData(query) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  )
  const data = response.json()
  return data
}
// Fetch Data By Using Meal Id
async function fetchById(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  )
  const data = response.json()
  return data
}

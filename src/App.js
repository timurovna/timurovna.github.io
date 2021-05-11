import React from "react"
import Meal from "./Meal"
import MealDescription from "./MealDescription"

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      inputValue: "",
      mealsFound: [],
      searchWord: false,
      mealName: "",
      mealImg: "",
      mealCategory: "",
      mealArea: "",
      mealInstructions: "",
      mealIngredients: "",
      clicked: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchMeal = this.searchMeal.bind(this)
    this.showDescription = this.showDescription.bind(this)

  }

  handleChange(event){
    this.setState({
      inputValue: event.target.value,
      clicked: false
    })
  }

  searchMeal(){
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + this.state.inputValue)
    .then(response=>response.json())
    .then(response=>{
      this.setState({
        mealsFound: response.meals,
        searchWord: true
      })
    })
  }

  showDescription(event){
    const clickedMealId = event.target.parentElement.id
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + clickedMealId)
    .then(response=>response.json())
    .then(response=>{
      let temArr = []

      for (var i=1; i<20; i++){
        if (response.meals[0]["strIngredient" + i] !== "" && response.meals[0]["strMeasure" + i]!== ""){
          temArr.push(<div className="ingredients">
                        <p>{response.meals[0]["strIngredient" + i]  + " - " + response.meals[0]["strMeasure" + i]}</p>
                      </div>)
        }
      }
     
      this.setState({
        clicked: true,
        mealName: response.meals[0].strMeal,
        mealImg: response.meals[0].strMealThumb,
        mealCategory: response.meals[0].strCategory,
        mealArea: response.meals[0].strArea,
        mealInstructions: response.meals[0].strInstructions,
        mealIngredients: temArr
      })
    })

  }
  render(){
    const meals = this.state.mealsFound.map(meal=>{
      return (<div className="meal" id={meal.idMeal} onClick={this.showDescription}>
                  <Meal name={meal.strMeal} 
                    img={meal.strMealThumb} 
                    key={meal.idMeal}
                    id={meal.idMeal} />
              </div>)
    })

    return( <div className="container">
              <h1>Meal Finder</h1>
              <input onChange={this.handleChange} value={this.state.inputValue}/>
              <button onClick={this.searchMeal} className="search-btn">Search</button>
              <div>
                <h2 className={this.state.searchWord===true ? "show" : "hide"}>Search results for {this.state.inputValue}:</h2>
                <div className="meals">{meals}</div>
                <div className={this.state.clicked===true ? "single-meal" : "hide"}>
                  <MealDescription name={this.state.mealName} 
                                   img={this.state.mealImg}
                                   category={this.state.mealCategory}
                                   area = {this.state.mealArea}
                                   instructions = {this.state.mealInstructions}
                                   ingredients = {this.state.mealIngredients}
                  />
                </div>
              </div>

            </div>)
  }
}

export default App;
 
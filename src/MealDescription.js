import React from "react"

function MealDescription(props){
	return( <div>
				<h1>{props.name}</h1>
            	<img src={props.img} />
            	<div className="single-meal-info">
                	<p>{props.category}</p>
                	<p>{props.area}</p>
            	</div>
            	<p>{props.instructions}</p>
            	<p>{props.ingredients}</p>
            </div>)
}

export default MealDescription


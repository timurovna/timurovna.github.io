import React from "react"


class Meal extends React.Component{
	render(){
		return (<div id={this.props.id} className="meal">
			<img src={this.props.img}/>
			<h3 className="meal-info">{this.props.name}</h3>
		</div>)
	}
}



export default Meal
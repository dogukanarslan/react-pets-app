import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom"
class DetailsPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: "",
      age: "",
      breed: "",
      description: "",
      image: ""
    }
  }

  componentDidMount(){
    axios.get(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${this.props.match.params.id}`)
      .then(resp => resp.data)
      .then(data => this.setState({name: data.name,age: data.age,image: data.image, breed: data.breed,description: data.description}))
    }


    render(){
      return (
        <div className="container text-center">
          <div className="card mx-auto"style={{width: "18rem"}}>
            <Link className="goBackButton" to="/">X</Link>
            <img alt="" className="card-img-top" src={this.state.image}/>
            <div className="card-body">
              <h1 className="card-title">{this.state.name}</h1>
              <div>
                <span className="badge badge-primary" style={{fontSize: "12px"}}>{this.state.breed}</span>
              </div>
              <div>
                <span className="badge badge-warning" style={{fontSize: "12px"}}>{this.state.age}</span>
              </div>
            </div>
            <p className="card-text">{this.state.description}</p>
          </div>
        </div>
      )
    };
  }

  export default DetailsPage;

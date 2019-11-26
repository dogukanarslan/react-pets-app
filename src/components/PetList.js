import React from 'react';
import {Pet} from "../components";
import {getPets} from "../constants";
import {stringContains} from "../helpers";


class PetList extends React.Component{
    breed;
    constructor(props){
        super(props);
        this.state = {
            _pets: [],
            pets: [],
            yukleniyor: true,
            index: 4
        }
    }

    componentDidMount() {
        getPets().then((data) => {
            this.setState({
                _pets: data,
                pets: data,
                yukleniyor: false,
            })
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activeFilter !== this.props.activeFilter){
            this.filterPets();
        }
        if(prevProps.searchValue !== this.props.searchValue){
            this.filterPets();
        }
    }

    filterPets = () => {
        if(!this.props.activeFilter){
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return stringContains(pet.name, this.props.searchValue)
                }),
                index: 4
            })
        }else{
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return pet.breed === this.props.activeFilter;
                }).filter((filteredPet) => {
                    return stringContains(filteredPet.name, this.props.searchValue)
                }),
                index: 4
            })
        }
    }

    scrollToLoad = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          const index = this.state.index;
          const petsLength = this.state.pets.length;
          if (index < petsLength) {
              this.setState({
                  index: index + ((petsLength - index >= 4) ? 4 : (petsLength - index))
          });
        }
      }
    }


    render(){
        window.onscroll = this.scrollToLoad;
        const Yukleniyor = <div>Yukleniyor</div>;
        const EmptyPets = <div>Bulunamadı</div>;
        const petsShowing = this.state.pets.slice(0,this.state.index);
        const Pets =  [<h3>Gösterilen Pet Sayısı: {petsShowing.length}</h3>,<div className="row">
            {
                this.state.pets.slice(0,this.state.index).map((pet) => {
                    return <Pet key={Math.random()} {...pet} />
                })

            }
        </div>];
        if(this.state.yukleniyor){
            return Yukleniyor;
        }else if(this.state.pets.length === 0){
            return EmptyPets
        }else{
            return Pets

        }
    }
}


export default PetList;

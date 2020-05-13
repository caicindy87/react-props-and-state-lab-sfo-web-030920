import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  handleChangeType = (petType) => {
    this.setState((prevState) => {
      return {
        filters: {
          ...prevState.filters,
          type: petType,
        },
      };
    });
  };

  handleFindPetClick = () => {
    let baseURL = "/api/pets";
    if (this.state.filters.type === "cat") {
      baseURL = "/api/pets?type=cat";
    } else if (this.state.filters.type === "dog") {
      baseURL = "/api/pets?type=dog";
    } else if (this.state.filters.type === "micropig") {
      baseURL = "/api/pets?type=micropig";
    }

    fetch(baseURL)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          pets: [...data],
        });
      });
  };

  handleAdopt = (id) => {
    const petIndex = this.state.pets.findIndex((pet) => pet.id === id);

    this.setState((prevState) => {
      prevState.pets[petIndex].isAdopted = true;
      return {
        pets: [...prevState.pets],
      };
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleChangeType}
                onFindPetsClick={this.handleFindPetClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.handleAdopt}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

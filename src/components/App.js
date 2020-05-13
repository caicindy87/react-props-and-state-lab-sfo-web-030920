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

  onChangeType = (petType) => {
    this.setState((prevState) => {
      return {
        filters: {
          ...prevState.filters,
          type: petType,
        },
      };
    });
  };

  fetchPets = () => {
    let baseURL = "/api/pets";

    if (this.state.filters.type !== "all") {
      baseURL += `?type=${this.state.filters.type}`;
    }

    fetch(baseURL)
      .then((resp) => resp.json())
      .then((pets) => {
        this.setState({
          pets: pets,
        });
      });
  };

  onAdoptPet = (id) => {
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
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

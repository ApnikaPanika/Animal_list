import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../Content/hooks/hooks';
import './AnimalList.scss';
import { deleteOneAnimal } from '../../Content/Slice/Slice';

const AnimalList = () => {
  const animalsList = useAppSelector((state) => state.animals);
  const [filterBySpecies, setFilterBySpecies] = useState('');
  const [activateFilter, setActivateFilter] = useState(false);

  useEffect(() => {
    localStorage.setItem('storagedAnimals', JSON.stringify(animalsList));
  }, [animalsList]);

  const dispatch = useAppDispatch();

  const speciesList: string[] = [];

  animalsList.map((animal) => {
    if (speciesList.includes(animal.species)) {
      return null;
    }
    return speciesList.push(animal.species);
  });

  const speciesFilter = (species: string) => {
    setActivateFilter(true);
    setFilterBySpecies(species);
  };

  const viewAllFilter = () => {
    if (animalsList.length === 0) {
      alert('There is no animals on the list (︶︹︺)');
    }
    setActivateFilter(false);
  };

  const animalsToShow = animalsList.filter((animal) => {
    if (activateFilter) {
      return animal.species === filterBySpecies;
    }
    return true;
  });

  const deleteAnimal = (index: number) => {
    const filteredAnimals = animalsList.filter((animal, i) => i !== index);
    dispatch(deleteOneAnimal(filteredAnimals));
  };

  return (
    <div>
      <div className="species__button__container">
        <button onClick={viewAllFilter} className="species__filter__button">View all</button>
        {speciesList.map((species) => (
          <button
            key={species}
            onClick={() => speciesFilter(species)}
            className="species__filter__button"
          >
            {species}

          </button>
        ))}
      </div>
      <div className="animal__container">
        {animalsToShow.map(({ animalName, imgSRC, species }, index) => (
          <div key={Math.random()} className="animal__card">
            <h2 className="animal__card__text">
              {`Animal name is ${animalName}`}
            </h2>
            <img className="animal__photo" src={imgSRC} alt={species} />

            <h5 className="animal__card__text">
              {`Animal species is ${species}`}
            </h5>
            <button
              onClick={() => deleteAnimal(index)}
              className="delete__animal__button"
            >
              Delete this Animal

            </button>
          </div>

        ))}

      </div>

    </div>
  );
};

export default AnimalList;

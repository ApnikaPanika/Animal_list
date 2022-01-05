/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import './Form.scss';
import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Content/hooks/hooks';
import { addAnimal } from '../../Content/Slice/Slice';

export type AnimalInfo = {
    animalName: {
        [key: string]: string
    }
    imgSRC: string
    species: string
}

type Props = {
    setShowForm: (hiddenOn: boolean)=> void
}

const Form:FC<Props> = ({ setShowForm }) => {
  const [showInput, setShowInput] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const animalsList = useAppSelector((state) => state.animals);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AnimalInfo>();

  const speciesList: string[] = [];

  animalsList.map((animal) => {
    if (speciesList.includes(animal.species)) {
      return null;
    }
    return speciesList.push(animal.species);
  });

  const addSpecies = (e:React.MouseEvent) => {
    e.preventDefault();
    setShowInput(true);
    setDisableButton(true);
  };

  const cancelForm = () => {
    reset();
    setShowForm(true);
    setShowInput(false);
    setDisableButton(false);
  };

  const onSubmit = ({ imgSRC, species, animalName }:AnimalInfo) => {
    dispatch(addAnimal({
      imgSRC, species, animalName,
    }));
    cancelForm();
  };

  return (
    <div className="modal__window__container">

      <h3>Add animal</h3>

      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="name" className="input__label">
            Animal Name
            <input
              type="text"
              id="name"
              className="input__field"
              {...register('animalName', {
                required: 'This field is required',
              })}
            />
          </label>
          {errors.animalName && <p className="validation__texts">{errors.animalName.message}</p>}
        </div>

        <div>
          <label htmlFor="image__SRC" className="input__label">
            Image source
            <input
              type="text"
              id="image__SRC"
              className="input__field"
              {...register('imgSRC', {
                required: 'This field is required',
              })}
            />
          </label>
          {errors.imgSRC && <p className="validation__texts">{errors.imgSRC.message}</p>}
        </div>

        <div className="form__species__big__container">
          <div className="form__species__container">
            <div>Species</div>
            <button
              disabled={disableButton}
              onClick={addSpecies}
              className="form__addSpecies__button"
            >
              (Add species)
            </button>
          </div>

          {showInput ? (
            <input
              type="text"
              id="species"
              placeholder="Write new species"
              className="input__field"
              {...register('species', {
                required: 'This field is required',
              })}
            />
          ) : (
            <select
              className="form__select__species"
              {...register('species', {
                required: 'This field is required',
              })}
            >
              {speciesList.map((species) => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>
          )}

          {errors.species && <p className="validation__texts">{errors.species.message}</p>}
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              cancelForm();
            }}
            className="form__cancel__button"
          >
            Cancel

          </button>
          <button className="form__submit__button">Add</button>
        </div>
      </form>
    </div>
  );
};
export default Form;

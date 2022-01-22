/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimalInfo } from '../../Components/Form/Form';

const getStoragedAnimals = () => {
  const animalsList = localStorage.getItem('storagedAnimals');
  if (animalsList) {
    return JSON.parse(animalsList);
  } return [];
};

const initialState: AnimalInfo[] = getStoragedAnimals();

export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal: (state, action:PayloadAction<AnimalInfo>) => {
      state.push(action.payload);
    },
    deleteOneAnimal: (state, action:PayloadAction<AnimalInfo[]>) => (
      action.payload
    ),
  },
});

export const { addAnimal, deleteOneAnimal } = animalsSlice.actions;

export default animalsSlice.reducer;

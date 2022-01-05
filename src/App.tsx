import './App.scss';
import { useState } from 'react';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import AnimalList from './Components/AnimalsList/AnimalList';

const App = () => {
  const [showForm, setShowForm] = useState(true);

  const clickHandler = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Header />

      <div className="add__animal__container">
        <button
          onClick={clickHandler}
          className="add__animal__button"
        >
          Add animal

        </button>
      </div>

      <div hidden={showForm}>
        <div className="Form__container">
          <Form setShowForm={setShowForm} />
        </div>
      </div>

      <AnimalList />

    </div>
  );
};
export default App;

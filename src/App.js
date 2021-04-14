import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Dialog from './components/Dialog/Dialog';
import Data from './data';

//how to optimize// is context needed?
//localstorage

function App() {
  const initialState = JSON.parse(localStorage.getItem('elements')) || Data;
  const initialStateSelected =
    JSON.parse(localStorage.getItem('isSelected')) || {};
  const [elements, setElements] = useState(initialState); ///setElements ?
  const [dialog, setDialog] = useState(false);
  const [isSelected, setIsSelected] = useState(initialStateSelected);
  const [selectedElementsList, setSelectedElementsList] = useState([]);

  const selectedCount = Object.keys(isSelected).filter((key) => isSelected[key])
    .length;

  const deleteElement = (el) => {
    setSelectedElementsList(
      selectedElementsList.filter((element) => element !== el)
    );
    setIsSelected({
      ...isSelected,
      [el]: false,
    });
  };

  useEffect(() => {
    localStorage.setItem('elements', JSON.stringify(elements));
    localStorage.setItem('isSelected', JSON.stringify(isSelected));
    let selectedElements = Object.keys(isSelected).filter(
      (key) => isSelected[key] === true
    );
    setSelectedElementsList(
      elements.filter((el) => selectedElements.includes(el))
    );
  }, [elements, isSelected]);

  const openDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };
  const onCancel = () => {
    setDialog(false);
    ///???
  };
  const selectedElements = selectedElementsList.map((el) => (
    <div className='buttons-container' key={el}>
      <span className='buttons'>
        {el} <span className='buttons-line'>|</span>
        <Button
          className='delete-button'
          handleClick={() => deleteElement(el)}
          label='X'
        />
      </span>
    </div>
  ));
  return (
    <div className='App-wrapper'>
      <div className='App'>
        <h3>Select Items:</h3>
        <p>You currently selected {selectedCount} items.</p>
        <div>{selectedElements}</div>
        <Button
          className='button-change'
          handleClick={openDialog}
          label='change my choice'
        />
        {dialog && (
          <Dialog
            elements={elements}
            closeDialog={closeDialog}
            onCancel={onCancel}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            selectedCount={selectedCount}
            selectedElements={selectedElements}
          />
        )}
      </div>
    </div>
  );
}

export default App;

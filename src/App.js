import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Dialog from './components/Dialog/Dialog';
import Data from './data';

function App() {
  const initialState = JSON.parse(localStorage.getItem('elements')) || Data;
  const initialStateSelected =
    JSON.parse(localStorage.getItem('isSelected')) || {};
  const [elements] = useState(initialState);
  const [isSelected, setIsSelected] = useState(initialStateSelected);
  const [selectedElementsList, setSelectedElementsList] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [elementsStorage, setElementsStorage] = useState({ ...isSelected });
 

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

  const selectedCount = Object.keys(isSelected).filter((key) => isSelected[key])
    .length;
  const disabled = selectedCount >= 3;

  const deleteElement = (el) => {
    setSelectedElementsList(
      selectedElementsList.filter((element) => element !== el)
    );
    setIsSelected({
      ...isSelected,
      [el]: false,
    });
  };

  const openDialog = () => {
    setDialog(true);
  };

  const onSave = () => {
    setDialog(false);
    setElementsStorage({ ...isSelected });
  };

  const onCancel = () => {
    setDialog(false);
    setIsSelected({ ...elementsStorage });
  };

  const selectedElements = selectedElementsList.map((el) => (
    <div className='buttons-container' key={el}>
      <span className='buttons'>
        {el} <span className='line'>|</span>
        <Button
          className='delete'
          handleClick={() => deleteElement(el)}
          label='X'
        />
      </span>
    </div>
  ));

  return (
    <div className='app-wrapper'>
      <div className='app'>
        <h3>Select Items:</h3>
        <p>You currently selected {selectedCount} items.</p>
        <div>{selectedElements}</div>
        <Button
          className='change'
          handleClick={openDialog}
          label='change my choice'
        />
        {dialog && (
          <Dialog
            elements={elements}
            onSave={onSave}
            onCancel={onCancel}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            disabled={disabled}
            selectedElements={selectedElements}
          />
        )}
      </div>
    </div>
  );
}

export default App;

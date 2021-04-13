import React, { useEffect, useState } from 'react';
import './App.css';
import Data from './data';
import Dialog from './Dialog/Dialog';

function App() {
  const initialState = JSON.parse(localStorage.getItem('elements')) || Data;
  const initialStateSelected =
    JSON.parse(localStorage.getItem('isSelected')) || {};
  const [elements, setElements] = useState(initialState);
  const [dialog, setDialog] = useState(false);
  const [isSelected, setIsSelected] = useState(initialStateSelected);
  const [selectedElementsList, setSelectedElementsList] = useState([]);

  console.log(isSelected);

  const selectedCount = Object.keys(isSelected).filter((key) => isSelected[key])
    .length;

  const deleteElement = (el) => {
    setSelectedElementsList(
      selectedElementsList.filter((element => element !== el)))
    setIsSelected({
      ...isSelected,
      [el]: false,
    });
  };

  useEffect(() => {
    localStorage.setItem('elements', JSON.stringify(elements));
    localStorage.setItem('isSelected', JSON.stringify(isSelected));
    let selectedIndex = Object.keys(isSelected)
      .filter((key) => isSelected[key] === true)
      // .map((i) => Number(i));
    // setSelectedElementsList(selectedIndex.map((i) => elements[i]));
    setSelectedElementsList(
      elements.filter((el) => selectedIndex.includes(el))
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
  };
  const selected = selectedElementsList.map((el) => (
    <div className='buttons-container' key={el}>
      <span className='buttons'>
        {el} <span className='buttons-line'>|</span>
        <button className='delete-button' onClick={() => deleteElement(el)}>
          X
        </button>
      </span>
    </div>
  ));
  return (
    <div className='App-wrapper'>
      <div className='App'>
        <h3>Select Items:</h3>
        <p>You currently selected {selectedCount} items.</p>
        <div>{selected}</div>
        <button className='button-change' onClick={openDialog}>
          change my choice
        </button>
        {dialog && (
          <Dialog
            elements={elements}
            closeDialog={closeDialog}
            onCancel={onCancel}
            selected={selected}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            selectedCount={selectedCount}
          />
        )}
      </div>
    </div>
  );
}

export default App;

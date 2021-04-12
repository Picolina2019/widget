import React, { useEffect, useState } from 'react';
import './App.css';
import Data from './data';
import Dialog from './Dialog';

function App() {
  const initialState = JSON.parse(localStorage.getItem('elements')) || Data;
  const initialStateSelected =
    JSON.parse(localStorage.getItem('isSelected')) || {};
  const [elements, setElements] = useState(initialState);
  const [dialog, setDialog] = useState(false);
  const [isSelected, setIsSelected] = useState(initialStateSelected);
  const [selectedElementsList, setSelectedElementsList] = useState([]);
  
  console.log(isSelected);
  console.log(selectedElementsList);

  const selectedCount = Object.keys(isSelected).filter((key) => isSelected[key])
    .length;

  const deleteElement = (i) => {
    setSelectedElementsList(
      selectedElementsList.filter((el, index) => index !== i)
    );
  };
  console.log(elements);
  useEffect(() => {
    localStorage.setItem('elements', JSON.stringify(elements));
    localStorage.setItem('isSelected', JSON.stringify(isSelected));
    let selectedIndex = Object.keys(isSelected)
      .filter((key) => isSelected[key] === true)
      .map((i) => Number(i));
    setSelectedElementsList(selectedIndex.map((i) => elements[i]));
  }, [elements, isSelected]);

  const openDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };
  const onCancel = () => {
    setElements([...elements]);
    setDialog(false);
  };
  const selected = selectedElementsList.map((el, index) => (
    <div key={el}>
      {el}
      <button onClick={() => deleteElement(index)}>delete</button>
    </div>
  ));
  return (
    <div className='App'>
      <h3>Select Items:</h3>
      <p>you currently selected {selectedCount} items</p>
      {selected}
      <button onClick={openDialog}>change my choice</button>
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
  );
}

export default App;

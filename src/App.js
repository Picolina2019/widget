import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Dialog from './components/Dialog/Dialog';
import Data from './data';



function App() {
  const initialState = JSON.parse(localStorage.getItem('elements')) || Data;
  const initialStateSelected =
    JSON.parse(localStorage.getItem('isSelected')) || {};
  const [elements, setElements] = useState(initialState); 
  const [dialog, setDialog] = useState(false);
  const [isSelected, setIsSelected] = useState(initialStateSelected);
  const [selectedElementsList, setSelectedElementsList] = useState([]);
  const [newState] = useState({...isSelected});
//   const [newElements] = useState([...initialState]);
//  const [newList, setNewList] = useState([...selectedElementsList]);

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
  const onSave = () => {
    setDialog(false);
    setIsSelected(isSelected)
        localStorage.setItem('isSelected', JSON.stringify(isSelected));
  };
  const onCancel = () => {
    
    setDialog(false);
    setIsSelected({ ...newState });
    

    // setElements([...newElements]);
    // setSelectedElementsList([...newList])
   
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
    <div className='App-wrapper'>
      <div className='App'>
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
            selectedCount={selectedCount}
            selectedElements={selectedElements}
           
          />
        )}
      </div>
    </div>
  );
}

export default App;

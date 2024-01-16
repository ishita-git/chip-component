import React, { useRef, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

const ChipComponent = ({ title }) => {
  const [visible, setVisible] = useState(true);
  const [selectable, setSelectable] = useState(true);
  const [removable, setRemovable] = useState(true);
  const [separatorKeysCodes] = useState([13]); // 13 is the key code for Enter
  const [fruitCtrl, setFruitCtrl] = useState('');
  const [fruits, setFruits] = useState(['Lemon']);
  const allFruits = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  const fruitInput = useRef(null);

  const handleInputChange = (event, value) => {
    setFruitCtrl(value);
  };

  const handleAdd = (event) => {
    const value = event.target.value.trim();

    // Add our fruit
    if (value) {
      setFruits((prevFruits) => [...prevFruits, value]);
    }

    // Reset the input value
    setFruitCtrl('');

    // Focus on the input
    if (fruitInput.current) {
      fruitInput.current.focus();
    }
  };

  const handleRemove = (fruitToRemove) => {
    setFruits((prevFruits) => prevFruits.filter((fruit) => fruit !== fruitToRemove));
  };

  const handleSelect = (event, value) => {
    // Add selected fruit
    if (value) {
      setFruits((prevFruits) => [...prevFruits, value]);
    }

    // Reset the input value
    setFruitCtrl('');

    // Focus on the input
    if (fruitInput.current) {
      fruitInput.current.focus();
    }
  };

  const filterFruits = (value) => {
    const filterValue = value.toLowerCase();
    return allFruits.filter((fruit) => fruit.toLowerCase().includes(filterValue));
  };

  return (
    <div>
      <h2>{title}</h2>
      {fruits.map((fruit, index) => (
        <Chip
          key={index}
          label={fruit}
          onDelete={() => handleRemove(fruit)}
          style={{ margin: '4px' }}
        />
      ))}
      <Autocomplete
        value={fruitCtrl}
        onChange={handleSelect}
        inputValue={fruitCtrl}
        onInputChange={handleInputChange}
        options={filterFruits(fruitCtrl)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Fruits"
            variant="outlined"
            fullWidth
            onKeyDown={(e) => {
              if (separatorKeysCodes.includes(e.keyCode)) {
                handleAdd(e);
              }
            }}
            inputRef={fruitInput}
          />
        )}
      />
    </div>
  );
};

export default ChipComponent;
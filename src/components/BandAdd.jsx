import React, { useState } from 'react';

const BandAdd = ({ createBand }) => {
  const [bandName, setBandName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (bandName.trim().length > 0) {
      createBand(bandName);
      setBandName('');
    }
  };

  const handleInputChange = (event) => {
    setBandName(event.target.value);
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Nueva Banda'
          value={bandName}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default BandAdd;

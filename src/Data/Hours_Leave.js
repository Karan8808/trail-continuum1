import React from "react";
import PropTypes from 'prop-types';

import Label from "../Components/BaseComponents/Label";
import Select from "react-select";

import '../Styling/datepicker.css';

const HoursLeave = ({ setUserData }) => {
  const options = [
    { value: "4", label: "Half Day" },
    { value: "8", label: "Full Day" },
  ];

  const handleHoursLeaveChange = (selectedOption) => {
    setUserData(prevData => ({
      ...prevData,
      noofhours: selectedOption.value
    }));
  };

  return (
    <div className="main-container">
      <div className="label-container">
        <Label className="type" text="Hours" />
      </div>
    
      <Select 
        className="input-container" 
        options={options} 
        placeholder="Select" 
        isSearchable={false} // Disable search functionality
        onChange={handleHoursLeaveChange}
      />
    </div>
  );
};

HoursLeave.propTypes = {
  setUserData: PropTypes.func.isRequired,
};

export default HoursLeave;
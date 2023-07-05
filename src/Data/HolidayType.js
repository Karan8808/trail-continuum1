import React from "react";
import PropTypes from 'prop-types';

import Label from "../Components/BaseComponents/Label";
import Select from "react-select";

import "../Styling/datepicker.css";

const HolidayType = ({ setUserData }) => {
  const options = [
    { value: "casual", label: "Casual Leave" },
    { value: "privilege", label: "Privilege Leave" },
    { value: "sick", label: "Sick Leave" }
  ];

  const handleHolidayTypeChange = (selectedOption) => {
    setUserData(prevData => ({
      ...prevData,
      leavetype: selectedOption.value
    }));
  };

  return (
    <div className="main-container">
      <div className="label-container">
        <Label className="type" text="Leave Type" />
      </div>

      <Select 
        className="select-container" 
        options={options} 
        placeholder="Select" 
        onChange={handleHolidayTypeChange}
      />
    </div>
  );
};

HolidayType.propTypes = {
  setUserData: PropTypes.func.isRequired,
};

export default HolidayType;

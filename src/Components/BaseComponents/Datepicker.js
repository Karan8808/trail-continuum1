import React, { useState } from "react";
import PropTypes from 'prop-types';

import Label from "./Label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import '../../Styling/datepicker.css';

const DatePickerComponent = ({ onDateChange }) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const currentDate = new Date(); // Get the current date

    const handleFromDateChange = (date) => {
        setFromDate(date);

        // Disable dates before the selected "From" date
        setToDate((prevToDate) => {
            if (prevToDate && prevToDate <= date) {
                return null;
            }
            return prevToDate;
        });

        onDateChange(date, toDate); // Pass the dates to the parent component
    };

    const filterWeekend = (date) => {
        const day = date.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
        return day !== 0 && day !== 6; // Return true for weekdays (not Sunday or Saturday)
    };

    return (
        <>
        <div className="main-container">
            <div className="label-container">
                <Label className="label" text="From" />
            </div>

            <DatePicker
                className="content-container"
                selected={fromDate}
                onChange={handleFromDateChange}
                placeholderText="Select date"
                calendarClassName="custom-calendar"
                popperPlacement="bottom" // Position the calendar beneath the input field
                minDate={currentDate} // Set the minimum selectable date to the current date
                filterDate={filterWeekend} // Disable weekends
            />
        </div>

        <div className="main-container">
            <div className="label-container">
                <Label className="label" text="To" />
            </div>

            <DatePicker
                className="content-container"
                selected={toDate}
                onChange={(date) => {
                    setToDate(date);
                    onDateChange(fromDate, date); // Pass the dates to the parent component
                }}
                placeholderText="Select date"
                minDate={fromDate} // Set the minimum selectable date to the "From" date
                calendarClassName="custom-calendar"
                popperPlacement="bottom"
                filterDate={filterWeekend} // Disable weekends
            />
        </div>
        </>
    );
};

DatePickerComponent.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};

export default DatePickerComponent;

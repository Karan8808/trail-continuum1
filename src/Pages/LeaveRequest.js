import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePickerComponent from "../Components/BaseComponents/Datepicker";
import HolidayType from "../Data/HolidayType";
import HoursLeave from "../Data/Hours_Leave";

import { RequestLeave } from "../APIs/APIService";

import { AzureAD } from 'react-aad-msal';
import { authProvider } from '../authProvider';

import '../Styling/leaveRequest.css';

const LeaveRequestComp = ({ closeModal }) => {
  const [isSameDate, setIsSameDate] = useState(false);
  const [userData, setUserData] = useState({
    leavetype: "", 
    noofhours: "", 
  });
  
  const handleDateChange = (fromDate, toDate) => {
    setIsSameDate(fromDate && toDate && fromDate.toDateString() === toDate.toDateString());
  
    // Adjust for timezone offset... format the date strings to MySQL date format (YYYY-MM-DD)
    const timezoneOffset = fromDate.getTimezoneOffset() * 60000; // Offset in milliseconds
    const fromDateString = fromDate ? new Date(fromDate - timezoneOffset).toISOString().split('T')[0] : '';
    const toDateString = toDate ? new Date(toDate - timezoneOffset).toISOString().split('T')[0] : '';

    // Update userData state with formatted date values
    setUserData(prevData => ({
      ...prevData,
      fromdate: fromDateString,
      todate: toDateString
    }));
  };
  
  const countWeekendDays = (startDate, endDate) => {
    const weekendDays = [0, 6]; // Sunday (0) and Saturday (6)
    let count = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      if (weekendDays.includes(currentDate.getDay())) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
  };

  const handleRequestLeave = async () => {
    try {
      const updatedUserData = {
        ...userData,
        empemail: authProvider.getAccount().userName
      };

      // Calculate noofhours if not mentioned by the user, excluding weekends
      if (userData.noofhours === "") {
        const fromDate = new Date(userData.fromdate);
        const toDate = new Date(userData.todate);
        const totalDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1; // Add 1 day for inclusive counting of todate;
        const weekends = countWeekendDays(fromDate, toDate);
        const weekdays = totalDays - weekends;
        updatedUserData.noofhours = weekdays * 8;
      }
  
      const response = await RequestLeave(updatedUserData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      //pop-up message
      toast.success("Leave request sent successfully!");
    
      setTimeout(() => {
        closeModal();
      }, 3000);
    } 
  
    catch (error) {
      console.log("Error requesting leave:", error);
      toast.error("Error requesting leave. Please try again.");
    }
  };

  return ( 
    <AzureAD provider={authProvider}>
      {({ authenticationState }) => (
        <>
          <ToastContainer />
          <DatePickerComponent onDateChange={handleDateChange} />
          <HolidayType setUserData={setUserData} />
          {isSameDate && <HoursLeave setUserData={setUserData} />} 
          <button 
            className="leaveButton" 
            onClick={handleRequestLeave}
          >
            Request Leave
          </button>
        </>
      )}
    </AzureAD>
  );
};

LeaveRequestComp.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default LeaveRequestComp;
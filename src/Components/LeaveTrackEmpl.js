import React, { useState, useEffect } from "react";

import Items from "../Data/Items";
import AccordionComponent from "./BaseComponents/AccordionComponent";
import Modal from "./BaseComponents/Modal";
import LeaveRequestComp from "../Pages/LeaveRequest";

import "../Styling/accordion.css";

import TableComponent from "./BaseComponents/Table";
import { getEmpLeaves, getHolidayList, getLeaveBalance } from "../APIs/APIService";

const LeaveTrackEmpl = () => {
  //only show modal after clicking request leave button
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => { setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); };

  //APIs
  const [holidayList, setHolidayList] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]); // State for leave history
  const [leaveBalance, setLeaveBalance] = useState([]);

  const fetchHolidayList = async () => {
    try {
      const data = await getHolidayList();
      setHolidayList(data);
    } 
    
    catch (error) {
      console.log(error);
    }
  };

  const fetchLeaveHistory = async () => {
    try {
      const data = await getEmpLeaves();
      setLeaveHistory(data);
    } 
    catch (error) {
      console.log(error);
    }
  };

  const fetchLeaveBalance = async () => {
    try {
      const data = await getLeaveBalance();
      setLeaveBalance(data);
    } 
    
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Items.find((item) => item.item === "Holiday List")) {
      fetchHolidayList();
    }

    if (Items.find((item) => item.item === "Leave History")) {
      fetchLeaveHistory();
    }

    if (Items.find((item) => item.item === "Leave Balance")) {
      fetchLeaveBalance();
    }
  }, []);

  return (
    <div className="frame">
      <div className="top">
        <h1 className="title">Employee Leave Tracker</h1>
        <button className="requestLeave" onClick={openModal}>
          Request Leave
        </button>
      </div>

      <div className="content">
        <div className="accordionBlock">
          {Items.map((val, index) => (
            <AccordionComponent
              key={index}
              item={val.item}
              content=
              { val.item === "Leave History" 
                ? ( <TableComponent
                      columns={["From Date", "To Date", "Leave Type", "No of Hours"]}
                      // data = {leaveHistory} ... we dont want all data, limit the data to be seen by user like ->
                      data={leaveHistory.map(item => ({
                        "From Date": item.fromdate,
                        "To Date": item.todate,
                        "Leave Type": item.leavetype,
                        "No of Hours": item.noofhours
                      }))}
                    />
                  ) 
                : val.item === "Holiday List" 
                  ? ( <TableComponent
                        columns={["S. No", "Holiday", "Date", "Day of Week"]}
                        data={holidayList}
                      />
                    ) 
                  
                  : val.item === "Leave Balance" 
                    ? ( <TableComponent
                          columns={["Leave Type", "Remaining Leaves"]}
                          data={leaveBalance.map((item) => {
                            const [leaveType, remainingHolidays] = item.split(":");
                            return {
                              "Leave Type": leaveType.trim(),
                              "Remaining Holidays": parseFloat(remainingHolidays.trim())
                            };
                          })}
                        />
                      ) 
                    
                    : ( val.content )
              }

              onClick={() => {
                if (val.item === "Leave History") {
                  fetchLeaveHistory();
                } 
                else if (val.item === "Holiday List") {
                  fetchHolidayList();
                }
                else if (val.item === "Leave Balance") {
                  fetchLeaveBalance();
                }
              }}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <LeaveRequestComp openModal={openModal} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default LeaveTrackEmpl;
import React, { useState } from "react";
// import PropTypes from 'prop-types';

import Label from "../Components/BaseComponents/Label";
import InputField from "../Components/BaseComponents/InputField";

import '../Styling/datepicker.css';

const pattern_ = "^(?:[1-7](?:.[05])?|0.(?:5|0[5-9]))$";

const Hours = () => {
    //stores data, hours field
    const [formData, setFormData] = useState({
        hours: "",
    });

    const [errors, setErrors] = useState({});

    //handle changes in the input field.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        const validationErrors = {};
        if (value === "")  {
            validationErrors[name] = {
                type: "required",
            };
        }
        else if (!value.match(pattern_)) {
            validationErrors[name] = {
                type: "pattern",
            };
        }
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...validationErrors,
        }));

        // Update the error message to "Please enter a value" when the input is cleared
        if (value === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: {
                    type: "required",
                },
            }));
        } 
        
        // Remove the error for the current input field if the value matches the pattern
        else if (value.match(pattern_)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        }
    };

    return (
        <div className="main-container ">
            <div className="label-container">
                <Label className="type" text="Hours" />
                <InputField 
                    className="input-container"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter the no. of hours"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    errors={errors}
                    validation={{
                        required: true,
                        pattern: {
                            value: /^(?:[1-7](?:\.[05])?|0\.(?:5|0[5-9]))$/,
                            message: "Enter only valid office hours."
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Hours;

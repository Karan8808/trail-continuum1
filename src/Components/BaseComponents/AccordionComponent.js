import React, { useState } from "react";
import '../../Styling/accordion.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AccordionComponent = ({ item, content }) => {
    const [text, setText] = useState(false);

    const display = () => {
        setText(!text); 
    }
        
    return (
        <div className="check">
            <div className="item-container">
                <h2>{item}</h2>
                <p className="icon" onClick={display}>
                    {text ? (
                        <FontAwesomeIcon icon={faAngleDown} rotation={180} className="icon" />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} className="icon" />
                    )} 
                </p>
            </div>

            {/* If text variable has a truthy value (not null, undefined, false, 0, empty string), 
                then a nested div, class name "contentAccordion" is rendered, and the content variable 
                is inserted as its content. 
            */}
            <div className="content">
                {text && <div className="contentAccordion">{content}</div>}
            </div>
        </div>
    );
};

export default AccordionComponent;
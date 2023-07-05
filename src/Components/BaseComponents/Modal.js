import React from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import '../../Styling/modal.css';

const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="modalCloseButton" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserInfo = ({ abbreviatedName, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='user-info'>
      <div className='username'>
        <span onClick={toggleDropdown}>{abbreviatedName}</span>
        {showDropdown && (
          <DropdownMenu handleLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

const DropdownMenu = ({ handleLogout }) => {
  return (
    <div className='dropdown-menu'>
      <ul>
        <li onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out 
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;

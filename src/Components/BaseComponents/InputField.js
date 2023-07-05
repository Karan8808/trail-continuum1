import React from 'react';

function InputField({ className, type, placeholder, name, value, onChange, validation, errors }) {
  const handleInputChange = (event) => {
    const { value } = event.target;
    
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <div>
      <input
        className={className}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInputChange}
      />

      <div className='error'>
        {errors[name]?.type === "required" && `Please enter ${name.toLowerCase()}!`}
        {errors[name]?.type === "pattern" && `${validation.pattern.message}`}
      </div>
    </div>
  );
}

export default InputField;

import React from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {name} name name of the input
 * @param {type} type id of the input
 * @param {type} type type of the input
 * @param {placeholder} placeholder placeholder of the input
 * @param {value} value value of the input
 * @param {onChange} onChange function to be called when the input changes
 * @param {onBlur} onBlur function to be called when the input loses focus
 */

export const InputComponent = ({
  name,
  onChange,
  onBlur,
  values,
  type = "text",
  id,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        className="capitalize shadow appearence border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-100"
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={values}
      />
    </div>
  );
};

InputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

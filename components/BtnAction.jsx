import React from "react";
import { Icon } from "./Icon";

/**
 *
 * @param {d} d value del icon example  "M2.458 12C3...."
 * @param {name} name nombre el boton
 * @param {handleAction} handleAction funcion para la accion del boton
 * @param {color} color color del b
 * @returns
 */

export const BtnAction = ({ d, name, handleAction, color }) => {
  return (
    <button
      onClick={handleAction}
      className={` ${
        color ? color : "bg-blue-500"
      }flex flex-col justify-center items-center cursor-pointer p-2 rounded-lg text-center text-3xl font-bold `}
    >
      {name}
      <Icon d={d} />
    </button>
  );
};

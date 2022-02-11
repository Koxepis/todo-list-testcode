import React from "react";
import { GrEdit, GrTrash } from "react-icons/gr";

export const TodoCard = ({ todoList, handleEdit, handleRemove }) => {
  return (
    <li className="relative bg-white shadow-sm py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
      <div className="w-full flex justify-between">
        <div className="max-w-xs">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-md capitalize font-medium text-gray-900 truncate">
            {todoList.title}
          </p>
          <p className="text-sm text-gray-500 mt-4">{todoList.description}</p>
        </div>

        <div className="flex flex-row max-h-8 items-center space-x-4">
          <p className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
            {todoList.date.getMonth() + 1} / {todoList.date.getDate()} /{" "}
            {todoList.date.getFullYear()}
          </p>

          <div className="flex">
            <span className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-l">
              <GrEdit size={12} onClick={() => handleEdit(todoList)} />
            </span>
            <span className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-r">
              <GrTrash size={12} onClick={() => handleRemove(todoList)} />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

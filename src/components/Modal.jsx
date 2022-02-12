import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GrFormClose } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";

const Modal = ({ editToDo, setShowModal, edited }) => {
  const [startDate, setStartDate] = useState();
  const [title, setTitle] = useState(edited ? edited.title : "");
  const [description, setDescription] = useState(
    edited ? edited.description : ""
  );

  const updateToDo = () => {
    if (edited) {
      console.log("editing");
      editToDo(true, {
        ...edited,
        title: title,
        description: description,
        date: startDate,
      });
      setShowModal();
      return;
    }

    if (!title || !description) {
      alert("Data Required");
      return;
    }

    const tmpToDo = {
      id: uuidv4(),
      title: title,
      description: description,
      date: startDate,
    };

    editToDo(false, tmpToDo);
    setShowModal();
  };

  return (
    <div className="absolute h-screen w-screen flex justify-center items-center bg-black/50">
      <div className="relative w-1/3 p-8 flex flex-col bg-white rounded-lg">
        <button
          onClick={() => setShowModal(false)}
          className="mb-6 -mt-6 -ml-6"
        >
          <GrFormClose size={24} />
        </button>

        <div className="flex w-full space-x-4 mb-4">
          <div className="min-w-[60%]">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-1.5 bg-white border shadow-sm border-slate-400 placeholder-slate-400 focus:outline-none focus:border-slate-200 block w-full rounded-md sm:text-sm font-normal"
              placeholder="Add Tittle"
            />
          </div>

          <div className="">
            <label htmlFor="date">Date</label>
            <DatePicker
              id="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              className="px-3 py-1.5 bg-white border shadow-sm border-slate-400 placeholder-slate-400 focus:outline-none focus:border-slate-200 block w-full rounded-md sm:text-sm font-normal"
              placeholderText="mm/dd/yyyy"
              showDisabledMonthNavigation
            />
          </div>
        </div>

        <div className="mb-4 inline-block">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-1.5 w-full h-24 leading-[200%] resize overflow-hidden bg-white border shadow-sm border-slate-400 placeholder-slate-400 focus:outline-none focus:border-slate-200 block rounded-md sm:text-sm font-normal"
            placeholder="Add Description"
          />
        </div>

        <div className="flex w-full justify-end space-x-4 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-50 hover:bg-gray-200 shadow-sm border border-gray-400 text-gray-800 font-normal text-sm py-1.5 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={updateToDo}
            className="bg-green-500 hover:bg-green-600 shadow-sm border border-gray-400 text-gray-50 font-normal text-sm py-1.5 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import _ from "lodash";
import { TodoCard } from "./components/TodoCard";
import { GrSearch } from "react-icons/gr";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [edited, setEdited] = useState();
  const [searched, setSearched] = useState("");
  const [sortOrder, setSortOrder] = useState("Latest");
  const [searchedToDo, setSearchedToDo] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [whatevList, setWhatevList] = useState([]);

  useEffect(() => {
    if (isSearching) {
      setWhatevList(searchedToDo);
    } else {
      setWhatevList(toDoList);
    }
  }, [isSearching, searchedToDo, toDoList]);

  const handleCloseModal = () => {
    setEdited(null);
    setShowModal(false);
  };

  const handleAddToDo = () => {
    setShowModal(true);
  };

  const editToDo = (isEditing, newItem) => {
    if (isEditing) {
      const tmptoDoList = [...toDoList];
      const itemIdx = toDoList.indexOf(edited);

      if (itemIdx !== -1) {
        tmptoDoList[itemIdx] = newItem;
      }

      setToDoList(tmptoDoList);
      handleCloseModal();
      return;
    }

    const tmpToDoList = [...toDoList, newItem];
    setToDoList(tmpToDoList);
  };

  const handleEdit = (item) => {
    setEdited(item);
    setShowModal(true);
  };

  const handleRemove = (item) => {
    const tmpIdx = toDoList.findIndex((todos) => todos.id === item.id);
    const tmpToDoList = [...toDoList];

    tmpToDoList.splice(tmpIdx, 1);
    setToDoList(tmpToDoList);

    if (searchedToDo.length > 0) {
      const tmpIdx = searchedToDo.findIndex((todos) => todos.id === item.id);
      const tmpToDoList = [...searchedToDo];

      tmpToDoList.splice(tmpIdx, 1);
      setSearchedToDo(tmpToDoList);
    }
  };

  const handleSort = () => {
    let tmpToDoList = [...toDoList];
    let newTmpToDoList;

    if (searchedToDo.length > 0) {
      newTmpToDoList = [...searchedToDo];
    }

    if (sortOrder === "Latest") {
      setSortOrder("Oldest");
      tmpToDoList = _.sortBy(tmpToDoList, (todos) => todos.date);
      setToDoList(tmpToDoList);

      newTmpToDoList = _.sortBy(newTmpToDoList, (todos) => todos.date);
      setSearchedToDo(newTmpToDoList);
    } else {
      setSortOrder("Latest");
      tmpToDoList = _.sortBy(tmpToDoList, (todos) => -todos.date);
      setToDoList(tmpToDoList);

      newTmpToDoList = _.sortBy(newTmpToDoList, (todos) => -todos.date);
      setSearchedToDo(newTmpToDoList);
    }
  };

  const handleInputSearch = () => {
    setIsSearching(true);
    let tmpToDoList = [...toDoList];

    if (searched === "") {
      setToDoList(tmpToDoList);
    }

    tmpToDoList = _.filter(tmpToDoList, (todos) => {
      if (
        todos.title.includes(searched) ||
        todos.description.includes(searched)
      ) {
        return true;
      }
    });

    console.log("tmpToDoList: ", tmpToDoList);
    setSearchedToDo(tmpToDoList);
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-white shadow-sm mt-20 p-4 w-2/4">
        <h1 className="text-3xl font-medium max-w-fit">Todo List!</h1>

        <div className="flex justify-center items-center my-4 min-w-fit space-x-4">
          <div className="shadow-sm">
            <button
              onClick={handleAddToDo}
              className="bg-white hover:bg-gray-200 shadow-sm border-r border-l border-b border-t border-gray-200 text-gray-800 font-normal text-sm py-1.5 px-4 rounded-l"
            >
              Add New List
            </button>
            <button
              onClick={handleSort}
              className="bg-white hover:bg-gray-200 shadow-sm border-r border-b border-t border-gray-200 text-gray-800 font-normal text-sm py-1.5 px-4 rounded-r"
            >
              Sorted by: {sortOrder}
            </button>
          </div>

          <div className="shadow-sm">
            <div className="relative flex space-x-4 justify-center items-center w-full">
              <input
                type="text"
                id="search"
                className="px-3 py-1.5 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-200 block w-full rounded-md sm:text-sm font-normal"
                placeholder="Search Item"
                onInput={(e) => {
                  if (e.target.value === "") {
                    setIsSearching(false);
                  }
                  setSearched(e.target.value);
                }}
              />
              <div className="absolute right-0 top-0 py-0 h-full">
                <button
                  onClick={handleInputSearch}
                  className="bg-gray-200 h-full hover:bg-gray-400 hover:text-gray-50 text-gray-800 font-normal text-sm px-3 rounded-r"
                >
                  <GrSearch size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toDoList && toDoList.length > 0 && (
        <ul className="divide-y divide-gray-200 mt-6 w-2/4">
          {whatevList.map((todoItem) => {
            return (
              <TodoCard
                key={todoItem.id}
                todoList={todoItem}
                handleEdit={handleEdit}
                handleRemove={() => handleRemove(todoItem)}
              />
            );
          })}
        </ul>
      )}

      {showModal && (
        <Modal
          editToDo={editToDo}
          setShowModal={handleCloseModal}
          edited={edited}
        />
      )}
    </div>
  );
}

export default App;

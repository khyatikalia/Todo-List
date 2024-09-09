import React from "react";
import { Trash2 } from "lucide-react";
import { Check } from "lucide-react";
import { Pencil } from "lucide-react";
const List = ({
  text,
  handleDelete,
  id,
  toggle,
  isComplete,
  state,
  setState,
  saveEdit,
  startEditing,
  getCompletedTodos,
}) => {
  return (
    <div className="flex items-center m-3 justify-between  group/edit transition ease">
      {state?.id === id ? (
        <input
          value={state.text}
          onChange={(e) =>
            setState((prev) => {
              return { ...prev, text: e.target.value };
            })
          }
          className="px-2 bg-slate-100 bg-transparent w-3/4 border-2 border-slate-300 text-lg rounded-xl outline-none"
          type="text"
        />
      ) : (
        <div
          onClick={() => {
            toggle(id);
          }}
          className="flex gap-3 items-center justify-center"
        >
          <div
            className={`flex items-center justify-center size-6 border-2 border-orange-600 rounded-full `}
          >
            <Check
              strokeWidth={4}
              className={` size-4 bg-orange-600 text-white stroke-extrabold rounded-full ${
                isComplete ? "visible opacity-100" : "invisible opacity-0"
              }`}
            />
          </div>
          <input className="hidden" type="radio" />

          <label
            className={`text-xl ${isComplete ? "line-through" : ""}`}
            htmlFor=""
          >
            {text}
          </label>
        </div>
      )}
      <div className="flex flex-end gap-2 items-center ">
        {state?.id === id ? (
          <button
            onClick={saveEdit}
            className="bg-green-500 px-3 py-1 rounded text-white"
          >
            Save
          </button>
        ) : (
          <button onClick={() => startEditing(id, text)}>
            <Pencil className="text-orange-600" />
          </button>
        )}
        <Trash2
          onClick={() => {
            handleDelete(id);
          }}
          className=" text-orange-600"
        />
      </div>
    </div>
  );
};

export default List;

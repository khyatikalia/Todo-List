import React from "react";
import todo_icon from "../assets/todo_icon.svg";
import List from "./List";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Todo = () => {
  const [todolist, setTodolist] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [value, setValue] = useState("");
  const add = () => {
    if (value === "") {
      return;
    }
    const newTodo = {
      text: value,
      id: Date.now(),
      isComplete: false,
    };
    setTodolist((prev) => [...prev, newTodo]);
    setValue("");
  };
  const handleDelete = (id) => {
    setTodolist((prevtodo) => {
      return prevtodo.filter((todo) => todo.id !== id);
    });
  };

  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (id, text) => {
    setEdit({ id, text });
  };

  const saveEdit = () => {
    setTodolist((prevtodo) =>
      prevtodo.map((todo) =>
        todo.id === edit.id ? { ...todo, text: edit.text } : todo
      )
    );
    setEdit(null);
  };

  const toggle = (id) => {
    setTodolist((prevtodo) => {
      return prevtodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-2xl p-7 items-center ">
        <div className=" place-self-center w-full max-w-md  ">
          <div className="flex items-center gap-2 mt-7 ">
            <img className="w-8" src={todo_icon} />
            <h1 className="text-3xl font-semibold">TO-DO LIST </h1>
          </div>
          <div className="flex items-center rounded-full my-7 bg-gray-200 ">
            <input
              className="bg-transparent w-full h-14  px-9 placeholder:text-late-900 outline-none"
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Add Your Task"
            />
            <button
              onClick={add}
              className="bg-orange-600 w-[150px] h-14 px-9 rounded-full text-white text-md cursor-pointer font-semibold "
            >
              ADD +
            </button>
          </div>
          <div className="h-[300px] overflow-scroll">
            {todolist.map((item, index) => {
              return (
                <List
                  key={index}
                  text={item.text}
                  id={item.id}
                  handleDelete={handleDelete}
                  isComplete={item.isComplete}
                  toggle={toggle}
                  state={edit}
                  setState={setEdit}
                  saveEdit={saveEdit}
                  startEditing={startEditing}
                />
              );
            })}
          </div>
        </div>
        <div className="p-5  block text-lg text-orange-600 font-semibold text-center">
          Completed {todolist.filter((todo) => todo.isComplete).length}/{" "}
          {todolist.length || 0}
        </div>
      </div>
    </>
  );
};

export default Todo;

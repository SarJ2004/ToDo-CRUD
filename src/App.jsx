// so this is how it feels!
import React from "react";
import { useState } from "react";
import Item from "./Item";
let nextId = 0;
let timeValue = null;
// console.log(histList);
export default function App() {
  const [item, setItem] = useState("");
  let histList = JSON.parse(localStorage.getItem("listItems"));
  const [list, setList] = useState(histList == null ? [] : histList);
  let stringifiedList = JSON.stringify(list);
  localStorage.setItem("listItems", stringifiedList);
  function handleEnter(e) {
    if (e.key === "Enter") handleAddClick();
  }

  function handleInput(e) {
    setItem(e.target.value);
  }
  function handleAddClick(e) {
    setList([...list, { id: nextId++, name: item }]);
    console.log(nextId);
  }
  function handleDelete(itemId) {
    //creates a new array with the elemts whose id is not equal to the id of the guy we clicked on

    setTimeout(() => setList(list.filter((item) => item.id !== itemId)), 1200);
  }
  // function handleChangeTask(task) {
  //   setTasks(
  //     tasks.map((t) => {
  //       if (t.id === task.id) {
  //         return task;
  //       } else {
  //         return t;
  //       }
  //     })
  //   );
  // }

  function handleChange(item) {
    setList(
      list.map((i) => {
        if (i.id === item.id) {
          return item;
        } else {
          return i;
        }
      })
    );
  }

  return (
    <div className="todo">
      <h1>To-Do-App</h1>
      <input
        value={item}
        onChange={handleInput}
        onKeyDown={(e) => {
          handleEnter(e);
          if (e.key === "Enter") setItem("");
        }}
        id="inp"
      />
      <button
        onClick={() => {
          handleAddClick();
          setItem("");
        }}>
        Add
      </button>
      <button
        onClick={() => {
          let response = window.confirm(
            "Do you REALLY want to delete your to-do?"
          );
          response && setList([]);
        }}
        id="delete-btn">
        Delete
      </button>
      <ol>
        {list.map(
          (item) =>
            item.name && (
              <li key={item.id}>
                <Item
                  item={item}
                  onChange={handleChange}
                  onDelete={handleDelete}
                />
              </li>
            )
        )}
      </ol>
    </div>
  );
}

// {item.name}{" "}
// <input
//   type="checkbox"
//   onChange={(e) => {
//     if (e.target.checked === true) handleDelete(item.id);
//     else clearInterval(timeValue);
//   }}
// />

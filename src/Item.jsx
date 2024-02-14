import { useState } from "react";

export default function Item({ item, onChange, onDelete }) {
  const [edit, setEdit] = useState(false);
  let itemContent;
  let timeValue = null;
  if (edit) {
    itemContent = (
      <>
        <input
          value={item.name}
          onChange={(e) => {
            e.target.value && onChange({ ...item, name: e.target.value });
          }}
        />
        <button
          onClick={() => {
            setEdit(false);
          }}>
          Save
        </button>
      </>
    );
  } else {
    itemContent = (
      <>
        {item.name}
        <button
          onClick={() => {
            setEdit(true);
          }}>
          Edit
        </button>
      </>
    );
  }
  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked === true) {
            onDelete(item.id);
          }
        }}
      />
      {itemContent}
    </>
  );
}

import React from "react";

import mark from "../../assets/img/mark.svg";
import editTask from "../../assets/img/pen.svg";
import deleteTask from "../../assets/img/closeList.svg";

const TasksItem = ({
  list,
  completed,
  onRemove,
  text,
  id,
  onEdit,
  onComplete,
}) => {
  const onChangeCheckbox = (e) => {
    onComplete(list.id, id, e.target.checked);
  };
  return (
    <div>
      <div className="tasks__items">
        <div className="checkbox">
          <input
            onChange={onChangeCheckbox}
            id={`task-${id}`}
            type="checkbox"
            checked={completed}
          />
          <label htmlFor={`task-${id}`}>
            <img src={mark} alt="Mark" />
          </label>
        </div>
        <p>{text}</p>
        <div className="tasks__items-actions">
          <div onClick={() => onEdit(list.id, { id, text })}>
            <img src={editTask} alt="Edit" />
          </div>
          <div onClick={() => onRemove(list.id, id)}>
            <img className="remove" src={deleteTask} alt="Remove" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksItem;

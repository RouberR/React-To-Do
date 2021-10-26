import React from "react";
import Badge from "./Badge";

import "./List.scss";
import closeList from "../../assets/img/closeList.svg";


const List = ({ items, isRemovable, active, onRemove, clickItem, activeItem }) => {

 const removeList = (item) => {
  if (window.confirm("Вы действительно хотите удалить лист?")){
    onRemove(item);
  }
  }
  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <li  onClick={clickItem ? () => clickItem(item) : null} key = {item.id} className={item.active ? 'active' : activeItem && activeItem.id === item.id ? 'active' : ''}>
            <i>{item.icon ? item.icon : <Badge color={item.color.name}/>}</i>
            <span>{item.name} {item.tasks && `(${item.tasks.length})` }</span>
            {isRemovable && <img onClick={() => removeList(item)} className="list__remove-icon" src={closeList} alt="Remove"/>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;


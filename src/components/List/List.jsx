import React from "react";
import Badge from "./Badge";

import "./List.scss";
import closeList from "../../assets/img/closeList.svg";


const List = ({ items, isRemovable, active, onRemove }) => {
 const removeList = (item) => {
  if (window.confirm("Вы действительно хотите удалить лист?")){
    onRemove(item);
  }
  }
  return (
    <div>
      <ul className="list">
        {items.map((item, index) => (
          <li  key = {index} className={item.active ? 'active' : ''}>
            <i>{item.icon ? item.icon : <Badge color={item.color.name}/>}</i>
            <span>{item.name}</span>
            {isRemovable && <img onClick={() => removeList(item)} className="list__remove-icon" src={closeList} alt="Remove"/>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;

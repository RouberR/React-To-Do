import React from "react";
import Badge from "./Badge";

import "./List.scss";


const List = ({ items, isRemovable }) => {
  return (
    <div>
      <ul className="list">
        {items.map((item, index) => (
          <li  key = {index} className={item.active ? 'active' : ''}>
            <i>{item.icon ? item.icon : <Badge color={item.color}/>}</i>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;

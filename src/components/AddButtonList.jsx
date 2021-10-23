import React from "react";

import List from "./List/List";
import Badge from "./List/Badge";

import "./AddButtonList.scss";
import closeSVG from "../assets/img/close.svg";



const AddButtonList = ({ colors }) => {
  const [visiblePopup, setVisiblePopup] = React.useState(true);
  const [selectedColor, setSelectedColor] = React.useState(colors[0].id);

  const onClickPopup = () => {
    setVisiblePopup(!visiblePopup);
  };
  

  console.log(selectedColor);

  return (
    <div className="add-list">
      <div onClick={onClickPopup} className="add-list__button">
        <List
          items={[
            {
              icon: (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1V11"
                    stroke="#868686"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 6H11"
                    stroke="#868686"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              name: "Добавить список",
            },
          ]}
        />
      </div>
      <div className="add-list__popup" hidden={visiblePopup}>
        <img onClick={onClickPopup} className="add-list__popup-close-btn" src={closeSVG} alt="Close"/>
        <input className="field" placeholder="Название папки" />
        <div className="add-list__popup-colors">
       
          <ul>
            <li>
              {colors.map((color) => (
                <Badge
                  active={selectedColor}
                  key={color.id}
                  color={color.name}
                  onClick={() => setSelectedColor(color.id)}
                  className={selectedColor === color.id && "active"}
                />
              ))}
            </li>
          </ul>
         
        </div>
        <button className="button">Добавить</button>
      </div>
    </div>
  );
};

export default AddButtonList;

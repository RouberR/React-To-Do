import React from "react";

import List from "../List/List";
import Badge from "../List/Badge";

import "./AddButtonList.scss";
import closeSVG from "../../assets/img/close.svg";
import axios from "axios";

const AddList = ({ colors, onAddList }) => {
  const [visiblePopup, setVisiblePopup] = React.useState(true);
  const [selectedColor, setSelectedColor] = React.useState(3);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState("");

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClickPopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const onChangeInput = (e) => {
    setInputText(e.target.value);
  };

  const addList = () => {
    if (!inputText) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    axios
      .post("/lists", {
        name: inputText,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((color) => color.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAddList(listObj);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Ошибка при добавлении списка");
      })
      .finally(() => {
        onClickPopup();
        setInputText("");
        setSelectedColor(colors[0].id);
      });
  };

  console.log(inputText);

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
        <img
          onClick={onClickPopup}
          className="add-list__popup-close-btn"
          src={closeSVG}
          alt="Close"
        />
        <input
          onChange={onChangeInput}
          value={inputText}
          className="field"
          placeholder="Название папки"
        />
        <div className="add-list__popup-colors">
          {colors && (
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
          )}
        </div>
        <button onClick={addList} className="button">
          {isLoading ? "Добавление..." : "Добавить"}
        </button>
      </div>
    </div>
  );
};

export default AddList;

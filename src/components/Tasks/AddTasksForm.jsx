import axios from "axios";
import React from "react";
import addSVG from "../../assets/img/add.svg";
const AddTasksForm = ({list, onAddTasks}) => {
  const [toggleFormVisible, setToggleFormVisible] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const clickButton = () => {
    setToggleFormVisible(!toggleFormVisible);
    setInputValue("");
  };
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  }
  const addTask = () => {
    setIsLoading(true)
    const obj = {
        listId: list.id,
        text: inputValue,
        completed: false
    }
    axios.post("http://localhost:3001/tasks", obj).then(( {data} ) => {
   
    onAddTasks(list.id, data);
    
    }).catch(() => {
      alert("Ошибка при добавлении задачи")
    })
    .finally(() => {
      setIsLoading(false);
      clickButton();
    })
    }
    

  

  return (
    <div className="tasks__form">
      {toggleFormVisible ? (
        <div
          onClick={clickButton}
          hidden={toggleFormVisible}
          className="tasks__form-new"
        >
          <img src={addSVG} alt="Add" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input onChange={onChangeInput} className="field" value={inputValue} placeholder="Текст задачи" />
          <button disabled={isLoading} onClick={addTask} className="button">{isLoading ? "Добавление задачи" : "Добавить задачу"}</button>
          <button onClick={clickButton} className="button button--grey">Отмена</button>
        </div>
      )}
    </div>
  );
};

export default AddTasksForm;

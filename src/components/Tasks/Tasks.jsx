import axios from "axios";

import "./Tasks.scss";
import edit from "../../assets/img/pen.svg";
import mark from "../../assets/img/mark.svg";
import AddTasksForm from "./AddTasksForm";

const Tasks = ({ list, onEditTitle, onAddTasks, withoutEmpty }) => {
  const editTitle = () => {
    const newTitle = window.prompt("Введите название заголовка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка!");
        });
    }
  };

  return (
    <div clasName="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={edit} alt="EditIcon" />
      </h2>

      {!withoutEmpty && !list.tasks.length && (
        <h2 className="notTasks">Задачи отсутствуют</h2>
      )}
      {list.tasks &&
        list.tasks.map((task) => (
          <div key={task.id} className="tasks__items">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox" />
              <label htmlFor={`task-${task.id}`}>
                <img src={mark} alt="Mark" />
              </label>
            </div>
            <input readOnly value={task.text} />
          </div>
        ))}
      <AddTasksForm list={list} onAddTasks={onAddTasks} />
    </div>
  );
};
export default Tasks;

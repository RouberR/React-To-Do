import axios from "axios";

import "./Tasks.scss";
import edit from "../../assets/img/pen.svg";

import AddTasksForm from "./AddTasksForm";
import TasksItem from "./TasksItem";
import { Link } from "react-router-dom";

const Tasks = ({
  list,
  onEditTitle,
  onAddTasks,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Введите название заголовка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка!");
        });
    }
  };

  return (
    <div clasName="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={edit} alt="EditIcon" />
        </h2>
      </Link>

      {!withoutEmpty && list.tasks && !list.tasks.length && (
        <h2 className="notTasks">Задачи отсутствуют</h2>
      )}

      {list.tasks &&
        list.tasks.map((task) => (
          <TasksItem
            key={task.id}
            list={list}
            onRemove={onRemoveTask}
            {...task}
            onEdit={onEditTask}
            onComplete={onCompleteTask}
          />
        ))}

      <AddTasksForm key={list.id} list={list} onAddTasks={onAddTasks} />
    </div>
  );
};
export default Tasks;

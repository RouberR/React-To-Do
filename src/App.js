import React from "react";
import axios from "axios";
import { Route, useHistory, useLocation } from "react-router-dom";

import { AddList, List, Tasks } from "./components";

import listSVG from "./assets/img/list.svg";

function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  let history = useHistory();

  React.useEffect(() => {
    axios
      .get("/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  let location = useLocation();
  React.useEffect(() => {
    const listId = location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, location.pathname]);

  const onRemove = (item) => {
    axios.delete("/lists/" + item.id).then(() => {
      const newList = lists.filter((items) => items.id !== item.id);
      setLists(newList);
    });
  };
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      console.log(listId);
      console.log(lists);
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete("/tasks/" + taskId).catch(() => {
        alert("Не удалось удалить задачу!");
      });
    }
  };

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTasks = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTitle = (id, newTitle) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = newTitle;
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTask = (listId, taskObj) => {
    const newTitle = window.prompt("Введите название заголовка", taskObj.text);
    if (newTitle) {
      const newList = lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.map((task) => {
            if (task.id === taskObj.id) {
              task.text = newTitle;
            }
            return task;
          });
        }
        return list;
      });
      setLists(newList);
      axios
        .patch("/tasks/" + taskObj.id, {
          text: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка!");
        });
    }
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
            console.log(task.completed);
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("/tasks/" + taskId, {
        completed,
      })
      .catch(() => {
        alert("Не удалось обновить задачу!");
      });
  };

  const onClickItem = (item) => {
    history.push(`/lists/${item.id}`);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          clickItem={() => {
            history.push(`/`);
          }}
          items={[
            {
              icon: <img src={listSVG} alt="icon" />,
              name: "Все задачи",
              active: !activeItem,
            },
          ]}
        />

        {lists ? (
          <List
            items={lists}
            isRemovable={true}
            onRemove={onRemove}
            clickItem={onClickItem}
            activeItem={activeItem}
          />
        ) : (
          <h3>"Загрузка..."</h3>
        )}
        <AddList onAddList={onAddList} colors={colors} />
      </div>

      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map((list) => (
              <Tasks
                key={list.id}
                list={list}
                onEditTitle={onEditTitle}
                onAddTasks={onAddTasks}
                withoutEmpty
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
              />
            ))}
        </Route>
        <Route path="/lists/:id" exact>
          {lists && activeItem && (
            <Tasks
              list={activeItem}
              onEditTitle={onEditTitle}
              onAddTasks={onAddTasks}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;

import "./Tasks.scss";
import edit from "../../assets/img/pen.svg";
import mark from "../../assets/img/mark.svg";
const Tasks = ({list}) => {
  return (
      
    <div clasName="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img src={edit} alt="EditIcon" />
      </h2>

     
        {
            list.tasks.map((task) => (  
            <div key = {task.id} className="tasks__items">
            <div className="checkbox">
             <input  id={`task-${task.id}`} type="checkbox" />
             <label htmlFor={`task-${task.id}`}><img src={mark}/></label>
            </div>
            <input readOnly value={task.text}/>
            </div>
            )
        )
       
        }




       
  
    </div>
  );
};
export default Tasks;

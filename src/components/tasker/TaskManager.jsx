import React from "react";
import {useState} from "react";
import {nanoid} from "nanoid";
import "@/styles/tasker.css";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import Todo from "./Todo";
import Form from "./Form";
import FilterButton from "./FilterButton";

const TaskManager = (props) => {

    function addTask(name){
        const newTask = {id: `todo${nanoid()}`, name, completed: false};
        setTasks([...tasks, newTask]);
      };
    
      function deleteTask(id){
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
      };
    
      const [tasks, setTasks] = useState(props.tasks);
    
      const taskList = tasks?.map((task) => (
        <Todo 
          id={task.id} 
          name={task.name} 
          completed={task.completed} 
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
        />)
      );
    
      const filterView = props.filters?.map((filter) => (
        <FilterButton 
          id={filter.id}
          name={filter.name}
          key={filter.id}
        />)
      );
    
      const notCompleted = taskList.filter(t => !t.props.completed).length;
      const taskNoun = notCompleted !== 1 ? "tasks" : "task";
      const hTasksRemaining = `${notCompleted}/${taskList.length} ${taskNoun}`;
    
      function toggleTaskCompleted(id){
        const updatedTasks = tasks.map((task) => {
          if(id === task.id){
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        setTasks(updatedTasks);
      };

    return (
        <div className="todoapp stack-large">
            <h1>Task Manager</h1>

            <Form onSubmit={addTask}/>

            <div className="filters btn-group stack-exception">
                {filterView}
            </div>
            
            <h2 id="list-heading">{hTasksRemaining} remaining</h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    );
};

export default TaskManager;
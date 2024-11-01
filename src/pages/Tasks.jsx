import React from "react";
import TaskManager from "../components/tasker/TaskManager";

const TodoList = [
    { id: "todo0", name: "Eat", completed: true },
    { id: "todo1", name: "Sleep", completed: false },
    { id: "todo2", name: "Repeat", completed: false }
  ];
  
  const FilterList = [
    { id: "filt0", name: "All" },
    { id: "filt1", name: "Active" },
    { id: "filt2", name: "Completed" }
  ];

const Tasks = () => {
    return (
      <>
        <TaskManager tasks={TodoList} filters={FilterList} />
      </>
    );
};

export default Tasks;
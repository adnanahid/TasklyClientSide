import { useContext, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import useTask from "../hooks/useTask";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [inputOpen, setInputOpen] = useState("");
  const { tasks, refetch } = useTask();

  const categories = ["todo", "in progress", "done"];
  const [taskOrder, setTaskOrder] = useState({});

  const categorizedTasks = categories.reduce((acc, category) => {
    acc[category] = tasks
      .filter((task) => task.category === category)
      .sort((a, b) => (taskOrder[a._id] ?? 0) - (taskOrder[b._id] ?? 0));
    return acc;
  }, {});

  const handleTaskSubmit = (e, category) => {
    e.preventDefault();
    const task = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: user?.email,
      date: new Date(),
      category,
    };
    axios
      .post("http://localhost:3000/tasks", task)
      .then((response) => {
        const newTask = response.data;
        toast.success("Added Successfully");
        setInputOpen(null);
        refetch();
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        toast.success("Task deleted successfully");
        refetch();
      })
      .catch(() => toast.error("Error deleting task"));
  };

  const moveTask = (dragIndex, hoverIndex, category) => {
    const draggedTask = categorizedTasks[category][dragIndex];
    const updatedTasks = [...categorizedTasks[category]];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);

    const newTaskOrder = updatedTasks.reduce((acc, task, index) => {
      acc[task._id] = index;
      return acc;
    }, {});

    setTaskOrder((prev) => ({
      ...prev,
      ...newTaskOrder,
    }));
    console.log(newTaskOrder);
    axios
      .put(`http://localhost:3000/tasks/order`, newTaskOrder)
      .then(() => {
        refetch();
        console.log(newTaskOrder);
      })
      .catch(() => toast.error("Failed to update task order"));
  };

  const Task = ({ task, index, moveTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "TASK",
      item: { id: task._id, category: task.category, index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop({
      accept: "TASK",
      hover(item) {
        if (item.id !== task._id) {
          moveTask(item.index, index, task.category);
          item.index = index;
        }
      },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
      title: task.title,
      description: task.description,
      category: task.category,
    });

    const handleEditChange = (e) => {
      setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
      e.preventDefault();
      axios
        .put(`http://localhost:3000/tasks/${task._id}`, editedTask)
        .then(() => {
          toast.success("Task updated successfully");
          setIsEditing(false);
          refetch();
        })
        .catch(() => toast.error("Failed to update task"));
    };

    return (
      <div
        ref={(node) => drag(drop(node))}
        className={`relative task p-4 m-2 rounded-md bg-[#323232] group ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        {isEditing ? (
          <form onSubmit={handleUpdate} className="text-white">
            <input
              type="text"
              name="title"
              maxLength="50"
              value={editedTask.title}
              onChange={handleEditChange}
              className="border border-none rounded bg-[#151515] w-full px-2 py-1 mb-2 text-sm"
            />
            <textarea
              name="description"
              maxLength="200"
              value={editedTask.description}
              onChange={handleEditChange}
              className="border border-none rounded bg-[#151515] w-full p-2 mb-2 text-sm"
            />
            <div className="flex gap-2">
              <select
                name="category"
                value={editedTask.category} // Bind it to state
                onChange={handleEditChange}
                className="border-none bg-[#151515] rounded text-sm px-2"
              >
                <option value="todo">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button
                type="submit"
                className="btn btn-sm bg-[#151515] text-white border-none shadow-none"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-sm bg-[#151515] text-white border-none shadow-none"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="text-base font-semibold">{task.title}</h3>
            <p className="text-xs mb-1">
              {new Date(task.date).toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="text-sm text-gray-300">{task.description}</p>
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-white"
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-400 hover:text-red-600"
              >
                <RiDeleteBin6Fill className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const TaskCategory = ({ category, tasks }) => {
    const [, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item) => {
        if (item.category !== category) {
          axios
            .put(`http://localhost:3000/tasks/${item.id}`, { category })
            .then(() => refetch())
            .catch(() => toast.error("Failed to move task"));
        }
      },
    }));

    return (
      <div ref={drop} className="bg-[#151515] rounded-lg p-4 min-h-[200px]">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">
          {category.replace("in progress", "In Progress").toUpperCase()}
        </h2>
        <div className="text-white mb-5">
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              task={task}
              index={index}
              moveTask={moveTask}
            />
          ))}
        </div>
        {inputOpen === category ? (
          <form
            onSubmit={(e) => handleTaskSubmit(e, category)}
            className="text-white p-2"
          >
            <input
              type="text"
              name="title"
              maxLength="50"
              className="border rounded bg-[#323232] w-full px-2 py-1 mb-2 text-sm"
              placeholder="Title"
            />
            <textarea
              name="description"
              maxLength="200"
              className="border rounded bg-[#323232] w-full p-2 mb-2 text-sm"
              placeholder="Description"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="btn w-32 bg-[#151515] text-white hover:bg-[#323232]"
              >
                Add Task
              </button>
              <button
                onClick={() => setInputOpen(null)}
                className="p-2 text-xl"
              >
                <RxCross2 />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <button
              onClick={() => setInputOpen(category)}
              className="btn shadow-none border-none bg-[#151515] w-full flex items-center justify-center gap-2 hover:bg-[#323232] text-white"
            >
              <FaPlus /> Add a Task
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-[1020px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {categories.map((category) => (
          <TaskCategory
            key={category}
            category={category}
            tasks={categorizedTasks[category]}
          />
        ))}
      </div>
    </DndProvider>
  );
}

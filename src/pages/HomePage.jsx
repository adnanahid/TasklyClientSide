import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import useTask from "../hooks/useTask";
import { IoPencilSharp } from "react-icons/io5";
import { PiTrashSimpleLight } from "react-icons/pi";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Task item drag type
const TaskItemType = "TASK_ITEM";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [inputOpen, setInputOpen] = useState({
    todo: false,
    doing: false,
    done: false,
  });
  const { tasks, refetch } = useTask();
  const [editingTask, setEditingTask] = useState(null);
  const categories = ["todo", "doing", "done"];

  const tasksByCategory = {
    todo: tasks.filter((task) => task.category === "todo"),
    doing: tasks.filter((task) => task.category === "doing"),
    done: tasks.filter((task) => task.category === "done"),
  };

  // Handle submitting new task
  const handleSubmit = (e, category) => {
    e.preventDefault();
    const task = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: user?.email,
      date: new Date(),
      category: category,
    };
    axios
      .post("https://taskly-server-side.vercel.app/tasks", task)
      .then((res) => {
        toast.success("Task Added Successfully");
        setInputOpen({ ...inputOpen, [category]: false });
        refetch();
      })
      .catch((error) => {
        toast.error("Error adding task");
      });
  };

  // Handle deleting a task
  const handleDelete = (taskId) => {
    axios
      .delete(`https://taskly-server-side.vercel.app/tasks/${taskId}`)
      .then((res) => {
        toast.success("Task deleted successfully");
        refetch();
      })
      .catch((error) => {
        toast.error("Error deleting task");
      });
  };

  // Handle editing a task (toggle editing form)
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // Handle updating a task
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };

    axios
      .put(
        `https://taskly-server-side.vercel.app/tasks/${editingTask._id}`,
        updatedTask
      )
      .then((res) => {
        toast.success("Task updated successfully");
        setEditingTask(null);
        refetch();
      })
      .catch((error) => {
        toast.error("Error updating task");
      });
  };

  // Drag-and-drop logic for task items
  const moveTask = (taskId, newCategory) => {
    axios
      .put(`https://taskly-server-side.vercel.app/tasks/${taskId}`, {
        category: newCategory,
      })
      .then((res) => {
        toast.success("Task moved successfully");
        refetch();
      })
      .catch((error) => {
        toast.error("Error moving task");
      });
  };

  const Task = ({ task, index }) => {
    const [, drag] = useDrag(() => ({
      type: TaskItemType,
      item: { id: task._id, index },
    }));

    const [, drop] = useDrop(() => ({
      accept: TaskItemType,
      drop: (item) => {
        if (item.index !== index) {
          moveTask(item.id, task.category);
        }
      },
    }));

    return (
      <div
        ref={(node) => drag(drop(node))}
        className="relative task p-4 m-2 rounded-md bg-[#323232] group"
      >
        {/* Task details */}
        {editingTask?._id === task._id ? (
          <div>
            <form onSubmit={handleUpdate} className="text-white">
              <input
                type="text"
                name="title"
                defaultValue={task.title}
                className="border-none rounded w-full px-2 py-1 mb-3 text-sm bg-[#151515]"
                placeholder="Title"
              />
              <textarea
                name="description"
                defaultValue={task.description}
                className="border-none rounded w-full p-2 text-sm bg-[#151515]"
                placeholder="Description"
                rows={1}
              />
              <div className="flex items-center gap-3">
                <select
                  name="category"
                  defaultValue={task.category}
                  className="border-none rounded w-full p-1.5 px-2 text-sm bg-[#151515]"
                >
                  <option className="text-sm" value="todo">
                    To-Do
                  </option>
                  <option className="text-sm" value="doing">
                    Doing
                  </option>
                  <option className="text-sm" value="done">
                    Done
                  </option>
                </select>
                <button
                  type="submit"
                  className="btn btn-sm border-none hover:bg-[#151515] shadow-none text-white bg-[#323232]"
                >
                  Update
                </button>
                <button
                  className="btn-circle text-xl hover:bg-[#151515] shadow-none text-white bg-[#323232]"
                  onClick={() => setEditingTask(null)}
                >
                  <RxCross2 />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <h3 className="text-base font-semibold">
              {index + 1}. {task.title}
            </h3>
            <p className="text-sm text-gray-300">{task.description}</p>

            {/* Action Buttons (Hidden by default, visible on hover) */}
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => handleEdit(task)}
              >
                <IoPencilSharp className="w-4 h-4" />
              </button>
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => handleDelete(task._id)}
              >
                <PiTrashSimpleLight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const Category = ({ category, idx }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: TaskItemType,
      drop: (item) => moveTask(item.id, category),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        key={idx}
        className="col-span-1 bg-[#151515] rounded-lg max-w-80 mt-12"
      >
        <h2 className="text-2xl tracking-widest font-semibold text-white text-center my-2">
          {category === "todo"
            ? "To-Do"
            : category === "doing"
            ? "Doing"
            : "Done"}
        </h2>

        <div className="text-white mb-5">
          {tasksByCategory[category].map((task, index) => (
            <Task key={task._id} task={task} index={index} />
          ))}
        </div>

        <div>
          {inputOpen[category] ? (
            <div className="p-2">
              <form
                onSubmit={(e) => handleSubmit(e, category)}
                className="text-white"
              >
                <input
                  type="text"
                  name="title"
                  className="border rounded bg-[#323232] w-full px-2 py-1 mb-3 text-sm"
                  placeholder="Title"
                />
                <textarea
                  name="description"
                  className="border rounded bg-[#323232] w-full p-2 mb-3 text-sm"
                  placeholder="Description"
                />
                <div className="flex items-center gap-5">
                  <button
                    type="submit"
                    className="btn w-32 bg-[#151515] shadow-none text-white hover:bg-[#323232]"
                  >
                    Add Task
                  </button>
                  <button
                    className="p-2 text-xl"
                    onClick={() =>
                      setInputOpen({ ...inputOpen, [category]: false })
                    }
                  >
                    <RxCross2 />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center mb-3 px-2">
              <button
                onClick={() => setInputOpen({ ...inputOpen, [category]: true })}
                className="btn bg-[#151515] border-none shadow-none w-full flex items-center justify-center gap-2 hover:bg-[#323232] text-white transition duration-300 transform"
              >
                <FaPlus /> Add Task
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-[1020px] grid grid-cols-3 mx-auto">
        {categories.map((category, idx) => (
          <Category key={idx} category={category} idx={idx} />
        ))}
      </div>
    </DndProvider>
  );
}

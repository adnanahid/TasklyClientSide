import { useState, useContext } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import useTask from "../hooks/useTask";
import { MdDelete } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAxios from "../hooks/useAxios";

// Task item drag type
const TaskItemType = "TASK_ITEM";

export default function HomePage() {
  const axiosPublic = useAxios();
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
    axiosPublic
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
    axiosPublic
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

    axiosPublic
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

  // Handle drag end event
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return; // Dropped outside of a droppable area
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return; // No movement
    }

    const movedTask = tasks.find((task) => task._id === draggableId);
    if (movedTask) {
      axiosPublic
        .put(`https://taskly-server-side.vercel.app/tasks/${movedTask._id}`, {
          category: destination.droppableId,
        })
        .then(() => {
          refetch();
          toast.success("Task moved successfully");
        })
        .catch((error) => {
          toast.error("Error moving task");
        });
    }
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold text-gray-600">
          welcome to TaskLy.
        </h1>
        <br />
        <p className="text-xl">Please Login first to explore</p>
      </div>
    );
  }

  const Task = ({ task, index }) => {
    return (
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="relative task p-4 m-2 rounded-md bg-[#323232] group"
          >
            {editingTask?._id === task._id ? (
              <div>
                <form onSubmit={handleUpdate} className="text-white">
                  <input
                    type="text"
                    name="title"
                    maxLength={50}
                    defaultValue={task.title}
                    className="border-none rounded w-full px-2 py-1 mb-3 text-sm bg-[#151515]"
                    placeholder="Title"
                  />
                  <textarea
                    name="description"
                    defaultValue={task.description}
                    maxLength={200}
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
                <p className="text-sm text-gray-300">{task.description}</p>
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleEdit(task)}
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleDelete(task._id)}
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Draggable>
    );
  };

  const Category = ({ category }) => {
    return (
      <Droppable droppableId={category}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="md:col-span-1 mx-auto w-[320px] bg-[#151515] rounded-lg max-w-80 mt-12"
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
              {provided.placeholder}
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
                      maxLength={50}
                      name="title"
                      className="border rounded bg-[#323232] w-full px-2 py-1 mb-3 text-sm"
                      placeholder="Title"
                    />
                    <textarea
                      name="description"
                      maxLength={200}
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
                    onClick={() =>
                      setInputOpen({ ...inputOpen, [category]: true })
                    }
                    className="btn bg-[#151515] border-none shadow-none w-full flex items-center justify-center gap-2 hover:bg-[#323232] text-white transition duration-300 transform"
                  >
                    <FaPlus /> Add Task
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="max-w-[1020px] grid grid-cols-1 md:grid-cols-3 mx-auto">
        {categories.map((category) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </DragDropContext>
  );
}

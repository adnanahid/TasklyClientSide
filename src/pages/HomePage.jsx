import { useContext, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import useTask from "../hooks/useTask";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [inputOpen, setInputOpen] = useState(null);
  const { tasks, refetch } = useTask();

  const categories = ["todo", "in progress", "done"];

  const handleAddTask = (e, category) => {
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
      .then(() => {
        toast.success("Added Successfully");
        setInputOpen(null);
        refetch();
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:3000/tasks/${_id}`)
      .then(() => {
        toast.success("Task deleted successfully");
        refetch();
      })
      .catch(() => toast.error("Error deleting task"));
  };

  return (
    <div className="max-w-[1020px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-28">
      {categories.map((category) => (
        <div key={category} className="bg-[#151515] rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-white text-center my-2 capitalize">
            {category}
          </h2>

          <div className="text-white mb-5">
            {tasks
              .filter((task) => task.category === category)
              .map((task, index) => (
                <div
                  key={task._id}
                  className="relative p-4 m-2 rounded-md bg-[#323232] group"
                >
                  <h3 className="text-base font-semibold">
                    {index + 1}. {task.title}
                  </h3>
                  <p className="text-sm text-gray-300">{task.description}</p>
                  <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="text-gray-400 hover:text-white"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-400 hover:text-red-600"
                      title="Delete"
                    >
                      <RiDeleteBin6Fill className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {inputOpen === category ? (
            <form
              onSubmit={(e) => handleAddTask(e, category)}
              className="text-white p-2"
            >
              <input
                type="text"
                name="title"
                className="border rounded bg-[#323232] w-full px-2 py-1 mb-3 text-sm"
                placeholder="Title"
                required
              />
              <textarea
                name="description"
                className="border rounded bg-[#323232] w-full p-2 mb-3 text-sm"
                placeholder="Description"
                required
              />
              <div className="flex items-center gap-5">
                <button
                  type="submit"
                  className="btn w-32 bg-[#151515] text-white hover:bg-[#323232]"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  className="p-2 text-xl"
                  onClick={() => setInputOpen(null)}
                >
                  <RxCross2 />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center mb-3 px-2">
              <button
                onClick={() => setInputOpen(category)}
                className="btn bg-[#151515] shadow-none border-none w-full flex items-center justify-center gap-2 hover:bg-[#323232] text-white"
              >
                <FaPlus /> Add a Task
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

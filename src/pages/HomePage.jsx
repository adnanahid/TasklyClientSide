import { useContext, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import useTask from "../hooks/useTask";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const { tasks, isLoading, refetch } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: user?.email,
      date: new Date(),
      category: "todo",
    };
    axios
      .post("http://localhost:3000/tasks", task)
      .then((res) => {
        toast.success("Added Successfully");
        setIsInputOpen(false);
        refetch();
      })
      .catch((error) => {
        toast.error("Anything is wrong");
        console.log(error);
      });
  };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:3000/tasks/${_id}`)
      .then((res) => {
        toast.success("Task deleted successfully");
        refetch();
      })
      .catch((error) => {
        toast.error("Error deleting task");
        console.log(error);
      });
  };

  return (
    <div className="max-w-[1020px] grid grid-cols-3 mx-auto">
      {/* ToDo Section */}
      <div className="col-span-1 bg-[#151515] rounded-lg max-w-80 mt-12">
        {/* heading */}
        <h2 className="text-2xl tracking-widest font-semibold text-white text-center my-2">
          To-Do
        </h2>

        {/* ToDo List */}
        <div className="text-white mb-5">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="relative task p-4 m-2 rounded-md bg-[#323232] group"
            >
              <h3 className="text-base font-semibold">
                {index + 1}. {task.title}
              </h3>
              <p className="text-sm text-gray-300">{task.description}</p>

              {/* Action Buttons (Hidden by default, visible on hover) */}
              <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="text-gray-400 hover:text-white tooltip tooltip-bottom"
                  data-tip="Edit Card"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-400 hover:text-red-600 tooltip tooltip-bottom"
                  data-tip="Delete Card"
                >
                  <RiDeleteBin6Fill className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* add ToDo */}
        <div>
          {isInputOpen ? (
            <div className="p-2">
              <form onSubmit={handleSubmit} className="text-white">
                <input
                  type="text"
                  name="title"
                  className="border rounded bg-[#323232] w-full px-2 py-1 mb-3 text-sm"
                  placeholder="title"
                />
                <textarea
                  type="text"
                  name="description"
                  className="border rounded bg-[#323232] w-full p-2 mb-3 text-sm"
                  placeholder="description"
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
                    onClick={() => setIsInputOpen(false)}
                  >
                    <RxCross2 className="" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center mb-3 px-2">
              <button
                onClick={() => setIsInputOpen(true)}
                className="btn bg-[#151515] border-none shadow-none w-full flex items-center justify-center gap-2 hover:bg-[#323232] text-white transition duration-300 transform"
              >
                <FaPlus /> Add a Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* In Progress Section */}
      <div className="col-span-1 bg-[#151515] rounded-lg max-w-80 mt-12">
        <h2 className="text-2xl tracking-widest font-semibold text-white text-center my-2">
          In Progress
        </h2>
      </div>

      {/* Done Section */}
      <div className="col-span-1 bg-[#151515] rounded-lg max-w-80 mt-12">
        <h2 className="text-2xl tracking-widest font-semibold text-white text-center my-2">
          Done
        </h2>
      </div>
    </div>
  );
}

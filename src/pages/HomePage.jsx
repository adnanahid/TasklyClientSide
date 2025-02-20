export default function HomePage() {
  const todo = [
    {
      title: "Finish the React project",
      description: "Complete the frontend for the task management app.",
    },
    {
      title: "Complete Firebase integration",
      description: "Set up Firebase Auth and Firestore for task persistence.",
    },
    {
      title: "Review TypeScript basics",
      description:
        "Go through TypeScript documentation and practice basic concepts.",
    },
  ];

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
          {todo.map((task, index) => (
            <div
              key={index}
              className="task p-4 m-2 rounded-md bg-[#323232]"
            >
              <h3 className="text-base font-semibold">
                {index + 1}. {task.title}
              </h3>
              <p className="text-sm text-gray-300">{task.description}</p>
            </div>
          ))}
        </div>
        {/* add ToDo */}
        <div className="text-center mb-3 px-2">
          <button className="btn shadow-none border-none w-full bg-[#323232] mx-auto text-white">
            Add ToDo +
          </button>
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

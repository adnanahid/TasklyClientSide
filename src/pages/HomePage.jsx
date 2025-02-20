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
      <div className="bg-[#191919] rounded-lg w-80 mt-12">
        <h2 className="mb-8 text-2xl tracking-widest font-semibold text-white text-center mt-5">
          To-Do
        </h2>
        <div className="text-white bg-[#22272B] mb-5">
          {todo.map((task, index) => (
            <div
              key={index}
              className="task p-4 m-2 border border-gray-300 rounded-md"
            >
              <h3 className="text-base font-semibold">{index+1}.{" "}{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#191919] rounded-lg w-80 mt-12">
        <h2 className="mb-8 text-2xl tracking-widest font-semibold text-white text-center mt-5">
          In Progress
        </h2>
      </div>
      <div className="bg-[#191919] rounded-lg w-80 mt-12">
        <h2 className="mb-8 text-2xl tracking-widest font-semibold text-white text-center mt-5">
          Done
        </h2>
      </div>
    </div>
  );
}

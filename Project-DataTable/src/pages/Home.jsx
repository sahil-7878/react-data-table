import { useState } from "react";

export default function Home() {
  const [list] = useState(() => {
    return JSON.parse(localStorage.getItem("Employees")) || [];
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-black mb-6">
        Employee Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map((emp) => (
          <div
            key={emp.id}
            className="bg-white rounded-xl shadow-lg p-4 text-center"
          >
            {emp.image && (
              <img
                src={emp.image}
                alt=""
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
              />
            )}
            <h3 className="font-semibold text-black text-lg">{emp.ename}</h3>
            <p className="text-sm text-gray-500">{emp.designation}</p>
            <p className="text-sm text-black">{emp.department}</p>
          </div>
        ))}
      </div>
    </>
  );
}


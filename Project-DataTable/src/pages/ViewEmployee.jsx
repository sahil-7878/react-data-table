import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewEmployee() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Employees")) || [];
    setData(stored);
  }, []);

  const removeEmp = (id) => {
    const filtered = data.filter((e) => e.id !== id);
    setData(filtered);
    localStorage.setItem("Employees", JSON.stringify(filtered));
  };

  // 🔍 SEARCH
  let filteredData = data.filter((emp) =>
    `${emp.ename} ${emp.email} ${emp.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🎯 FILTER BY STATUS
  if (statusFilter !== "All") {
    filteredData = filteredData.filter(
      (emp) => emp.status === statusFilter
    );
  }

  // 🔃 SORTING
  if (sortBy === "name-asc") {
    filteredData.sort((a, b) => a.ename.localeCompare(b.ename));
  } else if (sortBy === "name-desc") {
    filteredData.sort((a, b) => b.ename.localeCompare(a.ename));
  } else if (sortBy === "salary-asc") {
    filteredData.sort((a, b) => a.salary - b.salary);
  } else if (sortBy === "salary-desc") {
    filteredData.sort((a, b) => b.salary - a.salary);
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold text-black mb-4 text-center">
        Employee List
      </h2>

      {/* 🔍 SEARCH + FILTER + SORT */}
      <div className="flex bg-white text-black flex-wrap gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by name, email, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name ↑</option>
          <option value="name-desc">Name ↓</option>
          <option value="salary-asc">Salary ↑</option>
          <option value="salary-desc">Salary ↓</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="min-w-full bg-white text-black shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center p-6 text-gray-500">
                No employees found
              </td>
            </tr>
          ) : (
            filteredData.map((emp) => (
              <tr
                key={emp.id}
                className="border-b text-center hover:bg-gray-50"
              >
                <td className="p-3">
                  {emp.image ? (
                    <img
                      src={emp.image}
                      alt="emp"
                      className="w-10 h-10 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>

                <td className="p-3 font-medium">{emp.ename}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.phone}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.designation}</td>
                <td className="p-3 font-semibold">₹{emp.salary}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="p-3 space-x-4">
                  <Link
                    to={`/edit/${emp.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => removeEmp(emp.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

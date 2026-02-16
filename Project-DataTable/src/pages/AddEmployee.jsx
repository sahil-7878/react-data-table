import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    eid: "",
    ename: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    status: "Active",
    image: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const old = JSON.parse(localStorage.getItem("Employees")) || [];
    localStorage.setItem(
      "Employees",
      JSON.stringify([...old, { ...form, id: Date.now() }])
    );
    navigate("/view");
  };

  return (
    <form
      onSubmit={submitForm}
      className="max-w-xl mx-auto bg-black p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Add New Employee</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          name="eid"
          placeholder="Employee ID"
          className="input"
          onChange={handleInput}
        />
        <input
          name="ename"
          placeholder="Employee Name"
          className="input"
          onChange={handleInput}
        />
        <input
          name="email"
          placeholder="Email"
          className="input"
          onChange={handleInput}
        />
        <input
          name="phone"
          placeholder="Phone"
          className="input"
          onChange={handleInput}
        />
        <input
          name="department"
          placeholder="Department"
          className="input"
          onChange={handleInput}
        />
        <input
          name="designation"
          placeholder="Designation"
          className="input"
          onChange={handleInput}
        />
        <input
          name="salary"
          placeholder="Salary"
          className="input"
          onChange={handleInput}
        />

        <select name="status" className="input" onChange={handleInput}>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <input type="file" onChange={handleImage} />

        <button className="bg-indigo-600 text-black py-2 rounded hover:bg-indigo-700">
          Save Employee
        </button>
      </div>
    </form>
  );
}


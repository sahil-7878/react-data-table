import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    ename: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    status: "Active",
    image: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Employees")) || [];
    const selected = data.find((item) => item.id === Number(id));

    if (selected) {
      setEmployee(selected);
    }
  }, [id]);

  const updateField = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("Employees")) || [];

    const updatedList = data.map((item) =>
      item.id === employee.id ? employee : item
    );

    localStorage.setItem("Employees", JSON.stringify(updatedList));
    navigate("/view");
  };

  return (
    <div className="max-w-xl mx-auto bg-black shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Update Employee Details
      </h2>

      <form onSubmit={updateEmployee} className="space-y-4">
        <input
          type="text"
          name="ename"
          value={employee.ename}
          onChange={updateField}
          placeholder="Employee Name"
          className="input"
        />

        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={updateField}
          placeholder="Email Address"
          className="input"
        />

        <input
          type="number"
          name="phone"
          value={employee.phone}
          onChange={updateField}
          placeholder="Phone Number"
          className="input"
        />

        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={updateField}
          placeholder="Department"
          className="input"
        />

        <input
          type="text"
          name="designation"
          value={employee.designation}
          onChange={updateField}
          placeholder="Designation"
          className="input"
        />

        <input
          type="text"
          name="salary"
          value={employee.salary}
          onChange={updateField}
          placeholder="Salary"
          className="input"
        />

        <select
          name="status"
          value={employee.status}
          onChange={updateField}
          className="input"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button className="w-full bg-green-600 text-black py-2 rounded-lg hover:bg-green-700 transition">
          Update Employee
        </button>
      </form>
    </div>
  );
}


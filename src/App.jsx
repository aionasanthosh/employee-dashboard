
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to fetch employees");
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch(() => setError("Could not load employees. Check your internet connection."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PEOPLE MANAGEMENT</p>
          <h1>Employee Dashboard</h1>
          <p className="subtitle">Manage and view your employee directory.</p>
        </div>
        <NavLink className="primary-button" to="/employee">
          + Add Employee
        </NavLink>
      </div>

      <section className="stat-card">
        <div className="stat-icon">👥</div>
        <div>
          <p>Total Employees</p>
          <h2>{loading ? "..." : employees.length}</h2>
        </div>
      </section>

      <section className="table-card">
        <h2>Employee Directory</h2>
        {loading ? (
          <p className="message">Loading employees...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>EMP-{String(employee.id).padStart(3, "0")}</td>
                    <td>
                      <div className="employee-name">
                        <span className="avatar">
                          {employee.name.charAt(0)}
                        </span>
                        <span>{employee.name}</span>
                      </div>
                    </td>
                    <td>{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    location: "",
    salary: "",
  });
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`Form completed for ${form.name}. Data is not saved to a server.`);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PEOPLE MANAGEMENT</p>
          <h1>Employee Form</h1>
          <p className="subtitle">Enter employee details below.</p>
        </div>
      </div>

      <section className="form-card">
        <h2>Employee Information</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="Enter full name" required />
          </label>

          <label>
            Designation
            <input name="designation" value={form.designation}
              onChange={handleChange} placeholder="e.g. Software Developer"
              required />
          </label>

          <label>
            Location
            <input name="location" value={form.location}
              onChange={handleChange} placeholder="Enter location" required />
          </label>

          <label>
            Salary
            <input name="salary" type="number" min="0" value={form.salary}
              onChange={handleChange} placeholder="Enter salary" required />
          </label>

          <button className="primary-button" type="submit">
            Submit Details
          </button>
          {message && <p className="success">{message}</p>}
        </form>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink className="brand" to="/">People<span>Desk</span></NavLink>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/employee">Employee Form</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

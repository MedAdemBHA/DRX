import { useEffect, useState } from "react";
import ModelAddEmp from "./ModelAddEmp";
import { useAuth } from "../auth/Auth";
import ModelAddNote from "./ModelAddNote";
import Note from "./NoteComp";
const ChefTable = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const [tempCustomYearInput, setTempCustomYearInput] = useState(currentYear);
  const [tempCustomMonthInput, setTempCustomMonthInput] =
    useState(currentMonth);
  const [customYearInput, setCustomYearInput] = useState(currentYear);
  const [customMonthInput, setCustomMonthInput] = useState(currentMonth);

  const handleCustomDateSubmit = (e) => {
    e.preventDefault();

    setCustomYearInput(tempCustomYearInput);
    setCustomMonthInput(tempCustomMonthInput);
  };

  const handleCurrentDateSubmit = () => {
    setCustomYearInput(currentYear);
    setCustomMonthInput(currentMonth);
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout, userData } = useAuth();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  console.log("Year:", currentYear);
  console.log("Month:", currentMonth);
  const handleLogout = async () => {
    logout();

    window.location.reload();
  };
  console.log(userData);
  const [ChefData, setChefData] = useState([]);
  const [EmpData, setEmpData] = useState([]);

  // const handleTableRowClick = (employeeId) => {
  //   // Use the employeeId as needed
  //   console.log("Clicked on employee with ID:", employeeId);

  // };

  console.log(EmpData);
  useEffect(() => {
    // Fetch data from the Chefs API
    fetch("https://localhost:7296/api/Test/Chefs")
      .then((response) => response.json())
      .then((result) => setChefData(result))
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch data from the Chefs API using chefId

    fetch(`https://localhost:7296/api/Test/Emps/Chef/${userData.id}`)
      .then((response) => response.json())
      .then((result) => setEmpData(result))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
        onClick={toggleSidebar}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <a className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
              DXR
            </span>
          </a>
          <ul className="space-y-2 font-medium text-gray-700 dark:text-gray-400">
            <li>Name: {userData.name}</li>
            <li>depId: {userData.depId}</li>
            {ChefData.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-5">Chef:</h2>
                {ChefData.map(
                  (chef, index) =>
                    chef.id === userData.id && (
                      <div key={index}>
                        <p>
                          {chef.nom} {chef.prenom}
                        </p>
                      </div>
                    )
                )}
              </div>
            )}
          </ul>
          <button
            onClick={handleLogout}
            className="block w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className={`p-4 sm:ml-64 ${isSidebarOpen ? "ml-64" : ""}`}>
        <div className=" ml-10 justify-end	 flex gap-5">
          <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-2 items-center mb-4 justify-end">
              <button
                type="button"
                onClick={handleCurrentDateSubmit}
                className="bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-2.5 transition duration-300 mb-2 lg:mb-0"
              >
                Year: {currentYear} Month: {currentMonth}
              </button>
              <form onSubmit={handleCustomDateSubmit}>
                <input
                  type="text"
                  placeholder="Year"
                  value={tempCustomYearInput}
                  onChange={(e) => setTempCustomYearInput(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 mb-2 lg:mb-0"
                />

                <input
                  type="text"
                  placeholder="Month"
                  value={tempCustomMonthInput}
                  onChange={(e) => setTempCustomMonthInput(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 mb-2 lg:mb-0"
                />
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-6 py-2.5 transition duration-300"
                >
                  Submit
                </button>
              </form>
              <ModelAddEmp />
            </div>
          </div>
        </div>

        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Nom
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Prenom
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Note
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {EmpData.map((employee, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50"
                  style={{ cursor: "pointer" }}
                >
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">
                        {employee.nom}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{employee.prenom}</td>
                  <td className="px-6 py-4">
                    {" "}
                    <Note
                      empId={employee.id}
                      month={customMonthInput}
                      anner={customYearInput}
                    />
                  </td>
                  {/* Include the employee ID in a hidden column if needed */}
                  <td className="px-6 py-4">
                    <ModelAddNote
                      mois={currentMonth} // Use curly braces here
                      anner={currentYear} // Use curly braces here
                      idEmp={employee.id} // Use curly braces here
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChefTable;

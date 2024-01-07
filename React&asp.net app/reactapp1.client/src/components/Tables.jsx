import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModelAddChef from "./ModelAddChef";
import { useAuth } from "../auth/Auth";

const Tables = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout, userData } = useAuth();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = async () => {
    logout();

    window.location.reload();
  };

  const [DataUser, setDataUser] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    // Fetch data from the Chefs API
    fetch("https://localhost:7296/api/Test/Chefs")
      .then((response) => response.json())
      .then((result) => setDataUser(result))
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch data from the Departments API
    fetch("https://localhost:7296/api/Test/Departement")
      .then((response) => response.json())
      .then((result) => setDepartmentData(result))
      .catch((error) =>
        console.error("Error fetching department data:", error)
      );
  }, []);

  // Create a mapping between departmentId and department name
  const departmentMap = {};
  departmentData.forEach((department) => {
    departmentMap[department.id] = department.nomDep;
  });

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
            {DataUser.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-5">Chef:</h2>
                {DataUser.map(
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
        <div className=" ml-10 justify-end flex-col flex lg:flex-row gap-2 	 items-center mb-4">
          <Modal />
          <ModelAddChef />
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
                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {DataUser.filter((user) => user.role === "chef").map(
                (user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {user.nom}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{user.prenom}</td>
                    <td className="px-6 py-4">
                      {departmentMap[user.departementId]}
                    </td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <a>
                          {
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                              data-tooltip="tooltip"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          }
                        </a>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            data-tooltip="tooltip"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                          ;
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tables;

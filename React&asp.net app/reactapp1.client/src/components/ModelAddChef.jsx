import { useEffect, useState } from "react";

const ModelAddChef = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chefData, setChefData] = useState({
    id: "",
    nom: "",
    prenom: "",
    motpass: "",
    role: "",
    departementId: 0,
  });
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetch("https://localhost:7296/api/Test/Departement")
      .then((response) => response.json())
      .then((result) => {
        setDepartmentData(result);
      })
      .catch((error) =>
        console.error("Error fetching department data:", error)
      );
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = () => {
    const postData = {
      ...chefData,
      departementId: parseInt(selectedDepartment, 10), // Ensure departementId is a number
    };

    fetch("https://localhost:7296/api/Test/Registration/chef", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Chef added successfully:", data);
        hideModal();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // You can handle the error here, e.g., display an error message to the user
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChefData((prevChefData) => ({
      ...prevChefData,
      [name]: name === "departementId" ? parseInt(value, 10) : value,
    }));
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div>
      {/* Button to toggle modal */}
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Chef
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto"
        >
          <div className="relative p-4  w-[90% ] max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Chef
                </h3>
                <button
                  onClick={hideModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  ></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                {/* Inputs for chef data */}
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID
                </label>
                <input
                  type="number"
                  id="id"
                  name="id"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={chefData.id}
                  onChange={handleChange}
                />
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={chefData.nom}
                  onChange={handleChange}
                />
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prenom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={chefData.prenom}
                  onChange={handleChange}
                />
                <label
                  htmlFor="motpass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="motpass"
                  name="motpass"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={chefData.motpass}
                  onChange={handleChange}
                />
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={chefData.role}
                  onChange={handleChange}
                />
                <label
                  htmlFor="departementId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  id="departementId"
                  name="departementId"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Select Department</option>
                  {departmentData.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.nomDep}
                    </option>
                  ))}
                </select>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={handleAccept}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  I accept
                </button>
                <button
                  onClick={hideModal}
                  type="button"
                  className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelAddChef;

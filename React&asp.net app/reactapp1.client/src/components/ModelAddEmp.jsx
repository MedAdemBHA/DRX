import { useState } from "react";
import { useAuth } from "../auth/Auth";

const ModelAddEmp = () => {
  const { userData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empData, setEmpData] = useState({
    id: "",
    nom: "",
    prenom: "",
    departementId: userData.depId, // Using department name directly from userData
    utilisateurId: userData.id,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = () => {
    const postData = {
      ...empData,
      // You can further validate or process data here
    };

    fetch("https://localhost:7296/api/Test/Registration/Employer", {
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
        console.log("Employee added successfully:", data);
        hideModal();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // You can handle the error here, e.g., display an error message to the user
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpData((prevEmpData) => ({
      ...prevEmpData,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Button to toggle modal */}
      <button
        onClick={toggleModal}
        className="bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-2.5 transition duration-300 mb-2 lg:mb-0"
        type="button"
      >
        Add Employee
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
                  Add Employee
                </h3>
                <button
                  onClick={hideModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                {/* Inputs for employee data */}
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={empData.id}
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
                  value={empData.nom}
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
                  value={empData.prenom}
                  onChange={handleChange}
                />
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

export default ModelAddEmp;

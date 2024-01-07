import { useState } from "react";
import PropTypes from "prop-types";

const ModelAddNote = ({ mois, anner, idEmp }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteData, setNoteData] = useState({
    id: 0,
    note1: 0,
    note2: 0,
    note3: 0,

    mois: mois,
    anner: anner,
    idEmp: idEmp,
  });
  console.log(noteData);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = () => {
    const postData = {
      id: 0,
      note1: noteData.note1,
      note2: noteData.note2,
      note3: noteData.note3,
      mois: noteData.mois.toString(),
      anner: noteData.anner.toString(),
      idEmp: noteData.idEmp.toString(),
    };
    console.log(postData);

    fetch("https://localhost:7296/api/Test/Registration/Note", {
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
        console.log("Note added successfully:", data);
        hideModal();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // Handle the error here
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert the input value to the appropriate type
    const updatedValue = name.startsWith("note") ? parseInt(value, 10) : value;
    // Update the state
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [name]: updatedValue,
    }));
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Note
      </button>

      {isModalOpen && (
        <div
          id="note-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto"
        >
          <div className="relative p-4 w-[90%] max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Note
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
              <div className="p-4 md:p-5 space-y-4">
                <label
                  htmlFor="note1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note 1
                </label>
                <input
                  type="number" // Use type="number" for integer input
                  id="note1"
                  name="note1"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={noteData.note1}
                  onChange={handleChange}
                />

                <label
                  htmlFor="note2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note 2
                </label>
                <input
                  type="number"
                  id="note2"
                  name="note2"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={noteData.note2}
                  onChange={handleChange}
                />

                <label
                  htmlFor="note3"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note 3
                </label>
                <input
                  type="number"
                  id="note3"
                  name="note3"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={noteData.note3}
                  onChange={handleChange}
                />
              </div>
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
ModelAddNote.propTypes = {
  mois: PropTypes.string.isRequired,
  anner: PropTypes.string.isRequired,
  idEmp: PropTypes.string.isRequired,
};
export default ModelAddNote;

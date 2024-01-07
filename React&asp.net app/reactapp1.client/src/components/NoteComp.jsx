import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Note = ({ empId, month, anner }) => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetch(
      `https://localhost:7296/api/Test/Note/Mois&anner?id=${empId}&mois=${month}&anner=${anner}`
    )
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, [empId, month, anner]);

  return (
    <div>
      {notes && notes.length > 0 ? (
        notes.map((note, index) => (
          <div key={index}>
            <p>Note 1: {note.note1}</p>
            <p>Note 2: {note.note2}</p>
            <p>Note 3: {note.note3}</p>
            <p>
              Moyen:{" "}
              {(
                (parseFloat(note.note1) +
                  parseFloat(note.note2) +
                  parseFloat(note.note3)) /
                3
              ).toFixed(2)}
            </p>
          </div>
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

Note.propTypes = {
  empId: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  anner: PropTypes.string.isRequired,
};

export default Note;

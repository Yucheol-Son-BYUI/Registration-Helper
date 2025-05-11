import React, { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 2px solid #ccc;
  padding: 2em;
  width: 400px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ErrorMsg = styled.div`
  color: red;
  font-weight: bold;
  margin-bottom: 1em;
`;

const FormField = styled.div`
  margin-bottom: 1em;
`;

function AddCourseModal({ onAddCourse, onClose }) {
  const [professor, setProfessor] = useState('');
  const [days, setDays] = useState([0, 0, 0, 0, 0]); // Monday ~ Friday
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [credit, setCredit] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [memo, setMemo] = useState('');
  const [error, setError] = useState('');

  const handleCheckboxChange = (index) => {
    const newDays = [...days];
    newDays[index] = newDays[index] === 1 ? 0 : 1;
    setDays(newDays);
  };

  const handleSubmit = () => {
    const daysString = days.join('');

    if (
      !professor || !startTime || !endTime || !credit ||
      !courseName || !courseCode || daysString === '00000'
    ) {
      setError('Required fields are missing.');
      return;
    }

    const newCourse = {
      professor,
      days: daysString,
      startTime,
      endTime,
      credit: parseInt(credit),
      courseName,
      courseCode,
      memo,
      id: professor + startTime + daysString,
    };

    onAddCourse(newCourse);
    onClose();
  };

  return (
    <ModalWrapper>
      {error && <ErrorMsg>{error}</ErrorMsg>}

      <FormField>
        <label>Professor: <input value={professor} onChange={(e) => setProfessor(e.target.value)} /></label>
      </FormField>

      <FormField>
        Days:
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
          <label key={day}>
            <input
              type="checkbox"
              checked={days[idx] === 1}
              onChange={() => handleCheckboxChange(idx)}
            />
            {day}
          </label>
        ))}
      </FormField>

      <FormField>
        <label>Start Time: <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></label>
      </FormField>

      <FormField>
        <label>End Time: <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></label>
      </FormField>

      <FormField>
        <label>Credit: <input type="number" value={credit} onChange={(e) => setCredit(e.target.value)} /></label>
      </FormField>

      <FormField>
        <label>Course Name: <input value={courseName} onChange={(e) => setCourseName(e.target.value)} /></label>
      </FormField>

      <FormField>
        <label>Course Code: <input value={courseCode} onChange={(e) => setCourseCode(e.target.value)} /></label>
      </FormField>

      <FormField>
        <label>Memo-optional: <textarea value={memo} onChange={(e) => setMemo(e.target.value)} /></label>
      </FormField>

      <button onClick={handleSubmit}>Add Course</button>
      <button onClick={onClose}>Cancel</button>
    </ModalWrapper>
  );
}

export default AddCourseModal;

// import { useState } from 'react'
import styled from 'styled-components';
import './common.css'
import CourseList from './CourseList.jsx'
import { useState } from 'react';
import TimeTable from './TimeTable.jsx'
import ModalCourseForm from './ModalCourseForm.jsx'
const AppContainer = styled.main`
    display:grid;
    width:100%;
    height:100vh;
    background-color:var(--background-color);
    grid-template-columns: 13em 3fr;
  `;
function App() {
  const loadCoursesFromLocalStorage = () => {
    const savedCourses = localStorage.getItem('courses');
      return savedCourses ? JSON.parse(savedCourses) : [];  // load from localStorage
  };
  const [courses, setCourses] = useState(loadCoursesFromLocalStorage);
  const loadSelectedFromLocalStorage = () => {
    const savedSelected = localStorage.getItem('selected');
      return savedSelected ? JSON.parse(savedSelected) : [];  // load from localStorage
  };
  const [selectedCourses, setSelectedCourses] = useState(loadSelectedFromLocalStorage);

  // save courses and selected to localStorage
  const saveDataToLocalStorage = () => {
      try {
        localStorage.setItem('courses', JSON.stringify(courses));
        localStorage.setItem('selected', JSON.stringify(selectedCourses));
        alert('Data saved to localStorage');
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    };

  const handleDeleteCourse = (courseId) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
  };
  const handleAddCourse = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };
  const handleSelectCourse = (newCourseId) => {
    setSelectedCourses(prevselectedCourses => [...prevselectedCourses, newCourseId]);
  };
  const handleUnSelectCourse = (courseId) => {
    setSelectedCourses(prevselectedCourses => prevselectedCourses.filter(courseKey => courseKey !== courseId));
  };
  const [isModalOpen, setModalOpen] = useState(false);


  
  

  return (
    <AppContainer>
      <CourseList courses={courses} selected={selectedCourses} onDeleteCourse={handleDeleteCourse} onAddCourse={handleAddCourse} onSelectCourse={handleSelectCourse} onUnSelectCourse={handleUnSelectCourse} onModalOpen={setModalOpen}/>
      <TimeTable courses={courses} selected = {selectedCourses} onUnselectCourse={handleUnSelectCourse} onSaveData={saveDataToLocalStorage}></TimeTable>
      {isModalOpen && (
        <ModalCourseForm 
          onAddCourse={handleAddCourse}
          onClose={() => setModalOpen(false)}
        />
      )}

    </AppContainer>
  )
}

export default App

// import { useState } from 'react'
import styled from 'styled-components';
import './common.css'
import CourseList from './CourseList.jsx'
import { useEffect, useState } from 'react';
import TimeTable from './TimeTable.jsx'
import ModalCourseForm from './ModalCourseForm.jsx'

// firebase import
import { auth, db } from "./firebase.config.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AppContainer = styled.main`
    display:grid;
    width:100%;
    height:100vh;
    background-color:var(--background-color);
    grid-template-columns: 13em 3fr;
  `;
async function loginOrGetUid() {
  if (!auth.currentUser) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user.uid;
    } catch (loginError) {
      console.error("Google login failed:", loginError);
      return null;
    }
  }
  return auth.currentUser.uid;
}
function App() {
  const loadCoursesFromLocalStorage = () => {
    const savedCourses = localStorage.getItem('courses');
      return savedCourses ? JSON.parse(savedCourses) : [];  // load from localStorage
  };
  
  // const [courses, setCourses] = useState(loadCoursesFromFirestore);
  const [courses, setCourses] = useState([]);
  const loadCoursesFromFirestore = async () => {
    console.log("start loadCoursesFromFirestore")
    try {
      // try login. "admin" is a default id for development process.
      const uid = await loginOrGetUid();
      if(!uid) return loadCoursesFromLocalStorage(); //if login failed

      const adminDocRef = doc(db, "courses", uid);
      const snap = await getDoc(adminDocRef);

      if (!snap.exists()) {
        console.warn("Firestore: 'courses/admin' does not exist");
        setCourses([]);
        return;
      }

      const data = snap.data();

      if (Array.isArray(data.courses)) {
        setCourses(data.courses);
        console.log("Succeed to load data from firestore")
        console.log(data.courses)
        return;
      } else {
        console.warn("Firestore: 'courses' is not an array", data.courses);
        setCourses([]);
        return;
      }
    } catch (error) {
      console.error("Error loading courses from Firestore:", error);
        setCourses([]);
        return;
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const loaded = await loadCoursesFromFirestore();
  //     setCourses(loaded);
  //   };
  //   fetchData();
  // }, []);
  const loadSelectedFromLocalStorage = () => {
    const savedSelected = localStorage.getItem('selected');
      return savedSelected ? JSON.parse(savedSelected) : [];  // load from localStorage
  };
  const [selectedCourses, setSelectedCourses] = useState(loadSelectedFromLocalStorage);

  // save courses and selected to localStorage
  // const saveDataToLocalStorage = () => {
  //   try {
  //     localStorage.setItem('courses', JSON.stringify(courses));
  //     localStorage.setItem('selected', JSON.stringify(selectedCourses));
  //     alert('Data saved to localStorage');
  //   } catch (error) {
  //     console.error('Error saving data to localStorage:', error);
  //   }
  // };
  const saveDataToFirestore = async () => {
    try {
      const uid = await loginOrGetUid();
      console.log("logined uid: ",uid)
      if (!uid) {
        console.warn("saveDataToFirestore: failed login");
        return;
      }

      const document = doc(db, "courses", uid);
      const payload = {
        courses: courses,
      };

      await setDoc(document, payload);
      console.log("success to save data!")
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
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
      <TimeTable courses={courses} selected = {selectedCourses} onUnselectCourse={handleUnSelectCourse} onSaveData={saveDataToFirestore} onLoadData={loadCoursesFromFirestore}></TimeTable>
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

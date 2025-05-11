import styled from "styled-components";
import Course from "./Course.jsx";

const ListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  overflow-y: auto;
  box-sizing: border-box;

  /* scroll custom(Browser based WebKit only) */
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(128, 128, 128, 0.5);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(128, 128, 128, 0.7);
  }
`
function CourseList({ courses, onDeleteCourse, onAddCourse, selected, onSelectCourse, onUnSelectCourse, onModalOpen }) {
  return (
    <ListContainer>
        {courses.map((course) => (
          <Course
            key={course.id}
            {...course}
            onDelete={() => {console.log(course.id);onDeleteCourse(course.id)}}
            className={selected.some((c) => c === course.id) ? "selected" : ""}
            onSelect={onSelectCourse}
            onUnSelect={onUnSelectCourse}
            selected = {selected.some((c) => c === course.id)}
          />
        ))}
        <button onClick={() => onModalOpen(true)}>Add Course</button>
    </ListContainer>
  );
}

export default CourseList;
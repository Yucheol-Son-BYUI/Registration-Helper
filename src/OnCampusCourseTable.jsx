import styled from "styled-components";


const TableLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  border: 1px solid black;
  grid-template-areas: 
    "time mo tu we th fr"
    "t1 mo1 tu1 we1 th1 fr1"
    "t2 mo2 tu2 we2 th2 fr2"
    "t3 mo3 tu3 we3 th3 fr3"
    "t4 mo4 tu4 we4 th4 fr4"
    "t5 mo5 tu5 we5 th5 fr5"
    "t6 mo6 tu6 we6 th6 fr6";
    grid-template-columns: 100px repeat(5, 1fr);
`;
const BuiltInCell = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;     /* 세로 중앙 */
  justify-content: center; /* 가로 중앙 */
  &>p{
  margin: 0;}
`;
const CourseTime = ({ area, courseId }) => {
  const courseColor = stringToColor(courseId);

  const CourseTimeStyled = styled.div`
    grid-area: ${area};
    background-color: ${courseColor};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  `;

  return <CourseTimeStyled></CourseTimeStyled>;
};

function calcArea(startTime, days){
  const startTimeMap = {
    "07:45": "1",
    "09:00": "2",
    "10:15": "3",
    "12:45": "4",
    "14:00": "5",
    "15:15": "6"
  }
  let dayList = ["mo", "tu", "we", "th", "fr"];
  return days
    .split('')
    .map((val, idx) => val === '1' ? dayList[idx] : null)
    .filter(Boolean)
    .map((day) => day + startTimeMap[startTime]);

}
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  return `rgb(${r}, ${g}, ${b})`;
}
function OnCampusCourseTable({courses, selected, onUnselectCourse, onSave}){
  
  return(
    <TableLayout>
      <BuiltInCell style={{gridArea: "1/1"}}><button onClick={onSave}>Save</button></BuiltInCell>
      <BuiltInCell style={{gridArea: "mo"}}>Monday</BuiltInCell>
      <BuiltInCell style={{gridArea: "tu"}}>Tuesday</BuiltInCell>
      <BuiltInCell style={{gridArea: "we"}}>Wednesday</BuiltInCell>
      <BuiltInCell style={{gridArea: "th"}}>Thursday</BuiltInCell>
      <BuiltInCell style={{gridArea: "fr"}}>Friday</BuiltInCell>
      <BuiltInCell style={{gridArea: "t1"}}>07:45<br/>~<br/>08:45</BuiltInCell>
      <BuiltInCell style={{gridArea: "t2"}}>09:00<br/>~<br/>10:00</BuiltInCell>
      <BuiltInCell style={{gridArea: "t3"}}>10:15<br/>~<br/>11:15</BuiltInCell>
      <BuiltInCell style={{gridArea: "t4"}}>12:45<br/>~<br/>13:45</BuiltInCell>
      <BuiltInCell style={{gridArea: "t5"}}>14:00<br/>~<br/>15:00</BuiltInCell>
      <BuiltInCell style={{gridArea: "t6"}}>15:15<br/>~<br/>16:15</BuiltInCell>
      {courses
        .filter((course) => selected.includes(course.id))
        .flatMap((course) =>
          calcArea(course.startTime, course.days).map((area) => (
            <BuiltInCell key={course.id + area} style={{ gridArea: area, backgroundColor: stringToColor(course.id) }} onClick={() => {console.log(onUnselectCourse);onUnselectCourse(course.id)}}>
              <p>{course.courseCode}-({course.credit})</p>
              <p>{course.courseName}</p>
            </BuiltInCell>
          ))
        )}


    </TableLayout>
  )
}

export default OnCampusCourseTable;
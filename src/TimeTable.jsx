import styled from "styled-components";
import OnCampusCourseTable from "./OnCampusCourseTable.jsx";

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
`
function TimeTable({courses, selected, onUnselectCourse, onSaveData, onLoadData}){
  return(
    <TableContainer>
      <OnCampusCourseTable courses = {courses} selected={selected} onUnselectCourse={onUnselectCourse} onSave={onSaveData} onLoad={onLoadData} ></OnCampusCourseTable>
      {/* <div className="onlineTable">onlineTable</div> */}
    </TableContainer>
  )
}

export default TimeTable;
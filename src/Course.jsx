import styled from "styled-components"

const CardContainer = styled.div`
  border: 1px solid blue;
  width: 100%;
  // height: 5em;
  height: content-fit;
  overflow: hidden;
  border-radius: 1em;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0.2em 0.3em;

  &>p{margin: 0.2em 0;}

  &.selected{
    border: 5px solid var(--selected-color);
  }
`
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
function Course({professor, courseName, courseCode, days, startTime, endTime, location, memo, credit, priority, id, onDelete, className, onSelect, onUnSelect, selected}) {
  return (
    <CardContainer className={className} onClick={() => {selected ? onUnSelect(id) : onSelect(id)}} style={{backgroundColor: stringToColor(id)}}>
      {courseCode}({credit}) - {professor}
      <p>{courseName}</p>
      <p className="">📆 Days: {days}</p>
      <p className="">⏰ Time: {startTime} ~ {endTime}</p>
      <p className="">📝 Memo: {memo || 'None'}</p>
      <button onClick={onDelete}>Delete</button>
    </CardContainer>
  )
}

export default Course
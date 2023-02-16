const AdditionalNotes = (props) => {
  return(
    <ul>
      <li className="p-pills">- {props.additionalnote.additionalnote}</li>
    </ul>
  )
}

export default AdditionalNotes;
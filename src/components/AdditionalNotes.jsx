const AdditionalNotes = (props) => {
  return(
    <ul>
      <li className="p-pills">{props.additionalnote.additionalnote}</li>
    </ul>
    // <p className="p-pills">{props.additionalnote.additionalnote}</p>
  )
}

export default AdditionalNotes;
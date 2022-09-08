const Medications = (props) => {
  return(
    <ul>
      <li className="p-pills">{props.medication.medication}</li>
    </ul>
    // <p className="p-pills">{props.medication.medication}</p>
  )
}

export default Medications
const Medications = (props) => {
  return(
    <ul>
      <li className="p-pills">- {props.medication.medication}</li>
    </ul>
  )
}

export default Medications
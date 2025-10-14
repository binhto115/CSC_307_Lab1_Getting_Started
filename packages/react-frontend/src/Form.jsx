// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
    const [person, setPerson] = useState({
        name: "",
        job: ""
    });

    // Add the following code to src/Form.jsx
    function handleChange(event) {
        const { name, value } = event.target;
        // if (name === "name") {
        //     setPerson({ name: value, job: person["job"], id: person["id"] });
        // } else if (name == "job") { 
        //     setPerson({ name: person["name"], job: value, id: person["id"] });
        // } else if (name == "id") {
        //     setPerson({ name: person["name"], job: person["job"], id: value});
        // }
        setPerson({...person, [name]: value});
    }

    function submitForm() {
        props.handleSubmit(person);
        setPerson({ name: "", job: ""});
      }


    
    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}
            />
            <label htmlFor="job">Job</label>
            <input
                type="text"
                name="job"
                id="job"
                value={person.job}
                onChange={handleChange}
                />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default Form;
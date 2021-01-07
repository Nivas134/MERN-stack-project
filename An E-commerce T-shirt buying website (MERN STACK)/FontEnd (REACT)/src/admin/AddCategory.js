import React, {useState} from 'react'
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import {Link } from "react-router-dom";
import { createCategory} from "./helper/adminapicall"

const AddCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user,token} = isAutheticated();

    const goBack = () => (
        <div className="mt-5"> 
        <Link className= "btn btn-sm btn-success mb-3" to = "/admin/dashboard">
         Admin Home
        </Link>
        </div>
    )

    const handleChange =(event) => {
        setError("");
        setName(event.target.value)
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)


        //backend request fired
        createCategory(user._id, token, {name})
        .then(data => {
            if (data.error){
                setError(true);
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
    };

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">category created successfully</h4>
        }
    }

    const errorMessage = () => {
        if (error) {
            return <h4 className = "text-danger">Failed to create category</h4>
        }
    }

    const myCategoryForm = () => (
        <form>
        <div className="form-group"> 
            <p className="lead"> Enter the category</p>
            <input type="text"
                className= "from-control my-3"
                onChange = {handleChange}
                value= {name}
                autoFocus
                required
                placeholder= "For Ex. Summer"
                />
                <button onClick= {onSubmit} className="btn btn-outline-info"> create category</button>
        </div>
        </form>
    )
    return (
        <div>
            <Base title = " create a category here" description = "Add a new catehgory for new tshirts" className =" container bg-purple p-4">
            <h2 className="text-blue"> You can create a category here </h2>
            {successMessage()}
            {errorMessage()}
            {myCategoryForm()}
            {goBack()}
             </Base>
        </div>
    )
}


export default AddCategory;
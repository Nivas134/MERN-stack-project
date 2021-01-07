import React, {useState, useEffect} from 'react'
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import {Link } from "react-router-dom";
import { getCategory, updateCategory} from "./helper/adminapicall"

const UpdateCategory = ({match}) => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user,token} = isAutheticated();



  const preload = (categoryId) => {
    getCategory(categoryId).then(data => {

    
        setName(data.name);
        console.log(data);
        
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
    console.log("CategoryId:",match.params.categoryId);
  },[]);
  

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
        updateCategory(match.params.categoryId, user._id, token, JSON.stringify({name}))
        .then(data => {
            console.log(token);
            console.log(JSON.stringify({name}));
            console.log(user._id);
            console.log(match.params.categoryId)
            if (data.error){
                setError(true);
                console.log("ERRRRRRRRRRRRRR:",data.error)
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })//http://localhost:3000/api/category/5fb2962d8c6f2a4c84fbfe85/5f94595f14667c3a509be76a 
    };//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk0NTk1ZjE0NjY3YzNhNTA5YmU3NmEiLCJpYXQiOjE2MDU1NDA3MTR9.3ljQQlhF1hyJs0uQlktI4H-oAeszf2tCksVRH79id9k

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">category updated successfully</h4>
        }
    }

    const errorMessage = () => {
        if (error) {
            return <h4 className = "text-danger">Failed to update category</h4>
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
                <button onClick= {onSubmit} className="btn btn-outline-info"> Update category</button>
        </div>
        </form>
    )
    return (
        <div>
            <Base title = " Update a category here" description = "Update the category for tshirts" className =" container bg-purple p-4">
            <h2 className="text-blue"> You can update a category here </h2>
            {successMessage()}
            {errorMessage()}
            {myCategoryForm()}
            {goBack()}
             </Base>
        </div>
    )
}


export default UpdateCategory;
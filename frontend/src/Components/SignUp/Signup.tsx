import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
 
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    axios.post("http://localhost:7001/signup", { username, email, password })
      .then(result => {
        console.log(result);
        navigate("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='container-fluid'><br />
      <div className='card w-50 m-auto'>
        <div className='card-body'>
          <MDBContainer className="p-3  d-flex flex-column justify-content-center align-items-center w-100" autoComplete='off'>
            <h1>Sign-up</h1>
            <MDBInput wrapperClass='mb-4 w-100' id='form1' type='email' name='email' onChange={(e) => { setEmail(e.target.value) }} autoComplete='off' placeholder='Enter Email' />
            <MDBInput wrapperClass='mb-4 w-100' id='form3' type='text' name='username' onChange={(e) => { setUsername(e.target.value) }} autoComplete='nope' placeholder='Enter Username' />
            <MDBInput wrapperClass='mb-4 w-100' id='form2' type='password' name='password' onChange={(e) => { setPassword(e.target.value) }} autoComplete='off' placeholder='Enter Password' />
            
            <button className="btn btn-primary mb-4" onClick={handleSubmit}>Sign Up</button>

            <div className="text-center">
              <p>Already have an account<a href="/login">Login</a></p>
            </div>
            <div className="d-flex justify-content-between mx-3 mb-4 w-100">
              <MDBCheckbox name='flexCheck' className='float-start ' value='' id='flexCheckDefault' label='By Continuing, I agree to the terms and policies' />
            </div>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}

export default Signup;

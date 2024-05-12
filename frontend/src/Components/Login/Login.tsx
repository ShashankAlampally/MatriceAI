import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    axios.post("http://localhost:7001/login", { email, password })
      .then((result) => {
        console.log(result);
        sessionStorage.setItem("cookies", result.data.data?.token);
        sessionStorage.setItem("userID", result.data.data?.userID);
        console.log(result.data.data?.userID);

        navigate("/page");

        setTimeout(() => {
          navigate("/login");
        }, result.data.data.expiresIn);

        navigate("/page");

      }).catch((err) => {
        const message = err;
        console.log(message);
      });
  };

  return (
    <div className='container-fluid'><br />
      <div className='card w-25 m-auto'>
        <div className='card-body'>
          <MDBContainer className="p-3  d-flex flex-column justify-content-center align-items-center w-100">
            <h1>Login</h1>
            <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='form1' type='email' name='email' onChange={(e) => { setEmail(e.target.value) }} />
            <MDBInput wrapperClass='mb-4 w-100' label='Password' id='form2' type='password' name='password' onChange={(e) => { setPassword(e.target.value) }} />

            <div className="d-flex justify-content-between mx-3 mb-4 w-100">
              <MDBCheckbox name='flexCheck' className='float-start ' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <button className='btn btn-primary' onClick={handleSubmit}>Sign in</button>

            <div className="text-center">
              <p>Create Account ? <a href="/signup">Register</a></p>


              <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>

              </div>
            </div>


          </MDBContainer>
        </div>
      </div>
    </div>
  );
}

export default Login;

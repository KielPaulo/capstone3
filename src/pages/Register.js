import React, {useState, useContext, useEffect} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import UserContext from './../UserContext'
import {useHistory, Redirect} from 'react-router-dom'




export default function Register(){

	const {rootUrl} = useContext(UserContext);
	let history = useHistory();
	const {userInfo, setUserInfo} = useContext(UserContext);


	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');

	const[email, setEmail] = useState('');
	const[password, setPassword] = useState('');
	const[verifyPassword, setVerifyPassword] = useState('');
	const[isDisabled, setIsDisabled] = useState(true);


	useEffect(()=>{

		if(firstName !=="" && lastName !=="" && email !== "" && password !=="" && verifyPassword !==""){

			setIsDisabled(false);
		}else{

			setIsDisabled(true);
		}

	},[email, password, verifyPassword])





	function register (e){

		e.preventDefault();

					fetch(`${rootUrl}/api/users/register`,{

						method: "POST",
						headers: {

							"Content-Type": "application/json"
						},
						body: JSON.stringify({

							firstName: firstName,
							lastName: lastName,
							email: email,
							mobileNo: mobileNo,
							password: password

						})

					})
					.then(result =>result.json())
					.then(result =>{

						if(result.emailTaken === true){

							alert('Email already taken');

						}else if(result.registration === true){

							console.log(result);

							alert('Succesfully registered. Redirecting you to login.');

							setEmail('');
							setPassword('');
							setVerifyPassword('');

							history.push('/login')


						}else{

							alert('Something went wrong');


						}
		
					})
				
	}


	return(


		(userInfo.userId !== null) ?

		<Redirect to="/"/>

		:

		<Container className="mb-5">
			
			<h1 className="text-center">Register</h1>
		{/*	//right now is call back function register, chuii e*/}
			<Form  onSubmit={(e)=>register(e)}>
			  <Form.Group className="mb-3" controlId="formfirstName">
			    <Form.Label>First Name</Form.Label>
			    <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
																	{/*chuii value*/}
			  </Form.Group>

			    <Form.Group className="mb-3" controlId="formlastName">
			    <Form.Label>Last Name</Form.Label>
			    <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
																	{/*chuii value*/}
			  </Form.Group>

			    <Form.Group className="mb-3" controlId="formmobileNo">
			    <Form.Label>Mobile Number</Form.Label>
			    <Form.Control type="text" placeholder="Enter mobile number" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}/>
																	{/*chuii value*/}
			  </Form.Group>

			    <Form.Group className="mb-3" controlId="formemail">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
																	{/*chuii value*/}
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="formpassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="formpassword2">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Verify Password" value={verifyPassword} onChange={(e)=>setVerifyPassword(e.target.value)}/>
			  </Form.Group>

			  <Button variant="primary" type="submit" disabled={isDisabled}>
			    Submit
			  </Button>
			</Form>

		</Container>




		)
}

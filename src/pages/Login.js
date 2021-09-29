import React, {useState, useEffect, useContext} from 'react';
import {Container,Form, Button} from 'react-bootstrap';
import UserContext from './../UserContext'
import {Redirect} from 'react-router-dom';


export default function Login(){

	const {rootUrl} = useContext(UserContext);

	const {userInfo, setUserInfo} = useContext(UserContext);


	const[email, setEmail] = useState('');
	const[password, setPassword] = useState('');
	const[isDisabled, setIsDisabled] = useState(true);

		useEffect(()=>{

		if(email !== "" && password !==""){

			setIsDisabled(false);
		}else{

			setIsDisabled(true);
		}

	},[email, password]);




	function login(e){

		e.preventDefault();


		fetch(`${rootUrl}/api/users/login`,{

			method: "POST",
			headers:{

				"Content-Type": "application/json"
			},
			body:JSON.stringify({

				email: email,
				password: password
			})
		})
		.then(result=>result.json())
		.then(result=>{

			
			if(result === false || result.password === false){

				alert('Email or password is incorrect')
				return;

			}else{

				localStorage.setItem('token', result.access);
				localStorage.setItem('userId', result.userId);
				localStorage.setItem('isAdmin', result.isAdmin);
				localStorage.setItem('firstName', result.firstName);


				userDetails(result.access);

			
			}
		})


		const userDetails =(token)=>{


			fetch(`${rootUrl}/api/users/details`,{

				method: "GET",
				headers: {

					"Authorization": `Bearer ${token}`
				}
			})
			.then(result=> result.json())
			.then(result=>{


				setUserInfo({

					userId: result._id,
					isAdmin: result.isAdmin,
					firstName: result.firstName,
					lastName: result.lastName

				});


			})


		}

	}

	return (

		(userInfo.userId !== null) ? <Redirect to="/"/> :

			<Container className="mb-5 loginContainer bg-light">
			
			<h1 className="text-center">Login</h1>

			<Form  onSubmit={(e)=>login(e)}>
			  <Form.Group className="mb-3" controlId="formBasicEmail">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
																	{/*chuii value*/}
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)
}/>
			  </Form.Group>


			  <Button variant="primary" type="submit" disabled={isDisabled}>
			    Submit
			  </Button>
			</Form>
		</Container>
		)

}
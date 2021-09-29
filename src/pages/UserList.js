import React, {useContext, useState, useEffect} from 'react';
import UserContext from './../UserContext';
import {Redirect, useHistory} from 'react-router-dom';
import {Container,Table, Button} from 'react-bootstrap';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';


export default function UserList(){


	const {rootUrl} = useContext(UserContext);
	const {userInfo} = useContext(UserContext);
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	const isAdmin = localStorage.getItem('isAdmin');
	const [userArr, setUserArr] = useState([]);
	const[adminToggle, setAdminToggle] = useState(false);
	const {unsetUserInfo} = useContext(UserContext);
	let history = useHistory()

	/*let history = useHistory();*/

	if(token == undefined || isAdmin == "false"){

		history.push('/login');

	}

		useEffect(()=>{



				fetch(`${rootUrl}/api/users/list`, {

					headers:{

						"Authorization": `Bearer ${token}`
					}
				})
				.then(result=>result.json())
				.then(result=>{

					
					let count = 0;

					let k = result.map(e=>{


						console.log(e);

						return (

							<>
							<tr key={e._id}>
							<td>{count +=1}</td>
							<td>{e.firstName} {e.lastName}</td>
							<td>{e.mobileNo}</td>
							<td>{e.email}</td>
							<td>{(e.isAdmin) ? 'Yes': 'No'}</td>
							<td>{(e.isSuperAdmin) ? 'Yes': 'No'}</td>
							<td><Button onClick={()=>setAdmin(e._id, e.isAdmin)}className={(e.isAdmin) ?'btn-danger btn btn-sm': 'btn-info btn btn-sm'}>{(e.isAdmin==true) ? 'Remove Admin': 'Make Admin'}</Button></td>
							</tr>
							</>

							)

					})

					setUserArr(k)
					
				}).catch(error=>{

					console.log(error)
				})


		}, [adminToggle])




	const setAdmin =(id, isAdmin)=>{

		let r;

		if(id == userId){

			r = window.confirm('Remove yourself as Admin? You will be logged out.')

			if(r==false){

				return;
			}
		}


		fetch(`${rootUrl}/api/users/${id}/setAsAdmin`,{

			method: "PUT",
			headers:{

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body:JSON.stringify({

				"userIsAdmin": isAdmin

			})
		})

		.then(result=>result.json())
		.then(result=>{

			if(result.newStatus ==="non-admin"){


				alertify.set('notifier','position', 'top-center');
				alertify.set('notifier','delay', 2)
				alertify.success('Removed as Admin successful');

				setAdminToggle(!adminToggle);

			}else if(result.newStatus ==="admin"){

				alertify.set('notifier','position', 'top-center');
				alertify.set('notifier','delay', 2)
				alertify.success('Set as Admin successful');

				setAdminToggle(!adminToggle);

			}else{


				alertify.set('notifier','position', 'top-center');
				alertify.set('notifier','delay', 2)
				alertify.error('Something went wrong')

			}

			
		})


		if(r == true){

			unsetUserInfo();
			history.push('/login');
				
		}



	}



	return (

		<Container className="mt-5">
		<h2 className="text-danger">Users List</h2>
		<Table className="bg-white table-hover">
			<thead className="thead-light">
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Mobile No</th>
				<th>Email</th>
				<th>Admin</th>
				<th>Super Admin</th>
				<th>Settings</th>
			</tr>
				</thead>
				<tbody>
				{userArr}
		

				</tbody>
		</Table>
		</Container>


		);
}
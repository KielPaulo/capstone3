import React,{useState, useEffect, useContext} from 'react';
import {Container,Table} from 'react-bootstrap';
import UserContext from './../UserContext';
import {Link, useHistory} from 'react-router-dom';


export default function UserOrders(){


	const {rootUrl} = useContext(UserContext);
	const {userInfo} = useContext(UserContext);
	const token = localStorage.getItem('token');
	const [userOrderArr, setUserOrderArr] = useState([]);
	let history = useHistory();

	if(userInfo.userId == null || userInfo.isAdmin == false){

		history.push('/');

	}

	useEffect(()=>{


		fetch(`${rootUrl}/api/users/orders`,{


			headers:{

				"Authorization": `Bearer ${token}`

			}
		})
		.then(result=>result.json())
		.then(result=>{

				  console.log(result);

			let k = result.map(e=>{

				let d= new Date(e.createdOn);

				let i = e.items.map(i=>{

					console.log(i);


					return (

						<>
						<tr>
						<td><Link className="text-danger" to={`/productView/${i.productId._id}`}>{i.productId.name}</Link></td>
						<td>x{i.quantity}</td>

						</tr></>

						)

				})



				return (
				<tr>
				<td>{e._id}</td>
				<td>{e.buyerId.firstName} {e.buyerId.lastName}</td>
				<td>{d.toLocaleString('en-US')}</td>
				<td>{i}</td>
				<td>₱{e.totalAmount.toLocaleString('en-US')}</td>
				</tr>

				)


			})

			setUserOrderArr(k);

		
		})
		.catch(error=>{

			console.log(error);
		})


	},[])











	return(

		<Container className="mt-5">
		<h2 className="text-danger">User Orders</h2>
		<Table className="bg-white table-hover">
			<thead className="thead-dark">
			<tr>
				<th>Order ID</th>
				<th>Buyer Info</th>
				<th>Created on</th>
				<th>Items/Quantity</th>
				<th>Total Amount</th>
			</tr>
				</thead>
				<tbody>

				{userOrderArr}

				

				</tbody>
		</Table>
		</Container>




		)



}
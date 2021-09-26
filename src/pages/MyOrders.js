import React,{useState, useEffect, useContext} from 'react';
import {Container,Table} from 'react-bootstrap';
import UserContext from './../UserContext';
import {Link} from 'react-router-dom';


export default function MyOrders(){


	const {rootUrl} = useContext(UserContext);
	const token = localStorage.getItem('token');
	const [myOrderArr, setMyOrderArr] = useState([]) 

	useEffect(()=>{


		fetch(`${rootUrl}/api/users/myOrders`,{


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


					return (

						<>
						<tr>
						<td><Link to={`/productView/${i.productId._id}`}>{i.productId.name}</Link></td>
						<td>x{i.quantity}</td>

						</tr></>

						)

				})



				return (
				<tr>
				<td>{e._id}</td>
				<td>{d.toLocaleString('en-US')}</td>
				<td>{i}</td>
				<td>₱{e.totalAmount.toLocaleString('en-US')}</td>
				</tr>

				)


			})

			setMyOrderArr(k);

		
		})


	},[])











	return(

		<Container className="mt-5">
		<Table className="bg-white">
			<thead>
			<tr>
				<th>Order ID</th>
				<th>Created on</th>
				<th>Items/Quantity</th>
				<th>Total Amount</th>
			</tr>
				</thead>
				<tbody>

				{myOrderArr}

				

				</tbody>
		</Table>
		</Container>




		)



}
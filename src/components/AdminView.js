import React,{useContext, useState, useEffect} from 'react';
import {Card, Button, Alert, Modal, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import UserContext from './../UserContext'



export default function AdminView(productProp){

	const {productData, fetchProductsAdmin} = productProp;
	/*const{_id, name, description, price} = productProp;*/
	const token = localStorage.getItem('token');
	const {rootUrl} = useContext(UserContext);

	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);



	const [products, setProducts] = useState([]);
	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');



	const [selectedFile, setSelectedFile] = useState('');
	const [isFilePicked, setIsFilePicked] = useState(false);


	// const changeHandler = (event) => {

	// 	setSelectedFile(event.target.files[0]);

	// 	/*setIsFilePicked(true);*/

	// };

	


	const handleSubmission = (image) => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			`${rootUrl}/api/products/upload/${image}`,
			{
				method: 'POST',
				body: formData
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});



			/*console.log(selectedFile.name);*/
	};


	const openAdd = ()=> {

		setShowAdd(true);



	}

	const closeAdd = ()=> {
		
		setShowAdd(false)
		setSelectedFile('')
		setProductId('');
		setName('');
		setDescription('');
		setPrice('');
		setImage('');

	};
	

	const addProduct = (e)=>{

		e.preventDefault();

		let randomizer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


		 fetch(`${rootUrl}/api/products/create`,{

			method: "POST",
			headers:{

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({

				name: name,
				description: description,
				price: price,
				image: randomizer+'.'+selectedFile.type.slice(6)
			})
		})

		.then(result=>result.json())
		.then(result=>{

			if(result){

				alert('Succesfully added');
				handleSubmission(result.image);
				fetchProductsAdmin();
				closeAdd();

			}
		

		})

	}



	const openEdit = (pId)=>{

		//get single course details to display in edit form
		fetch(`${rootUrl}/api/products/${pId}`,{

			method: "GET",
			headers:{

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`

			}
		})
		.then(result=> result.json())
		.then(result=>{


			//this rerun the fetch data so data refreshes asynchronously
			//fetchData();

			//this set state in the edit form so current db data is displayed
			setProductId(result._id);
			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
			setImage(result.image);

		})

		//---------------------
		setShowEdit(true);

	}

	const editProduct = (e, pId)=>{

		e.preventDefault();

		fetch(`${rootUrl}/api/products/${pId}`,{

		method: "PUT",
		headers: {

			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			name: name,
			description: description,
			price: price

		})

		})
		.then(result => result.json())
		.then(result =>{

			if(result.updateSuccess){

				alert('Update success');
				closeEdit();
			}

			fetchProductsAdmin();
	

		})


	}

	const closeEdit = ()=>{

		setShowEdit(false);
		setName("");
		setDescription("")
		setPrice(0)
	}

	const archiveProduct =(pId)=>{


		fetch(`${rootUrl}/api/products/${pId}/archive`,{


			method: "PUT",
			headers: {

				"Authorization": `Bearer ${token}`
			}
		})
		.then(result=> result.json())
		.then(result=>{

			if(result.archived === true){

				alert('Archived successfully')
				fetchProductsAdmin();
			}


		})

	}

	const unarchiveProduct = (pId)=>{

		fetch(`${rootUrl}/api/products/${pId}/unarchive`,{


			method: "PUT",
			headers: {

				"Authorization": `Bearer ${token}`
			}
		})
		.then(result=> result.json())
		.then(result=>{

			if(result.unarchived === true){

				alert('Unarchived successfully')
				fetchProductsAdmin();
			}

		})

	}

	const deleteProduct = (pId)=>{

		let r = window.confirm("Are you sure you want to delete?");

		if (r == true) {

			fetch(`${rootUrl}/api/products/${pId}/delete`,{


				method: "DELETE",
				headers:{

					"Authorization": `Bearer ${token}`
				}
			})

			.then(result=> result.json())
			.then(result=>{

				if(result.deleted === true){

					alert('Succesfully deleted');
					fetchProductsAdmin();

				}


				
			})
		  
		} 

	}


	useEffect(()=>{

		const productArr = productData.map(product=>{

			let imgUrl="";

			if(product.image !==""){

				imgUrl=`${rootUrl}/static/images/${product.image}`

			}

			return (

			

			<Card key={product._id} className="m-3 w-25">
			
			  <Card.Img variant="top" src={imgUrl}/>
			  <Card.Body>
			    <Card.Title>{product.name}</Card.Title>
			    <Card.Text>
			      {product.description}
			    </Card.Text>
			    <Card.Text>
			      Php {product.price}
			    </Card.Text>
			  </Card.Body>
			  <Card.Footer>

			  <Button className="btn btn-sm btn-primary mr-2" onClick={()=> openEdit(product._id)}> Update</Button>
			  {
			  	(product.isActive === true)

			  	? 
			  	 <Button className="btn btn-sm btn-warning mr-2" onClick={()=> archiveProduct(product._id)}> Archive</Button>

			  	:
			  	  <Button className="btn btn-sm btn-success mr-2" onClick={()=> unarchiveProduct(product._id)}> Unarchive</Button>

			  }
			
			  <Button className="btn btn-sm btn-danger mr-2" onClick={()=> deleteProduct(product._id)}> Delete</Button>
			
			    
			  </Card.Footer>
			</Card>
			

			)

		})

		setProducts(productArr);


	}, [productProp])


	return (

		<>
		<Button className="btn btn-md btn-info m-3" onClick={openAdd}>Add Product</Button>
		{products}

		<Modal show={showAdd} onHide={closeAdd}>
			
			<Form onSubmit ={(e)=>addProduct(e)}>
				
				<Modal.Header>
					Add Product
				</Modal.Header>

				<Modal.Body>

					<Form.Group productName="productName">
						<Form.Label>Name</Form.Label>
						<Form.Control

						type="text"
						value={name}
						onChange={(e)=>setName(e.target.value)}
						/>

					</Form.Group>

					   <Form.Group>
					   <Form.Label>Image </Form.Label><br/>
						<input type="file" name="file" accept="image/*" onChange={(e)=>setSelectedFile(e.target.files[0])} />	
						{/*<button onClick={handleSubmission}>Submit</button>*/}
						</Form.Group>

					<Form.Group productDescription="productDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control

						type="text"
						value={description}
						onChange={(e)=>setDescription(e.target.value)}

						/>
					</Form.Group>

					<Form.Group productPrice="productPrice">
						<Form.Label>Price</Form.Label>
						<Form.Control

						type="number"
						value={price}
						onChange={(e)=>setPrice(e.target.value)}

						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>

				<Button variant="secondary" onClick={closeAdd}>Close</Button>
				<Button variant="success" type="submit">Submit</Button>
					
				</Modal.Footer>
			</Form>
		</Modal>



		<Modal show={showEdit} onHide={closeEdit}>

		<Form onSubmit={(e)=>editProduct(e, productId)}>
			<Modal.Header>
				<Modal.Title>
					Edit Product
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
			<img src="C:\Users\layug\Pictures\2019\2019-06-25\IMG_0380.jpg" className="w-25" alt=""/>
			{/*<img src={`http://localhost:4000/static/images/${image}`} className="w-25" alt=""/>*/}
			   <Form.Group>
			   <Form.Label>Change Image</Form.Label><br/>
				<input type="file" name="file" onChange={(e)=>setSelectedFile(e.target.files[0])} />	
				{/*<button onClick={handleSubmission}>Submit</button>*/}
				</Form.Group>
				<Form.Group controlId ="productName">
					<Form.Label>Name</Form.Label>
					<Form.Control
					type="text"
					value={name}
					onChange={(e)=> setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId ="productDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control
					type="text"
					value={description}
					onChange={(e)=> setDescription(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId ="productPrice">
					<Form.Label>Price</Form.Label>
					<Form.Control
					type="text"
					value={price}
					onChange={(e)=> setPrice(e.target.value)}
					/>
				</Form.Group>

			</Modal.Body>

			<Modal.Footer>
			<Button variant = "secondary" onClick={closeEdit}>Close</Button>
			<Button variant = "success" type="submit">Submit</Button>
			</Modal.Footer>
			
		</Form>		

		</Modal>
		</>

		);

}
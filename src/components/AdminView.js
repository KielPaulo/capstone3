import React,{useContext, useState, useEffect} from 'react';
import {Card, Button, Modal, Form, Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import UserContext from './../UserContext'
/*import Swal from 'sweetalert2'*/
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';



export default function AdminView(productProp){

	const {productData, fetchProductsAdmin} = productProp;
	/*const{_id, name, description, price} = productProp;*/
	const token = localStorage.getItem('token');
	const {rootUrl} = useContext(UserContext);
	const {userInfo} = useContext(UserContext);

	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);



	const [products, setProducts] = useState([]);
	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [isFeatured, setIsFeatured] = useState(false);




	const [selectedFile, setSelectedFile] = useState('');
	/*const [isFilePicked, setIsFilePicked] = useState(false);*/


	const handleSubmission = (image, imageOld=null) => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			`${rootUrl}/api/products/upload/${image}/${imageOld}`,
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
		setIsFeatured(false);

	};

	const handleOnClickFeature = ()=>{


		setIsFeatured(!isFeatured);

	}

	

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
				image: randomizer+'.'+selectedFile.type.slice(6),
				isFeatured: isFeatured
			})
		})

		.then(result=>result.json())
		.then(result=>{

			if(result){

			alertify.set('notifier','position', 'top-center');
			alertify.set('notifier','delay', 3)
			alertify.success('Add product successful');

				handleSubmission(result.image);
				fetchProductsAdmin();
				closeAdd();

			}
		

		})

	}



	const openEdit = (pId)=>{

		//get single course details to display in edit form
		fetch(`${rootUrl}/api/products/id/${pId}`,{

			method: "GET",
			headers:{

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`

			}
		})
		.then(result=> result.json())
		.then(result=>{

			console.log(result);


			//this rerun the fetch data so data refreshes asynchronously
			//fetchData();

			//this set state in the edit form so current db data is displayed
			setProductId(result._id);
			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
			setImage(result.image);
			setIsFeatured(result.isFeatured);

		})

		//---------------------
		setShowEdit(true);

	}

	const editProduct = (e, pId)=>{

		e.preventDefault();
		let randomizer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		let newImageName;

		if(selectedFile.type){

			console.log('MAY SELECTED')

			newImageName = (randomizer+'.'+selectedFile.type.slice(6))
			

		}else{

			newImageName = image;
		}

	
			fetch(`${rootUrl}/api/products/${pId}`,{

			method: "PUT",
			headers: {

				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				image: newImageName,
				isFeatured: isFeatured


			})

			})
			.then(result => result.json())
			.then(result =>{


				/*console.log(result);*/

				if(Object.keys(result).length !== 0){

					handleSubmission(newImageName, result.image);


					alertify.set('notifier','position', 'top-center');
					alertify.set('notifier','delay', 3)
					alertify.success('Update successful');

					closeEdit();
				}

				fetchProductsAdmin();
			

			})


	
	


	}

	const closeEdit = ()=>{

		setShowEdit(false);
		setName("");
		setDescription("")
		setPrice(0);
		setSelectedFile('');
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

			/*	Swal.fire(
				  'Product successfully archived!',
				  '',
				  'success'
				)*/

				alertify.set('notifier','position', 'top-center');
				 alertify.set('notifier','delay', 2)
				alertify.success('Archived successfully');

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

				alertify.set('notifier','position', 'top-center');
				alertify.set('notifier','delay', 2)
				alertify.success('Unarchived successfully');


				fetchProductsAdmin();
			}

		})

	}

	const deleteProduct = (pId)=>{


		if(userInfo.isSuperAdmin !== true){

			alertify.set('notifier','position', 'top-center');
			alertify.set('notifier','delay', 4)
			alertify.error('Delete is for Super Admins only. Click "Archive" instead to disable item.');

			return;

		}else{

			let r = window.confirm("Are you sure you want to delete?");

			if (r === true) {

				fetch(`${rootUrl}/api/products/${pId}/delete`,{


					method: "DELETE",
					headers:{

						"Authorization": `Bearer ${token}`
					}
				})

				.then(result=> result.json())
				.then(result=>{

					if(result.deleted === true){

					alertify.set('notifier','position', 'top-center');
					alertify.set('notifier','delay', 2)
					alertify.success('Product deleted');

						fetchProductsAdmin();

					}

				})
			  
			} 

		}

	}


	useEffect(()=>{

		const productArr = productData.map(product=>{

			let imgUrl="";

			if(product.image !==""){

				imgUrl=`${rootUrl}/static/images/${product.image}`

			}

			return (
	
			<Card key={product._id} className="mb-5 mr-2 featuredCard">
			
			  <Card.Img  src={imgUrl}/>

			  <span className="ml-2">

			  {(product.isActive === false) ?<><Badge variant="secondary">ARCHIVED</Badge>{' '}</>: <><Badge variant="success">ACTIVE</Badge>{' '}</>}
			  {(product.isActive === true && product.isFeatured === true) ?<><Badge variant="info">Featured on Home page</Badge>{' '}</>: null}
			  </span>
			  <Card.Body>
			    <Card.Title><Link className ="text-danger" to={`/productView/${product._id}`}>{product.name}</Link></Card.Title>
			    <Card.Text>
			      {product.description.length > 250 ?<>{product.description.slice(0,250)}...<Link className ="text-danger" to={`/productView/${product._id}`}> read more</Link></>: product.description}
			    </Card.Text>
			    <Card.Text>
			    <strong> ₱{product.price.toLocaleString('en-US')}</strong>
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
		<h4 className="col-12 text-left text-danger p-1">Admin Product Dashboard</h4>
		<div className="col-12 text-right"><Button className="btn btn-md btn-info m-3" onClick={openAdd}>Add New Product</Button></div>
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

					<input type="checkbox" id="feature" onChange={()=>handleOnClickFeature()} value={isFeatured}/>
					<label for="feature"> Feature on home page</label>
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
			
		
			<img src={`${rootUrl}/static/images/${image}`} className="w-50" alt=""/>
			   <Form.Group>
			   <Form.Label>Change Image</Form.Label><br/>
				<input type="file" name="file" onChange={(e)=>setSelectedFile(e.target.files[0])} />	
			
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

				<input type="checkbox"  id="feature" checked={isFeatured} onChange={()=>handleOnClickFeature()} value={isFeatured}/>
				<label for="feature"> Feature on home page</label>

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
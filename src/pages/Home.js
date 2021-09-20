import React, {useState} from 'react';
import Hero from './../components/Hero';
import {Form, Button} from 'react-bootstrap';



export default function Home(){


	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);





		fetch(
			'http://localhost:4000/api/products/upload',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});



			console.log(selectedFile.name);
	};
	




/*const upload = (e)=>{

	e.preventDefault();

	console.log(e);

	  const files = e.target.files;
	  console.log(files);
	  const formData = new FormData();
	  formData.append('productImg', files[0])

	fetch('http://localhost:4000/api/products/upload',{

		method:"POST",
		headers:{

			"Content-Type": "multipart/form-data"
		},
		body:formData

	})
	.then(result=> result.json())
	.then(result=>{


		console.log(result);

	})



}*/


return(
	<>
	<Hero/>
	   <div>
				<input type="file" name="file" onChange={changeHandler} />
				<div>
					<button onClick={handleSubmission}>Submit</button>
				</div>
			</div>   
	</>

	)
}

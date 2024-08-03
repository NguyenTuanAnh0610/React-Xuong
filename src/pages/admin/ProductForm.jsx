import React, {useContext, useEffect}from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import instance from './../../Axios/index';
import { useNavigate, useParams } from "react-router-dom";
import productSchema from './../../schemaValid/productSchema';
import { ProductContext } from './../../contexts/ProductContext';



const ProductForm = () => {
	const {dispatch} = useContext(ProductContext);
	const {id} = useParams();
	const nav = useNavigate();
    const{
         register,	
         handleSubmit,
         formState: {errors},
		 reset,
    } = useForm({
        resolver: zodResolver(productSchema),
    });
	
    if (id) {
		useEffect(() => {
			(async () => {
				const { data } = await instance.get(`/products/${id}`);
				reset(data);	
			})();
		}, [id, reset]);  
	}
	const onSubmit = async(data) =>{
	 try {
			if(id){
			  await instance.patch(`/products/${id}`, data);
				dispatch({type: "EDIT_PRODUCT", payload:{id,...data}})
				// nav("/admin");
				// window.location.reload();
				
			} else{
			  const result = await instance.post("/products", data);
			  dispatch({type: "ADD_PRODUCT", payload: result.data })
				}
				if (confirm("Successfully, redirect to admin page ?")) {
					nav("/admin");
					window.location.reload();
					 
				}
			}
	 catch (error) {
		console.log(error);
	 }
	};

 
	return (
		<div>
			<form onSubmit={handleSubmit((data) => onSubmit({...data, id}))}>
				<h1>{id ? "Edit" : "Add"} product</h1>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="title">
						Title
					</label>
					<input className="form-control" type="text" id="title" 
                    {...register("title",{ required: true})}
                    />
                    {errors.title?.message && <p className="text-danger">{errors.title?.message}</p>}
				</div>

				<div className="form-group mb-3">
					<label className="form-label" htmlFor="price">
						Price
					</label>
					<input className="form-control" type="number" id="price"
                    {...register("price",{valueAsNumber: true})}
                    />
                    {errors.price?.message && <p className="text-danger">{errors.price?.message}</p>}
				</div>
				<div className="form-group mb-3">
					<label className="form-label" htmlFor="description">
						Description
					</label>
					<input className="form-control" type="text" id="description" {...register("description", { required: true })} />
				</div>
				<div className="form-group mb-3">
					<button className="btn btn-primary w-100" type="submit">
						{id ? "Edit" : "Add" } product
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
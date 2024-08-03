import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../Axios';
import { ProductContext } from './../../contexts/ProductContext';
import { useState } from 'react';


const Dashboard = () => {
    const {state, dispatch} = useContext(ProductContext);
    const [searchQuery2, setSearchQuery2] = useState('');
     
    const remove = async(id) =>{
        try {
            if (confirm("Are you sure ?")) {
                await instance.delete(`/products/${id}`);
                dispatch({type: "DELETE_PRODUCT", payload: id});
            }
        } catch (error) {
            
        }
    }
    
    const handleSearchChange2 = (event) => {
        setSearchQuery2(event.target.value);
    };

    const filtedProductser = state.products.filter(product =>
        product.title.toLowerCase().includes(searchQuery2.toLowerCase())
        //lọc các sản phẩm dựa trên từ khóa tìm kiếm, bỏ qua sự khác biệt về chữ hoa và chữ thường.
    );

  return (
    <div>
    <h1>Hello Admin</h1>
    <Link className="btn btn-primary" to="/admin/product-add">
        Add new product
    </Link>
    
    <div className="search-bar">
    <input
        type="text"
        placeholder="Search products..."
        value={searchQuery2}
        onChange={handleSearchChange2}
    />
</div>
    <table className="table table-bordered table-striped text-center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Thumbnail</th>
                <th>Action</th> 
            </tr>
        </thead>
        <tbody>
            {filtedProductser.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.description || "Dang cap nhat"}</td>
                    <td>{item.image ? <img src={item.image} alt="Dang cap nhat" /> : "Dang cap nhat"}</td>
                    <td>
                    <Link to={`/admin/product-edit/${item.id}`} className="btn btn-warning">
                    Edit
                    </Link>
                    
                    <button onClick ={() => remove(item.id)} className="btn btn-danger">
                    Remove
                    </button>
                    
                    </td>
                </tr>
            ))}
        </tbody>
            </table>
    </div>
  )
}

export default Dashboard

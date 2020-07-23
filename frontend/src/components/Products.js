import React, { useState, useEffect } from 'react';
//import data from '../data';
//import Axios from 'axios';

function Products(props) {

  const [products, setProducts] = useState([]);
  
  const obj = {};
  const obj2 = {};
  useEffect(() => {

        fetch('/api/products')
        .then(function (response) { return response.json();})
        .then(data => { setProducts(data);});
    //------using Axios --------------
    //console.log(fetchData);
    // const fetchData = async () => {
    //   const {data} = await Axios.get("/api/products");
    //   setProducts(data);
    //   console.log(data);
    // }
    //fetchData();

      return ()=> {
        //
      };
    },[])

    const increaseValue = (event) => {
        // console.log(event.target);
        let value = parseInt(document.getElementById(`${event.target.value}`).value, 10);
        // console.log(value);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById(`${event.target.value}`).value = value;
        quantityChange(`${event.target.value}`, value);
      }
      
     const decreaseValue = (event) => {
        //console.log(event.target);
         let value = parseInt(document.getElementById(`${event.target.value}`).value, 10);
        if(value>0){
          value--;
        }
        document.getElementById(`${event.target.value}`).value = value;
        quantityChange(`${event.target.value}`, value);
      }

      const quantityChange = (el,value) => {
                obj[el] = value;    
                obj2[el] =  products[el-1].price * value;
                props.onAddCart(obj, obj2);
                //console.log(props.productsAdded);
                //console.log(price);
                
      }
      const formSubmit = (event) => {
        event.preventDefault();
      }

      const addToCart =(event) => {
        props.openModalHandler();
      }
        return (
            <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                  {products.map(product => <li key={product.id}>
                        <div className="cart-image">
                          <img src={product.image} alt="product" />
                          <div className="offer">{product.offer}% OFF</div>
                        </div>
                        <div className="cart-name">
                          <div className="item-name">{product.name}</div>
                          <div className="item-description">{product.description}</div>
                          <div>{product.quantity}</div>
                          <div>₹{product.MRP}</div>
                          <div className="price">₹{product.price}</div>
                          <div>
                            <button  type="button"  className="addCart-button" value={product.id} onClick={addToCart}>ADD CART</button>
                          </div>
                        </div>
                        <div className="cart-price">
                            <form onSubmit={formSubmit}>
                                <button className="value-button" id="decrease" onClick={(e) =>decreaseValue(e)}  value={product.id}>-</button>
                                <input type="number" id={product.id} className="number" value={props.productsAdded[product.id] ? props.productsAdded[product.id] : "0"}  readOnly/>
                                <button className="value-button" id="increase" onClick={increaseValue}  value={product.id}>+</button>
                              </form>
                        </div>
                      </li>)
                      }
                                                   
                </ul>
            </div>
            
        </div>
        );
    
}

export default Products;
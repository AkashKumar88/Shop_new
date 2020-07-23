import React from 'react';
import './App.css';
import Products from "./components/Products";
import Modal from './components/Modal';

class  App extends React.Component {

  state= { quantity: 0,
           prevQuantity: 0,
           products: [],
           productsAdded: {},
           productPrice: {},
           isShowing: false  };
  componentDidMount() {
        fetch('/api/products')
        .then(function (response) { return response.json();})
        .then(data => { this.setState({ products: data});});
  }

  sumObj = (obj) => {
    let sum =0;
    for(let el in obj){
      sum+= parseInt(obj[el]);
    }
    return sum;
  }

  onAddCart = (productObj, price) => {

    let q = this.sumObj(productObj);
    // this.setState(prev=> {
    //   return { quantity: q + parseInt(prev.quantity), prevQuantity: prev.quantity, 
    //           productsAdded: {...this.state.productsAdded, ...productObj}, 
    //           productPrice: {...this.state.productPrice,  ...price} };
    // }, ()=> console.log(this.state)
    // );
    this.setState(prev=> {
      return { quantity: q + parseInt(prev.quantity), prevQuantity: prev.quantity, 
              productsAdded: {...this.state.productsAdded, ...productObj}, 
              productPrice: {...this.state.productPrice,  ...price} };
    }
    );
  }

  renderList() {
    return Object.keys(this.state.productsAdded).map((data,i) => {
      let _qty = this.state.productsAdded[data];
      let _name = this.state.products.map(product => { return product.id === data ? product.name : ''});
      let _price = this.state.products.map(product => { return product.id === data ? product.price : ''});
      return  <>
            {_qty ===0 ? '' 
              : 
                <tr key={data}>
                  <td>{_name}</td>
                    <td>{_qty}</td>
                    <td>{_price}</td>
                </tr>
              }
          </>
      
   })
  }

      openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

  render(){
    return (
      <div className="grid-container">
              <header className="header">
                  <div className="contain">
                    <div>Qty: {' '}{this.sumObj(this.state.productsAdded)}</div>
                    <div>Total:{' '}{this.sumObj(this.state.productPrice)}</div>
                  </div>

                  {/* <div> <button type="button" className="button">CHECKOUT</button></div> */}
                  
                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    name='Shopping Cart'
                    close={this.closeModalHandler}>
                        
                        <table className="table">
                          <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.renderList()}
                          <tr>
                                <td>Total</td>
                                <td>{this.sumObj(this.state.productsAdded)}</td>
                                <td>{this.sumObj(this.state.productPrice)}</td>
                            </tr>
                              {/* {!this.state.term  && this.renderList()}
                              {this.state.term && this.renderSerchList()} */}
                          </tbody>
                        </table>
                </Modal>
                  
                {/* <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button> */}
                <div> <button type="button" className="button" onClick={this.openModalHandler}>CHECKOUT</button></div>
            
              </header>

              <main className="main">
                 <Products onAddCart={this.onAddCart}  
                      productsAdded={this.state.productsAdded} 
                      openModalHandler={this.openModalHandler}
                  />
              </main>
      
              <footer className="footer">
                  Shopping Cart
              </footer>
      
          </div>
        );
  }

}

export default App;

import React from "react";
import { connect } from 'react-redux';
import { addToCart, deleteItem, displayEditForm } from '../actions';

class ItemBox extends React.Component {

  orderBtnHandler = () => {
    this.props.addToCart(this.props.item);
  }

  editBtnHandler = () => {
    this.props.displayEditForm(this.props.item);
  }

  deleteBtnHandler = () => {
    this.props.deleteItem(this.props.item);
  }
  
  render(){
    return(
      <div className="menuItemOuterContainer">
        <div className="flexContainer menuItem">
            <div className="menuItemsImg">
              <img src={this.props.item.image} alt={this.props.item.category}/>
            </div>
            <div>
              <strong>{this.props.item.name}</strong>
              <p><small>Php {this.props.item.price}</small></p>
              <p>
                <button 
                  onClick={this.orderBtnHandler}
                  className ="buttonStyle">Order
                </button>
              </p>
              <p>
                <button 
                  onClick={this.editBtnHandler} 
                  className ="buttonStyle">Edit
                </button>
              </p>
              <p>
                <button 
                  onClick={this.deleteBtnHandler} 
                  className ="buttonStyle">Delete
                </button>
              </p>
            </div>
        </div>
      </div>    
    );
  }
} 


export default connect(null, {addToCart, deleteItem, displayEditForm})(ItemBox);
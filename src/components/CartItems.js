import React from "react";

class CartItems extends React.Component {

  render(){
    return(
      <div>{this.props.item.name}</div>    
    );
  }
}

export default CartItems;
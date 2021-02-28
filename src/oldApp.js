// import logo from './logo.svg';
import React from 'react';
import './App.css';
// import itemData from './itemData';
import ItemBox from './components/ItemBox';
import CartItems from './components/CartItems';
import FilterItems from './components/FilterItems';
import EditForm from './components/EditForm';
import { connect } from 'react-redux';

class App extends React.Component {

  state = {
    cart: [],
    // displayItems: itemData,
    filter: "All",
    editFormStyle: {
      display: 'none',
    },
    nameOfItemToEdit: '',
  };

  setCart = (item) => {
    let cartItems = this.state.cart.slice(0);
    cartItems.push(item);

    this.setState({
      cart: cartItems,
    }); 

    // console.log(this.state.cart); 
    //why does this have a delay with the items in the array
    //but when this is put in the render, this works fine
  }

  deleteItems = (itemName) => {

    let itemDataCopy = [];
    let itemDataCtr = 0;
    
    itemDataCopy = itemData;

    for(let i = 0; i < itemDataCopy.length; ++i){
      if(itemDataCopy[i].name !== itemName){
        itemData[itemDataCtr] = itemDataCopy[i];
        ++itemDataCtr;
      }
    }

    itemData.pop();

    //update the state to force it to re-render
    //bind the filter into the state
    //use that to rerender
    let items = [];

    if(this.state.filter === "All"){
      items = itemData;
    } else {
      items = itemData.filter(
        (item) => { 
          return item.category === this.state.filter;
        }
      );
    }
    //code above is copied from filterItems
    //re-filtering the items to update the state and re-render

    this.setState({
      displayItems: items,
    });

  }

  filterItems = (filterName) => {
    // alert(event);

    let items = [];

    if(filterName === "All"){
      items = itemData;
    } else {
      items = itemData.filter(
        function(item){
          return item.category === filterName;
        }
      );

    }
    
    this.setState({
      displayItems: items,
      filter: filterName,
    });

    // console.log(this.state.filteredItems); 
    //there's a delay; shoes the data beforethe setState
  }

  editItem = (editItemName) => {
    this.setState({
      editFormStyle: {display: 'block',},
      itemToEdit: editItemName,
    });
  }

  changeEditFormDisplay = () => {
    this.setState({
      editFormStyle: {display: 'none',},
    });
  }

  submitBtnHandler = (submission) => {
    //we can get the name as props, but for this one we'll just use 
    //whatever's in the state
    let itemName = this.state.itemToEdit
    let ctr = 0;

    while(itemName !== itemData[ctr].name){
      ++ctr;
    }

    itemData[ctr].name = submission.itemName;
    itemData[ctr].price = submission.itemPrice*1;
    itemData[ctr].category = submission.itemCategory;
    itemData[ctr].image = submission.itemImage;    

    console.log(submission);

    this.setState({
      displayItems: itemData,
    });
  }


  render() {
    return(
      <div className="flexContainer setColor">
        <EditForm 
          editFormStyle={this.state.editFormStyle}
          changeEditFormDisplay={this.changeEditFormDisplay}
          submitBtnHandler={this.submitBtnHandler}
          nameOfItemToEdit={this.state.nameOfItemToEdit}
        />
        <div className="menuItemsContainer">
          <div>
            <FilterItems 
              filterItems={this.filterItems}
            />
          </div>
          <div className="flexContainer">
            {this.props.itemData.map(
              (item, index) => {
                return <ItemBox 
                  key={index}
                  name={item.name}
                  price={item.price}
                  img={item.image}
                  category={item.category}
                  addToCart={this.setCart}
                  deleteItems={this.deleteItems}
                  editItem={this.editItem}
                />
              }
            )}
          </div>
        </div>
        <div className="cartItemsContainer">
          <h2>Cart</h2>
          {this.state.cart.map((cartItem, index) => {
            /* console.log(this.state.cart); */
            return <CartItems 
              key = {index}
              item ={cartItem}
            />
          })}
        </div>
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {

  return itemData = state.itemData;

};

export default connect(mapStateToProps)(App);

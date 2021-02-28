// import logo from './logo.svg';
import React from 'react';
import './App.css';
import ItemBox from './components/ItemBox';
import CartItems from './components/CartItems';
import FilterItems from './components/FilterItems';
import EditForm from './components/EditForm';
import AddNewItemForm from './components/AddNewItemForm';
import { connect } from 'react-redux';
import { displayAddNewItemForm } from './actions';

class App extends React.Component {

  addNewItemBtnHandler = () => {
    this.props.displayAddNewItemForm();
  }

  render() {
    return(
      <div className="flexContainer backgroundColor">
        {this.props.isAppearEditForm ? <EditForm /> : null}
        {this.props.isAppearAddNewItemForm ? <AddNewItemForm /> : null}
        <div className="menuItemsContainer">
          <div>
            <button 
              className ="buttonStyle"
              onClick={this.addNewItemBtnHandler}
            >Add New Item</button>
          </div>
          <div>
            Filter:{' '}
            <FilterItems 
              filterItems={this.filterItems}
            />
          </div>
          <div className="flexContainer">
            {this.props.itemData.filter(
              (item) => {
                if(this.props.filterSelected === 'All'){
                  return item
                } else {
                  return item.category === this.props.filterSelected
                }
              }).map((item) => {
                return <ItemBox 
                  key={item.id}
                  item={item}
                />
              })}
          </div>
        </div>
        <div className="cartItemsContainer">
          <h2>Cart</h2>
          {this.props.itemsInCart.map(
            (item, index) => {
              return <CartItems 
                key={index}
                item={item}
              />
            }
          )}
        </div>
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {

  return {
    itemData: state.itemData,
    itemsInCart: state.itemsInCart,
    isAppearEditForm: state.isAppearEditForm,
    filterSelected: state.filterSelected,
    isAppearAddNewItemForm: state.isAppearAddNewItemForm,
  }

};

export default connect(mapStateToProps, {displayAddNewItemForm})(App);

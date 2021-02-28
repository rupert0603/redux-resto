import React from 'react';
import { connect } from 'react-redux';
import { postAddNewItemData, commitAddNewItemData } from '../actions';

class AddNewItemForm extends React.Component {

  state = {
    name: this.props.addNewItemFormData.name,
    price: this.props.addNewItemFormData.price,
    category: this.props.addNewItemFormData.category,
    image: this.props.addNewItemFormData.image,
  };

  //this componet will have the data in the store once it's opened

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  cancelBtnHandler = (event) => {

    this.props.postAddNewItemData(this.state);
    event.preventDefault();
  }

  submitBtnHandler = (event) => {

    this.props.commitAddNewItemData(this.state);

    event.preventDefault();
  }

  render(){
    return (
      <div className="editForm">
        <div className="formContent">
          <div className="formContainer">
            <h2>Add New Item</h2>
            <form onSubmit={this.submitBtnHandler}>
              <label htmlFor="name">Name: </label>
              <input 
                type="text" 
                name="name" 
                value={this.state.name} 
                onChange={this.changeHandler}
                required
              />
              <br />
              <label htmlFor="price">Price: </label>
              <input 
                type="number" 
                name="price" 
                value={this.state.price} 
                onChange={this.changeHandler}
                min='0'
                required
              />
              <br />
              <label htmlFor="category">Category: </label>
              <input 
                type="text" 
                name="category" 
                value={this.state.category} 
                onChange={this.changeHandler}
                required
              />
              <br />
              <label htmlFor="image">Image: </label>
              <input 
                type="text" 
                name="image" 
                value={this.state.image} 
                onChange={this.changeHandler}
                required
              />
              <div>
                <button 
                  className="buttonStyle"
                //   onClick={this.submitBtnHandler}
                >Save</button>
                <button 
                  className="buttonStyle" 
                  onClick={this.cancelBtnHandler}
                >Cancel</button>
              </div>
            </form>    
          </div>    
        </div>
      </div>
      //Name Price Category Image Save Cancel    
    );    
  }

}

const mapStateToProps = (state) => {
  return {
    addNewItemFormData: state.addNewItemFormData,
  };
}

export default connect(mapStateToProps, {postAddNewItemData, commitAddNewItemData})(AddNewItemForm);

//use clicks edit buttn
//editform data gets data from store via id
//one cancel is clicked, data in the form is put in the store
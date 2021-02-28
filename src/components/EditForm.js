import React from 'react';
import { connect } from 'react-redux';
import { postEditData, commitEditItemData } from '../actions';

class EditForm extends React.Component {

  state = {
    id: this.props.itemBeingEdited.id,
    name: (this.props.indexOfDataFromEditForm === -1 
      ?
      this.props.itemBeingEdited.name
      :
      this.props.dataFromEditForm[this.props.indexOfDataFromEditForm]?.name),
    price: (this.props.indexOfDataFromEditForm === -1 
      ?
      this.props.itemBeingEdited.price
      :
      this.props.dataFromEditForm[this.props.indexOfDataFromEditForm]?.price),
    category: (this.props.indexOfDataFromEditForm === -1 
      ?
      this.props.itemBeingEdited.category
      :
      this.props.dataFromEditForm[this.props.indexOfDataFromEditForm]?.category),
    image: (this.props.indexOfDataFromEditForm === -1 
      ?
      this.props.itemBeingEdited.image
      :
      this.props.dataFromEditForm[this.props.indexOfDataFromEditForm]?.image),
  };

  //this componet will have the data in the store once it's opened

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  cancelBtnHandler = (event) => {

    this.props.postEditData(this.state);
    event.preventDefault();
  }

  submitBtnHandler = (event) => {

    this.props.commitEditItemData(this.state);

    event.preventDefault();
  }

  render(){
    return (
      <div className="editForm">
        <div className="formContent">
          <div className="formContainer">
            <h2>Edit Item - {this.props.itemBeingEdited.name}</h2>
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
    itemBeingEdited: state.itemBeingEdited,
    dataFromEditForm: state.dataFromEditForm,
    indexOfDataFromEditForm: state.dataFromEditForm.findIndex((data) => {
      return state.itemBeingEdited.id === data.id;
    }),
  };
}

export default connect(mapStateToProps, {postEditData, commitEditItemData})(EditForm);

//use clicks edit buttn
//editform data gets data from store via id
//one cancel is clicked, data in the form is put in the store
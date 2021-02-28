import React from "react";
import { connect } from 'react-redux';
import { changeFilter } from '../actions';

class FilterItems extends React.Component {

  render(){
    return(
      <select 
        defaultValue = "Default"
        onChange={ (event) => {
          this.props.changeFilter(event.target.value)
        }}
      >
        <option value="Default" disabled>Select Category</option>
        {this.props.itemCategories.map((category) => {
          return <option 
            value={category}
            key={category}>
              {category}
            </option>
        })}
      </select>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCategories: state.itemCategories,
  };
}

export default connect(mapStateToProps, {changeFilter})(FilterItems);
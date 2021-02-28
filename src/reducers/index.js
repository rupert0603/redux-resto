import { uuid } from 'uuidv4';

let notItemsForDeletion = [];
let cartItems = [];
let getDataFromEditForm = [];
let index = -1;
let updatedItemData = [];
let newItem = {};
let updatedCategories = [];
let updatedFilterSelected = '';

const initialState = {

  itemData: [
    {
      id: uuid(),
      name: "Burger",
      price: 50,
      category: "Food",
      image: "https://image.flaticon.com/icons/svg/1046/1046784.svg"
    },
    {
      id: uuid(),
      name: "Pizza",
      price: 100,
      category: "Food",
      image: "https://image.flaticon.com/icons/svg/1046/1046771.svg"
    },
    {
      id: uuid(),
      name: "Fries",
      price: 25,
      category: "Food",
      image: "https://image.flaticon.com/icons/svg/1046/1046786.svg"
    },
    {
      id: uuid(),
      name: "Coffee",
      price: 35,
      category: "Drink",
      image: "https://image.flaticon.com/icons/svg/1046/1046785.svg"
    },
    {
      id: uuid(),
      name: "Iced Tea",
      price: 45,
      category: "Drink",
      image: "https://image.flaticon.com/icons/svg/1046/1046782.svg"
    },
    {
      id: uuid(),
      name: "Hot Tea",
      price: 45,
      category: "Drink",
      image: "https://image.flaticon.com/icons/svg/1046/1046792.svg"
    }
  ],
  itemCategories: ['All', 'Food', 'Drink'],
  itemsInCart: [],
  isAppearEditForm: false,
  dataFromEditForm: [], //this saves data of all inputs on the Edit Form, so user
  //can come back later (data will not get removed once user clicks 
  //'Cancel'). Once user hits 'Save',
  //the item being edited will be removed from this array
  itemBeingEdited: {},
  filterSelected: 'All',
  isAppearAddNewItemForm: false,
  addNewItemFormData: {
    name: '',
    price: '',
    category: '',
    image: '',
  },
};

const reducer = (state = initialState, action) => {
  
  switch(action.type){
    case 'ADD_TO_CART':
      cartItems = state.itemsInCart.slice(0);
      cartItems.push(action.payload);

      return {
        ...state,
        itemsInCart: cartItems,
      };

    case 'DELETE_ITEM':
      notItemsForDeletion = state.itemData.filter((item) => {
        return item.name !== action.payload.name;
      });

      updatedCategories = state.itemCategories.slice(0);
      updatedFilterSelected = state.filterSelected;

      //check if the category still exists in other items after deleting the item
      index = notItemsForDeletion.findIndex((item) => {
        return item.category === action.payload.category;
      });

      //if category doesn't exist (-1), then delete that category as well
      if (index === -1) {
        updatedCategories = updatedCategories.filter((category) => {
          return category !== action.payload.category;
        });

        if(state.filterSelected === action.payload.category){
          updatedFilterSelected = 'All';
        }
      }
      //if the category is deleted and that is the selected filter, then revert the filter to All as default

      return {
        ...state,
        itemData: notItemsForDeletion,
        itemCategories: updatedCategories,
        filterSelected: updatedFilterSelected,
      };

    case 'DISPLAY_EDIT_FORM':

      //once the use clicks "Edit" on an item, the Edit Form is displayed and the item
      //that will be edited is saved to state.itemBeingEdited. This will be used
      //for the data that will be displayed in the Edit Form
      return {
        ...state,
        isAppearEditForm: true,
        itemBeingEdited: action.payload,
      };

    case 'POST_EDIT_DATA':
      getDataFromEditForm = state.dataFromEditForm.slice(0);

      //finds index of the item being edited
      index = getDataFromEditForm.findIndex((data) => {
        return data.id === action.payload.id;
      });

      //update that item
      getDataFromEditForm[index] = action.payload;

      if(index !== -1){
        getDataFromEditForm[index] = action.payload;
      } else {
        getDataFromEditForm.push(action.payload);
      }

      return {
        ...state,
        isAppearEditForm: false,
        dataFromEditForm: getDataFromEditForm,
      };

    case 'COMMIT_EDIT_ITEM':
      //remove item from dataFromEditForm
      notItemsForDeletion = state.dataFromEditForm.filter((data) => {
        return data.id !== action.payload.id;
      });

      //edit the item in the itemData
      updatedItemData = state.itemData.slice(0); 
      index = updatedItemData.findIndex((data) => {
        return data.id === action.payload.id;
      });

      updatedItemData[index] = action.payload;

      updatedCategories = state.itemCategories.slice(0);

      //check if the category exists
      index = updatedCategories.findIndex((category) => {
        return category === action.payload.category;
      });

      if (index === -1) {
        updatedCategories.push(action.payload.category)
      }
 
      return {
        ...state,
        dataFromEditForm: notItemsForDeletion,
        isAppearEditForm: false,
        itemData: updatedItemData,
        itemCategories: updatedCategories,
      };

    case 'CHANGE_FILTER':

      updatedFilterSelected = action.payload;

      return {
        ...state,
        filterSelected: updatedFilterSelected,
      };

    case 'DISPLAY_ADD_NEW_ITEM_FORM':
      return {
        ...state,
        isAppearAddNewItemForm: true,
      };

    case 'POST_ADD_NEW_ITEM_DATA':
      return {
        ...state,
        addNewItemFormData: action.payload,
        isAppearAddNewItemForm: false,
      }

    case 'COMMIT_ADD_NEW_ITEM':

      newItem = {
        ...action.payload,
        id: uuid(),
      };

      updatedItemData = state.itemData.slice(0);
      updatedItemData.push(newItem);

      updatedCategories = state.itemCategories.slice(0);

      //check if the category exists
      index = updatedCategories.findIndex((category) => {
        return category === action.payload.category;
      });

      if (index === -1) {
        updatedCategories.push(action.payload.category)
      }

      return {
        ...state,
        itemData: updatedItemData,
        isAppearAddNewItemForm: false,
        addNewItemFormData: {
          name: '',
          price: '',
          category: '',
          image: ''
        },
        itemCategories: updatedCategories,
      };

    default:
      return state;
  }

  
}

export default reducer;
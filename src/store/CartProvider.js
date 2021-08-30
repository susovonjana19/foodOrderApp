import { useReducer } from 'react';
import CartContext from './cart-context';

//set default value of cart
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

//use reducer to update cart value
const cartReducer = (state, action) => {
	//update the state with current value
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			//if item already in cart then copy the previous calue and update only amount
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items]; //and set the new updated value in to state
			updatedItems[existingCartItemIndex] = updatedItem; //also set the updated index
		} else {
			//if Item add first time
			updatedItems = state.items.concat(action.item);
		}
		return {
			//updated return
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	//for remove item from cart
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price; //total amount
		let updatedItems;
		if (existingItem.amount === 1) {
			//if only one quentity then remove the all item
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			//if number of quentity more then one then only remove the quentity
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		//return the final data
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	//default return
	return defaultCartState;
};

const CartProvider = (props) => {
	//call the reducer. there are tow const current snap and dispatch which call by the function
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemFromCartHandler = (item) => {
		//call the dispatch fuction to perform the action which we set in type
		dispatchCartAction({
			type: 'ADD',
			item: item,
		});
	};

	const removeItemFromCartHandler = (id) => {
		//same as delee we set dispatch function
		dispatchCartAction({
			type: 'REMOVE',
			id: id,
		});
	};

	//update the cart context by new value
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemFromCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;

import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	//assign or store value
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItem = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
		//cartCtx.addItem(item);
	};

	//console the order details
	const confirmOrderHandler = (props) => {
		console.log('Your Order is:', cartCtx.items);
	};

	//render the ul li item for cart item
	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onCloseCart={props.onCloseCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onCloseCart}>
					Close
				</button>
				{hasItem && (
					<button className={classes.button} onClick={confirmOrderHandler}>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;

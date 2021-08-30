import React from 'react';

import calsses from './Input.module.css';
//input field component.
//we can use {...props.input} directly for render all the element of input. Otherwise we can write like type={props.input.type}
const Input = React.forwardRef((props, ref) => {
	return (
		<div className={calsses.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
	);
});

export default Input;

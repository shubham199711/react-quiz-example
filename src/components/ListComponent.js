import React, { useState } from 'react';

function ListComponent({ list, setList }) {
	const [color, setColor] = useState('red');
	return (
		<div className='App'>
			{list.map((item) => (
				<h1>{item}</h1>
			))}
			<button
				style={{
					color: color,
				}}
				onClick={() => {
					setList([232, 2, 1]);
					setColor((prev) => (prev === 'red' ? 'green' : 'red'));
				}}
			>
				Change list
			</button>
		</div>
	);
}

export default ListComponent;

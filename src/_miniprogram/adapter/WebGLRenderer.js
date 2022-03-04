const parametersAdapter = ( parameters ) => {

	const canvas = parameters.canvas;
	canvas.addEventListener = () => {

		console.log( '[three adapter]', 'add \'addEventListener\'' );

	};

	canvas.removeEventListener = () => {

		console.log( '[three adapter]', 'add \'removeEventListener]\'' );

	};

};

export {
	parametersAdapter
};

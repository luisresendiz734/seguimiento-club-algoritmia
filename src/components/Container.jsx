const Container = ({ children }) => {
	return (
		<div
			style={{
				width: '90%',
				maxWidth: '1000px',
				margin: '1rem auto',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			{children}
		</div>
	);
};

export default Container;

import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'problem', headername: 'Problem', width: 250 }
];

export default function List({ list, users }) {
	const getColumns = () => {
		const cols = [ ...columns ];
		users
			.sort((u, v) => (u.solved.length > v.solved.length ? -1 : 1))
			.forEach(({ username, solved }) => {
				cols.push({
					field: username,
					headerName: `${username} ${solved.length}`,
					width: 150
				});
			});
		return cols;
	};

	const getRows = () =>
		list.map((row, idx) => {
			const results = {};
			users.sort((u, v) => (u.solved.length > v.solved.length ? -1 : 1)).forEach((user) => {
				if (user.solved.includes(idx + 1)) {
					results[user.username] = 'AC';
				} else {
					results[user.username] = '-';
				}
			});
			return { id: idx + 1, ...row, ...results };
		});

	return (
		<div style={{ width: '100%', margin: '1rem auto' }}>
			<DataGrid
				pageSize={30}
				disableColumnMenu
				hideFooterSelectedRowCount
				autoHeight
				rows={getRows()}
				columns={getColumns()}
			/>
		</div>
	);
}

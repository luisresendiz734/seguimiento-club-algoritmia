import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import List from './List';
import basicos from '../data/basicos.json';
import intermedios from '../data/intermedios.json';
import { firestore } from '../utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const RankListsPage = () => {
	const [ tab, setTab ] = useState(0);
	const huronesRef = firestore.collection('hurones');
	const query = huronesRef;
	const [ hurones ] = useCollectionData(query);

	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};

	// const updateOnlyOnce = async () => {
	// 	await huronesRef.add({
	// 		username: 'DarKbYte',
	// 		type: 1,
	// 		solved: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20 ]
	// 	});
	// };

	return (
		<div>
			{/* <button onClick={updateOnlyOnce}>add more hurones</button> */}
			<Paper square>
				<Tabs
					value={tab}
					indicatorColor="primary"
					textColor="primary"
					onChange={handleTabChange}
					variant="fullWidth"
				>
					<Tab label="Basicos" />
					<Tab label="Intermedios" />
					<Tab label="Avanzados" disabled />
				</Tabs>
			</Paper>
			<TabPanel value={tab} index={0}>
				{hurones ? (
					<List list={basicos} users={hurones.filter((huron) => huron.type === 1)} />
				) : (
					<h4>Loading...</h4>
				)}
			</TabPanel>
			<TabPanel value={tab} index={1}>
				{hurones ? (
					<List list={intermedios} users={hurones.filter((huron) => huron.type === 2)} />
				) : (
					<h4>Loading...</h4>
				)}
			</TabPanel>
		</div>
	);
};

export default RankListsPage;

import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../utils/firebase';
import Container from './Container';

const PendingList = ({ user = null }) => {
	const uploadsRef = firestore.collection('uploads');
	const huronesRef = firestore.collection('hurones');
	const [ uploads ] = useCollectionData(uploadsRef, { idField: 'id' });
	const [ hurones ] = useCollectionData(huronesRef, { idField: 'id' });
	console.log(uploads);

	const handleAcceptProblem = async (username, pid, uid, del = false) => {
		const huron = hurones.find((h) => h.username === username);
		const huronRef = huronesRef.doc(huron.id);
		const uploadRef = uploadsRef.doc(uid);
		if (del) {
			await uploadRef.delete();
			return;
		}
		huron.solved.push(pid);
		huronRef.set(
			{
				...huron
			},
			{ merge: true }
		);
		await uploadRef.delete();
	};
	console.log(uploads);
	return (
		<Container>
			<Typography style={{ margin: '2rem 0' }} variant="h4">
				Pending list
			</Typography>
			{uploads && uploads.length ? (
				<section>
					{uploads.map(({ username, image, problemId, id }) => (
						<Card key={id} style={{ margin: '1rem 0' }}>
							<CardContent>
								<Typography variant="h6">
									user: {username}, problemId: {problemId}
								</Typography>
							</CardContent>
							{user && (
								<CardActions>
									<Button
										href={image}
										color="primary"
										target="_blank"
										rel="noopener noreferrer"
									>
										view image
									</Button>
									<Button
										onClick={() => handleAcceptProblem(username, problemId, id)}
										color="primary"
									>
										accept
									</Button>
									<Button
										onClick={() =>
											handleAcceptProblem(username, problemId, id, true)}
										color="primary"
									>
										deny
									</Button>
								</CardActions>
							)}
						</Card>
					))}
				</section>
			) : (
				<Typography variant="h6">Empty</Typography>
			)}
		</Container>
	);
};

export default PendingList;

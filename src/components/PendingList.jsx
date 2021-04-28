import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../utils/firebase';

const PendingList = ({ user = null }) => {
	const uploadsRef = firestore.collection('uploads');
	const huronesRef = firestore.collection('hurones');
	const [ uploads ] = useCollectionData(uploadsRef, { idField: 'id' });
	const [ hurones ] = useCollectionData(huronesRef, { idField: 'id' });
	console.log(uploads);

	const handleAcceptProblem = async (username, pid, uid) => {
		const huron = hurones.find((h) => h.username === username);
		const huronRef = huronesRef.doc(huron.id);
		const uploadRef = uploadsRef.doc(uid);
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
		<div>
			<Typography variant="h3">Pending list</Typography>
			{uploads && uploads.length ? (
				<section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
					{uploads.map(({ username, image, problemId, id }) => (
						<Card key={id}>
							<CardContent>
								<Typography variant="h6">
									user: {username}, problemId: {problemId}
								</Typography>
							</CardContent>
							<CardActions>
								{user && (
									<React.Fragment>
										<Button
											href={image}
											color="primary"
											target="_blank"
											rel="noopener noreferrer"
										>
											view image
										</Button>
										<Button
											onClick={() =>
												handleAcceptProblem(username, problemId, id)}
											color="primary"
										>
											accept
										</Button>
									</React.Fragment>
								)}
							</CardActions>
						</Card>
					))}
				</section>
			) : (
				<Typography variant="h5">Empty uploads list</Typography>
			)}
		</div>
	);
};

export default PendingList;

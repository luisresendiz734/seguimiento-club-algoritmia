import { useState } from 'react';
import { storage, firestore } from '../utils/firebase';
import PendingList from './PendingList';
import { InputLabel, FormControl, Select, MenuItem, Button, Typography } from '@material-ui/core';
import Container from './Container';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { nanoid } from 'nanoid';

const UploadPage = () => {
	const [ ids ] = useState(Array.from(Array(100)));
	const [ username, setUsername ] = useState('');
	const [ problemId, setProblemId ] = useState('');
	const [ file, setFile ] = useState(null);
	const [ errors, setErrors ] = useState(null);
	const huronesRef = firestore.collection('hurones');
	const query = huronesRef.orderBy('username', 'asc');
	const [ hurones ] = useCollectionData(query);
	const [ loading, setLoading ] = useState(false);

	const handleUpload = async (e) => {
		setLoading(true);
		e.preventDefault();
		setErrors(null);
		const newErrors = [];
		if (username.trim().length < 3) newErrors.push('invalid username');
		if (!problemId.toString().trim().length) newErrors.push('invalid problem id');
		if (!file) newErrors.push('invalid file, only images');
		if (newErrors.length) {
			setErrors(newErrors);
			setLoading(false);
			return;
		}
		const storageRef = storage.ref();
		const fileRef = storageRef.child(nanoid());
		await fileRef.put(file);
		const fileLink = await fileRef.getDownloadURL();
		const uploadsRef = firestore.collection('uploads');
		await uploadsRef.add({
			image: fileLink,
			problemId: Number(problemId),
			username
		});
		setUsername('');
		setProblemId('');
		setFile(null);
		setLoading(false);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<div>
			<Container>
				<Typography variant="h3">Upload</Typography>
				<form
					onSubmit={handleUpload}
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '1rem'
					}}
				>
					<FormControl>
						<InputLabel id="uid">Username</InputLabel>
						<Select
							disabled={loading}
							labelId="uid"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						>
							{hurones &&
								hurones.map((huron, i) => (
									<MenuItem key={i} value={huron.username}>
										{huron.username}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel id="pid">Problem ID</InputLabel>
						<Select
							disabled={loading}
							labelId="pid"
							value={problemId}
							onChange={(e) => setProblemId(e.target.value)}
						>
							{ids.map((val, i) => (
								<MenuItem key={i} value={i + 1}>
									{i + 1}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<div>
						<input
							type="file"
							accept="image/*"
							disabled={loading}
							onChange={handleFileChange}
							style={{ display: 'none ' }}
							id="file-input"
						/>
						<label htmlFor="file-input">
							<Button variant="contained" color="primary" component="span">
								Select image
							</Button>{' '}
							{file && file.name}
						</label>
					</div>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							variant="contained"
							type="submit"
							disabled={loading}
							color="primary"
						>
							Accept
						</Button>
					</div>
				</form>
			</Container>
			{errors && (
				<section>
					{Object.keys(errors).map((error, i) => (
						<Typography style={{ color: 'red' }} key={i}>
							{errors[error]}
						</Typography>
					))}
				</section>
			)}
			<PendingList />
		</div>
	);
};

export default UploadPage;

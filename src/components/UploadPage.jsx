import { useState } from 'react';
import { storage, firestore } from '../utils/firebase';
import PendingList from './PendingList';
import { InputLabel, FormControl, Select, MenuItem, Button, Typography } from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const UploadPage = () => {
	const [ ids ] = useState(Array.from(Array(100)));
	const [ username, setUsername ] = useState('');
	const [ problemId, setProblemId ] = useState('');
	const [ file, setFile ] = useState(null);
	const [ errors, setErrors ] = useState(null);
	const huronesRef = firestore.collection('hurones');
	const query = huronesRef.orderBy('username', 'asc');
	const [ hurones ] = useCollectionData(query);

	const handleUpload = async (e) => {
		e.preventDefault();
		setErrors(null);
		const newErrors = [];
		console.log(problemId, username, file);
		if (username.trim().length < 3) newErrors.push('invalid username');
		if (!problemId.toString().trim().length) newErrors.push('invalid problem id');
		if (!file) newErrors.push('invalid file, only images');
		if (newErrors.length) {
			setErrors(newErrors);
			return;
		}
		const storageRef = storage.ref();
		const fileRef = storageRef.child(file.name);
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
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<div>
			<section>
				<h1>Upload</h1>
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
						<input type="file" accept="image/*" onChange={handleFileChange} />
					</div>
					<div>
						<Button variant="contained" type="submit" color="primary">
							Upload
						</Button>
					</div>
				</form>
			</section>
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

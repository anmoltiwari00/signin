import axios from 'axios';

const getName = (data) => {
	return (
		axios.post('https://www.mocky.io/v2/5d0a3c213400005f29d83477', {data}, {'content-type': 'application/json'})
			.then(res => res.data)
			.catch(error => error)
	)

}

export default getName;
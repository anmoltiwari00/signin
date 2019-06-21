import axios from 'axios';

const getSuccessResponse = () => {
	return (
		axios.post('https://www.mocky.io/v2/5d0a3b85340000d6e7d83471', {'content-type': 'application/json'})
			.then(res => res.data)
			.catch(error => error)
	)

}

export default getSuccessResponse;
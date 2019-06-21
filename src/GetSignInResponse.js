import axios from 'axios';

const getSignInResponse = () => {
	return (
		axios.post('http://www.mocky.io/v2/5d0a3bc43400004227d83473', {'content-type': 'application/json'})
			.then(res => res)
			.catch(error => error)
	)

}

export default getSignInResponse;
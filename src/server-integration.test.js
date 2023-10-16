const newman = require('newman')

const collectionPath = 'postman[inst] Lab1.postman_collection.json'
const environmentPath = 'postman[inst][local] Lab1.postman_environment.json'

newman.run(
	{
		collection: require(collectionPath),
		environment: require(environmentPath),
		reporters: 'cli',
	},
	(err) => {
		if (err) {
			console.error('Integration tests failed:', err)
		} else {
			console.log('Integration tests completed successfully.')
		}
	}
)

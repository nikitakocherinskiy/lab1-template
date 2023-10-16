const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg')

const app = express()
const port = process.env.PORT || 5000

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
})
client.connect()

app.use(bodyParser.json())

app.get('/persons/:personId', (req, res) => {
	const personId = req.params.personId
	client.query(
		'SELECT * FROM persons WHERE id = $1',
		[personId],
		(error, results) => {
			if (error) {
				res.status(500).json({ error: 'Internal Server Error' })
			} else {
				if (results.rows.length === 0) {
					res.status(404).json({ error: 'Not Found' })
				} else {
					res.json(results.rows[0])
				}
			}
		}
	)
})

app.get('/persons', (req, res) => {
	client.query('SELECT * FROM persons', (error, results) => {
		if (error) {
			res.status(500).json({ error: 'Internal Server Error' })
		} else {
			res.json(results.rows)
		}
	})
})

app.post('/persons', (req, res) => {
	const newPerson = req.body
	client.query(
		'INSERT INTO persons (name, age) VALUES ($1, $2) RETURNING *',
		[newPerson.name, newPerson.age],
		(error, results) => {
			if (error) {
				res.status(500).json({ error: 'Internal Server Error' })
			} else {
				res
					.status(201)
					.header('Location', `/persons/${results.rows[0].id}`)
					.send()
			}
		}
	)
})

app.patch('/persons/:personId', (req, res) => {
	const personId = req.params.personId
	const updatedPerson = req.body

	if (!personId || !updatedPerson) {
		return res.status(400).json({ error: 'Bad Request' })
	}

	client.query(
		'UPDATE persons SET name = $1, age = $2 WHERE id = $3 RETURNING *',
		[updatedPerson.name, updatedPerson.age, personId],
		(error, results) => {
			if (error) {
				res.status(500).json({ error: 'Internal Server Error' })
			} else {
				if (results.rows.length === 0) {
					res.status(404).json({ error: 'Not Found' })
				} else {
					res.json(results.rows[0])
				}
			}
		}
	)
})

app.delete('/persons/:personId', (req, res) => {
	const personId = req.params.personId

	if (!personId) {
		return res.status(400).json({ error: 'Bad Request' })
	}

	client.query(
		'DELETE FROM persons WHERE id = $1',
		[personId],
		(error, results) => {
			if (error) {
				res.status(500).json({ error: 'Internal Server Error' })
			} else {
				if (results.rowCount === 0) {
					res.status(404).json({ error: 'Not Found' })
				} else {
					res.status(204).send()
				}
			}
		}
	)
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

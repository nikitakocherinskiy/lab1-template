const { expect } = require('chai')
const request = require('supertest')
const express = require('express')
const app = express()
const client = require('pg').Client
const testClient = new client()

before(async () => {
	await testClient.connect()
	await testClient.query(
		'CREATE TABLE IF NOT EXISTS persons (id serial PRIMARY KEY, name TEXT, age INTEGER)'
	)
})

describe('GET /persons/:personId', () => {
	it('should return 200 and a person when a valid personId is provided', (done) => {
		request(app)
			.get('/persons/1')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				expect(res.body).to.be.an('object')
				expect(res.body).to.have.property('id')
				expect(res.body).to.have.property('name')
				expect(res.body).to.have.property('age')
				done()
			})
	})

	// Unit-тесты для GET /persons
	describe('GET /persons', () => {
		it('should return a list of people with status 200', (done) => {
			request(app)
				.get('/persons')
				.expect(200)
				.end((err, res) => {
					if (err) return done(err)
					expect(res.body).to.be.an('array')
					done()
				})
		})
	})

	// Unit-тесты для POST /persons
	describe('POST /persons', () => {
		it('should create a new person and return 201 with a Location header', (done) => {
			const newPerson = { name: 'John Doe', age: 30 }
			request(app)
				.post('/persons')
				.send(newPerson)
				.expect(201)
				.end((err, res) => {
					if (err) return done(err)
					expect(res.headers).to.have.property('location')
					done()
				})
		})

		it('should return 400 when invalid data is provided', (done) => {
			const invalidPerson = { invalidKey: 'Invalid Value' }
			request(app).post('/persons').send(invalidPerson).expect(400, done)
		})
	})

	// Unit-тесты для PATCH /persons
	describe('PATCH /persons', () => {
		it('should update an existing person and return 200', (done) => {
			const updatedPerson = { name: 'Updated Name', age: 35 }
			request(app).patch('/persons/1').send(updatedPerson).expect(200, done)
		})

		it('should return 400 when invalid data is provided', (done) => {
			const invalidData = { invalidKey: 'Invalid Value' }
			request(app).patch('/persons/1').send(invalidData).expect(400, done)
		})

		it('should return 404 when updating a non-existing person', (done) => {
			const updatedPerson = { name: 'Updated Name', age: 35 }
			request(app).patch('/persons/999').send(updatedPerson).expect(404, done)
		})
	})

	// Unit-тесты для DELETE /persons
	describe('DELETE /persons', () => {
		it('should delete an existing person and return 204', (done) => {
			request(app).delete('/persons/1').expect(204, done)
		})

		it('should return 404 when deleting a non-existing person', (done) => {
			request(app).delete('/persons/999').expect(404, done)
		})
	})

	it('should return 404 when an invalid personId is provided', (done) => {
		request(app).get('/persons/999').expect(404, done)
	})
})

after(async () => {
	await testClient.query('DROP TABLE IF EXISTS persons')
	await testClient.end()
})

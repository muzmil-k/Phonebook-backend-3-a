const e = require('express');
const express = require('express');
const app = express();
app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "49332-382-21"
    },
    {
        id: 2,
        name: "Ada LOvelace",
        number: "239-382-21"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "8329-382-21"
    }, {
        id: 4,
        name: "Mary Poppindick",
        number: "0432-382-21"
    },
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id);
    response.status(204).end()


})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log(body);
    const id = Math.floor(Math.random() * 10000)

    if (!(body.name || body.number)) {
        response.status(400).json({
            error: "Name and number are missing"
        })
    } else if (!body.name) {
        response.status(400).json({
            error: 'Name is missing'
        })
    } else if (!body.number) {
        response.status(400).json({
            error: 'Number is missing'
        })
    } else if (persons.map(n => n.name).includes(body.name)) {
        response.status(409).json({
            error: 'Name already exists'
        })
    }
    else {
        const person = {
            id: id,
            name: body.name,
            numebr: body.number
        }
        persons = persons.concat(person)
        response.json(body);
        console.log(persons)

    }



})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>');
    console.log(persons.map(n => n.name))
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})


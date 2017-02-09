module.exports = (Organism) => 
  (req, res) => {
    const query = req.body
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)
    // console.log('query', query)
    console.log('query', typeof JSON.parse(JSON.stringify(query)))
    return Organism.create(JSON.parse(JSON.stringify(query)))
                    .then(success)
                    .catch(error)
  }


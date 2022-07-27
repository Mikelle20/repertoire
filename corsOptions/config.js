const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, DELETE, HEAD, PUT, PATCH',
  credentials: true
}

module.exports = {
  corsOptions
}

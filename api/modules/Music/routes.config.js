module.exports = [
  { path: '/',
    method: 'get', action: 'find' },
  { path: '/',
    method: 'post', action: 'create' },
  { path: '/schema',
    method: 'get', action: 'getSchema' },
  { path: '/filter',
    method: 'get', action: 'findByFilter' },
  { path: '/populate',
    method: 'get', action: 'findAllPopulate' },
  { path: '/get/music/:id',
    method: 'get', action: 'findByIdAndGetMusic' },
  { path: '/:id',
    method: 'get', action: 'findById' },
  { path: '/:id/populate',
    method: 'get', action: 'findByIdPopulate' },
  { path: '/:id',
    method: 'put', action: 'update' },
  { path: '/:id',
    method: 'delete', action: 'remove' },
]

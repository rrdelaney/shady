var shady = require('shady')

var sink = shady.wait(['done'])

setTimeout(sink.send('done'), 1000)

sink.then(function () {
  console.log('Process finished!')
})

// require('eventsource-polyfill');
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(evt => {
	if(evt.action === 'reload') {
		window.location.reload();
	}
})
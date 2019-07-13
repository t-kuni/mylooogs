module.exports = {
  devServer: {
    port            : 80,
    host            : '0.0.0.0',
    disableHostCheck: true,

    headers: {
      'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS',
      'Access-Control-Allow-Origin': '*',
    }
  }
}

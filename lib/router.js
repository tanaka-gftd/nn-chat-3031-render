'use strict';
const postsHandler = require('./posts-handler');
const util = require('./handler-util');

function route(req, res) {

  //本番環境下で、尚且つHTTP通信でアクセスされた場合は、NotFoundとする
  if(process.env.DATABASE_URL && req.headers['x-forwarded-proto'] === 'http') {
    util.handleNotFound(req, res);
  }

  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/posts/delete':
      postsHandler.handleDelete(req, res);
      break;
    case '/logout':
      util.handleLogout(req, res);
      break;
    case '/favicon.ico':
      util.handleFavicon(req, res);
      break;
    case '/changeTheme':
      postsHandler.changeTheme(req, res);
      break;
    default:
      util.handleNotFound(req, res);
      break;
  }
}

module.exports = {
  route
};

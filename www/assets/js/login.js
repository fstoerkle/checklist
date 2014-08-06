
module.exports.successful = function($e, username) {
  $e.login.userInfo.find('.username').text(username);

  $e.login.form.hide();
  $e.login.userInfo.show();
};
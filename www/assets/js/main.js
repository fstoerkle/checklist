"use strict";
// initialize Hoodie
var hoodie  = new Hoodie();

var ITEM = 'item';

var $e = {
  login: {
    form: $('.login'),
    userInfo: $('.user-info')
  },
  checklist: {
    newItem: $('.checklist-new-item'),
    list: $('.checklist-list')
  }
};

var loginSuccessful = function() {
  $e.login.userInfo.find('.username').text(hoodie.account.username);

  $e.login.form.hide();
  $e.login.userInfo.show();
};

if (hoodie.account.username !== undefined) {
  loginSuccessful();
}

hoodie.store.findAll(ITEM).done(function(checklistItems) {
  checklistItems.sort(function(a, b) {
    if (a && b) return a.createdAt > b.createdAt;
  }).forEach(function(item) {
    var buttonHtml = '<button class="do-delete-item" data-item-id="' + item.id + '">x</button>';
    $e.checklist.list.append('<li>' + item.title + buttonHtml + '</li>');
  });
});

$('#do-login').on('click', function() {
  hoodie.account.signIn(
    $e.login.form.find('.login-username').val(),
    $e.login.form.find('.login-password').val()
  ).done(function() {
    loginSuccessful();
  });

  return false;
});

$('#do-logout').on('click', function() {
  hoodie.account.signOut();
  $e.login.form.show();
  $e.login.userInfo.hide();
});

$('#do-add-item').on('click', function() {
  var value = $e.checklist.newItem.val();
  if (value.length > 0) {
    hoodie.store.add(ITEM, { title: value });

    $e.checklist.list.append('<li>' + value + '</li>');
    $e.checklist.newItem.val('');
  }
});

$('.do-delete-item').on('click', function() {
  var $this = $(this);

  hoodie.store.remove(ITEM, $this.data('itemId')).done(function() {
    $this.parent().remove();
  });
});
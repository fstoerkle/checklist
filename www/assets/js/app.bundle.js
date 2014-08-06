(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports.successful = function($e, username) {
  $e.login.userInfo.find('.username').text(username);

  $e.login.form.hide();
  $e.login.userInfo.show();
};
},{}],2:[function(require,module,exports){
"use strict";

// initialize Hoodie
var hoodie  = new Hoodie();

var login = require('./login');
var loginSuccessful = login.successful;


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

if (hoodie.account.username !== undefined) {
  loginSuccessful($e, hoodie.account.username);
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
    loginSuccessful($e, hoodie.account.username);
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
},{"./login":1}]},{},[2]);

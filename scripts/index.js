/* global githubApi, $ */
'use strict';
$(document).ready(function(){
  githubApi.render();
  githubApi.bindEventListeners();
});
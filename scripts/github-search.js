/* global $, store */
'use strict';
// eslint-disable-next-line no-unused-vars
const githubApi = (function(){
  function render (){
    $('#root').html(generateUserForm);
  }

  function generateUserForm (){
    return `
    <form class="search-form">  
            <label for="user-search">Search Github User: </label>
            <input type="text" name="user-search" id="gitHubUser-search" placeholder="Enter github User Search">
            <input type="submit" name="submit" value="Submit">
            <input type="button" name="clear" value="clear" class="clear-btn">
    </form> `;
  }
  function fetch(username){
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(resJ => displaySearchResults(resJ));
  }

  function handleUserSearch(){
    $('#root').on('submit', 'form', function (e){
      e.preventDefault();
      const user = $(this).closest('form').find('input#gitHubUser-search').val();
      $(this).closest('form').find('input#gitHubUser-search').val('');
      fetch(user);
    });
  }
  
  function handleClear(){
    $('#root').on('click', 'form', '.clear-btn', function (){
      $(this).closest('form').find('input#gitHubUser-search').val('');
    } );
  }
  function displaySearchResults(responseJson) {
    const results = []; 
    for (let i = 0; i < responseJson.length; i++) {
      results.push(`
          <p><a href='${responseJson[i].html_url}'>${responseJson[i].name}</a></p><hr>
        `);
    }
    $('#root').html(results.join(''));
  }

  function bindEventListeners(){
    handleUserSearch();
    handleClear();
  }
  return {
    render,
    bindEventListeners
  };
}());
const store = (function(){
  function addItems(items){
    this.items.push(items);
    console.log(this.items);
  }
  return {
    items: [],
    addItems
  }
}());
/**********************************************************

Set game, script written on Dec 26th 2010

***********************************************************/


/****************************************************
  
  uncheck all checkboxes,
  used in initGame so boxes are clear when page reloads
  also called after a 3 card selection fails/succeeds 
  to be a set
  
  ****************************************************/

function uncheckAll(){
	var checkBoxes = document.getElementsByTagName("input");
	var length = checkBoxes.length;
	var i = 0;
	var count = 0;
	for(i=0; i<length; i++){
	  checkBoxes[i].checked = false;
	}
  }

  /****************************************************
  
  return total number of checked boxes,
  used to check if we've selected 3 cards yet
  
  ****************************************************/
  
  function countChecked(){
	var checkBoxes = document.getElementsByTagName("input");
	var length = checkBoxes.length;
	var i = 0;
	var count = 0;
	for(i=0; i<length; i++){
	  if(checkBoxes[i].checked == true){
		count++;
	  }
	}
	return count;
  }
  
  /****************************************************
  
  is passed an id which corresponds to one of the 
  twelve table cells: 0 through 11
  returns the card number in that cell
  returns a card number using the image file in the cell
    
  ****************************************************/
  
  function getCardNumberById(id){
	var img = document.getElementById(id).getElementsByTagName("img");
	var cardNum = -1;
	
	src = img[0].getAttribute("src");
	
	cardNum = getCardNumberByImage(src);
	return cardNum;
  }
  
  
  /****************************************************
  
  return a 3 element array containing the card numbers
  corresponding to the 3 checked boxes
  called by clicked() if 3 boxes have been checked
  ****************************************************/
 
  function getSelectedCardNumbers(){
	var checkBoxes = document.getElementsByTagName("input");
	var length = checkBoxes.length;
	var i = 0;
	var cards = [3];
	var count = 0;
	for(i=0; i<length && count < 3; i++){
	  
	  if(checkBoxes[i].checked == true){
		var id = checkBoxes[i].parentNode.getAttribute("id");
		cards[count] = getCardNumberById(id);
		count++;
	  }
	}
	return cards;
  }
  
  /*******************************************************
  
  Get FoundRow card numbers by Image source
  input a filename, extract the card number
    really ugly way to do this
  ********************************************************/

  function getCardNumberByImage(src){
	
	var start = src.lastIndexOf('/')+1;
	var end = src.lastIndexOf('.');
	result = src.substring(start,end);
    return result;
	
	
  }
  

  /*******************************************************
  
  Get FoundRow card numbers
  puts the found sets into an 2d array 
  
  ********************************************************/
  
  function getFoundCardNumbers(){
    var foundRows = document.getElementById("found").getElementsByTagName("tr");
	
	var numRows = foundRows.length;
	var i=0;
	
	var result = new Array(numRows);
	
	for(i=0; i<numRows; i++){
	  var img = foundRows[i].getElementsByTagName("img");
	  
	  var j=0;
	  result[i] = new Array(3);
	  for(j = 0; j < 3; j++){
	    var src = img[j].getAttribute("src");
		result[i][j] = getCardNumberByImage(src);
	  }
      
	}
    return result;
  }
  
  function numSetsFound(){
    return document.getElementById("found").getElementsByTagName("tr").length;
  }


  /*******************************************************
  
  pass the array of 3 card numbers selected
  get the found sets
  compare the selected set to the found sets, 
  return 0 if old set, 1 if new
  
  ********************************************************/
  function setIsNew(c){
    
    var result = 1;
	
	if (numSetsFound() == 0 ){
	  result = 1;
	}
	else{
	  var foundRows = getFoundCardNumbers();
	  var numRows = foundRows.length;
	  var i=0;
	  
	  for(i=0;i<numRows && result == 1;i++){
	    //alert(foundRows[i][0]+","+foundRows[i][1]+","+foundRows[i][2]+ "["+c[0]+","+c[1]+","+c[2]+"]");
	    if( (foundRows[i][0] == c[0]) && (foundRows[i][1] == c[1]) && (foundRows[i][2]==c[2]) ){
		  result = 0;
		}
	  }
	  
	}
    return result;
  }
  
  /****************************************************
  
  Check card qualities
  
  ****************************************************/
  
  function checkColor(c){
	var sum = 0;
    sum += Math.floor((c[0]%81)/27);
	sum += Math.floor((c[1]%81)/27);
	sum += Math.floor((c[2]%81)/27);
	if(sum%3==0)	    
	  return 1;
	else
	  return 0;
  }
  
  function checkPattern(c){
	var sum = 0;
    sum += Math.floor((c[0]%27)/9);
	sum += Math.floor((c[1]%27)/9);
	sum += Math.floor((c[2]%27)/9);
	if(sum%3==0)	    
	  return 1;
	else
	  return 0;
  }

  function checkShape(c){
	var sum = 0;
    sum += Math.floor((c[0]%9)/3);
	sum += Math.floor((c[1]%9)/3);
	sum += Math.floor((c[2]%9)/3);
	if(sum%3==0)	    
	  return 1;
	else
	  return 0;
  }
  
  
  function checkCount(c){
	var sum = 0;
    sum += Math.floor((c[0]%3)/1);
	sum += Math.floor((c[1]%3)/1);
	sum += Math.floor((c[2]%3)/1);
	if(sum%3==0)	    
	  return 1;
	else
	  return 0;
  }
  
  
  /****************************************************
  
  Get selected cards
  
  ****************************************************/
  /*
  function getFoundSetCells(){
	var checkBoxes = document.getElementsByTagName("input");
	var length = checkBoxes.length;
	var i = 0;
	var cards = [3];
	var count = 0;
	for(i=0; i<length && count < 3; i++){
	  if(checkBoxes[i].checked == true){
		var id = checkBoxes[i].parentNode.getAttribute("id");
		cards[count] = getCardNumberById(id);
		count++;
	  }
	}
	return cards;
  }*/
  
    
  /****************************************************
  
  Main function called each time a card is clicked
  
  ****************************************************/
  
  
  function clicked(id){

	if(countChecked() < 3){
	  return 0;
	}
	else if(countChecked() == 3){
	
	  var c = getSelectedCardNumbers();
	
	  if(setIsNew(c) == 0){
	    alert("already found that one");
	  }
	  else{
	    var color = checkColor(c);
	    var pattern = checkPattern(c);
	    var shape = checkShape(c);
	    var count_ = checkCount(c);
	  
	    if(color == 1 && pattern ==1 && shape==1 && count_==1 ){
		  insertRow(c);
		  //todo: remove cards from table, put 3 new ones in
	    }
	    else{
		  alert("sorry, not a set");
	    }
	  }
		
	  uncheckAll();
	  
	  
	}
  }
  
      
  /****************************************************
  
  Inserts row into "found" sets table
  
  ****************************************************/
  
  
  function insertRow(c){
    var tr = document.createElement('tr');
    
    for(i=0;i<3;i++){
      img = document.createElement('img');
      img.setAttribute("src",'images/'+c[i]+'.jpg')
      
	  var td = document.createElement('td');
	  td.appendChild(img);
	  tr.appendChild(td);
    }
    
    document.getElementById("found").appendChild(tr);
  }
  
  /****************************************************
  
  get a random number from 0 to 80
  corresponding to the 81 cards in the deck
  
  ****************************************************/  

  function randomCard(){
	var r=Math.floor(Math.random()*81)
	return r;
  }
  
  
  
  /****************************************************
  
  Initialization
  
  ****************************************************/
  
  function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
  
  
  function initGame(){
	uncheckAll();
	var start_cards = initStartingCards();
	initImages(start_cards);
  }
  
  
  function initStartingCards(){
	  var cards = [81];
	  for(i=0; i<81; i++){
		  cards[i]=i;
	  }
	  cards = shuffle(cards);
	  return cards.slice(0,12);
  }
 
  
  function initImages(cards){
	var labels = document.getElementsByTagName("label");
	var i = 0;
	for(i=0; i < labels.length; i++){
	  var img_node = labels[i].childNodes;
	  img_node[0].setAttribute("src",'images/'+cards[i]+'.jpg')
	}
  }   
  
  
   
function random_int(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}
function update_score(){
  $('#score .red-team .score').text($('#score .red-team .total').text()-$('#grid .red-team').length);
  $('#score .blue-team .score').text($('#score .blue-team .total').text()-$('#grid .blue-team').length);
}

var n;	
	
var temp = [];
for(var i=0;i<25;i++){
  do{
	var r = random_int(0,words.length-1);
  }while(temp.indexOf(r) != -1);
  temp.push(r);
}

	var count = 0;
for(var row=0;row<5;row++){
  var tr = $('<tr>');
  for(var col=0;col<5 && count<25;col++){
	n = random_int(0,words.length-1);
	
	var td = $('<td class="word">').append(words[temp[count]]);
	tr.append(td);
	count++;
  }
  $('#grid').append(tr);
}


var first = confirm('red first = OK, blue first = CANCEL');
$('#score .red-team .total,.blue-team .total').text('8');

if(first){
  $('#score .red-team .total').text('9');
}
else{
  $('#score .blue-team .total').text('9');
}
update_score();




$('.word').on('click',function(){
	if($(this).hasClass('red-team')){
	  $(this).removeClass('red-team').addClass('blue-team');
	}
	else if($(this).hasClass('blue-team')){
	  $(this).removeClass('blue-team').addClass('bystander');
	}
	else if($(this).hasClass('bystander')){
	  $(this).removeClass('bystander').addClass('assassin');
	}
	else if($(this).hasClass('assassin')){
	  $(this).removeClass('assassin');
	}
	else{
	  $(this).addClass('red-team');
	}
	update_score();
});

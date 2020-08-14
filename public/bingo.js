var phrases = [
  'you follow me?',
  'Dali Lama',
  'Mother Teresa',
  'Nelson Mandela',
  'Mahatma Gandi',
  'Walt Disney',
  'MLK',
  'Steve Jobs',
  'money',
  'I drive a Jaguar',
  '2020 Plan',
  'prison',
  'fair game?',
  'dating advice',
  'my mentor',
  'my ranch in Colorado',
  'true story',
  'The Media',
  'the news',
  'write this down',
  'biblical reference',
  'iPhones',
  'Lyceum Park',
  'Opiod Crisis',
  'vaccines',
  'campus parking',
  'movies',
  'rumors',
  '2040 Plan',
  'COVID-19',
  'arrogant MDs',
  'cultural norms',
];

var isUsed = [];
var markReference = [];

var cell = document.getElementsByClassName("cell");
var header = document.getElementById("header");
var startPrompt = document.getElementById("start-prompt");
var startButton = document.getElementById("start");

startButton.addEventListener("click", function newGame(){

  startPrompt.style.display = "none";
  reset();

  for(var i = 0; i < 25; ++i){

    markReference[i] = 0;

    cell[i].id = i;

    cell[i].addEventListener("click", mark);

  }

});

function mark(){

      var cellnumber = Number(this.id);
      var cellmark = this.getElementsByTagName('div');
      var celltext = this.getElementsByTagName('h1');

      var isMarked = markReference[cellnumber];

      switch(isMarked){

        case 0:
          cellmark[0].style.backgroundColor = "var(--highlight-color)";
          cellmark[0].style.borderRadius = "50%";
          markReference[cellnumber] = 1;

          var win = [[0,5,10,15,20],
                 [1,6,11,16,21],
                 [2,7,12,17,22],
                 [3,8,13,18,23],
                 [4,9,14,19,24]];

          var column;
          var row;

          for(var i = 0; i < 5; ++i){

            var locate = win[i].indexOf(cellnumber);

            if(locate !== -1){
              column = locate;
              row = i;
            }
          }



          var count = 0;
          var winType = "";
          var winCombo = [];

          for(var i = 0; i < 5; ++i){
            winType = "a row";
            var test = win[row][i];
            if(markReference[test] === 1){
              winCombo.push(test);
              count += 1;
            }
          }

          if(count !== 5){
            count = 0;
            winType = "a column";
            winCombo = [];
            for(var i = 0; i < 5; ++i){
              var test = win[i][column];
              if(markReference[test] === 1){
                winCombo.push(test);
                count += 1;
              }
            }
          }

          if(count !== 5){
            count = 0;
            winType = "a diagonal";
            winCombo = [];
            for(var i = 0; i < 5; ++i){
              var test = win[i][i];
              if(markReference[test] === 1){
                winCombo.push(test);
                count += 1;
              }
            }
          }

          if(count !== 5){
            count = 0;
            winCombo = [];
            for(var i = 0; i < 5; ++i){
              var test = win[i][4 - i];
              if(markReference[test] === 1){
                winCombo.push(test);
                count += 1;
              }
            }
          }

          if(count !== 5){
            count = 1;
            winCombo = [];
            winType = "four corners"
            for(var i = 0; i < 4; ++i){
              var corner = [[0,0],[0,4],[4,0],[4,4]];
              var test = win[corner[i][0]][corner[i][1]];
              if(markReference[test] === 1){
                winCombo.push(test);
                count += 1;
              }
            }
          }

          if(count === 5){
            var winComboText = [];
            for(var i = 0; i < winCombo.length; ++i){
              winComboText.push(cell[winCombo[i]].getElementsByTagName('h1')[0].innerHTML);
            }
            if(winComboText.length === 4){ winComboText.push("<!--Empty-->")}

            var title = startPrompt.getElementsByTagName("h1")[0];
            var details = startPrompt.getElementsByTagName("h2")[0];
            title.innerHTML = "BINGO!";
            title.style.fontSize = "5vmax";
            details.innerHTML = "You've won with " + winType + "!<br><br>" +
                  winComboText[0] + "<br>" +
                  winComboText[1] + "<br>" +
                  winComboText[2] + "<br>" +
                  winComboText[3] + "<br>" +
                  winComboText[4];
            startPrompt.getElementsByTagName("button")[0].innerHTML = "New Game";
            startPrompt.style.display = "block";
            return;
          }

          break;

        case 1:
          cellmark[0].style.backgroundColor = "transparent";
          cellmark[0].style.borderRadius = "0";
          markReference[cellnumber] = 0;
          break;
      }
    cell[cellnumber].addEventListener("click", mark);
  }

function reset(){
  isUsed = [];
  markReference = [];

  for(var i = 0; i < 25; ++i){
    var cellmark = cell[i].getElementsByTagName('div');
    var celltext = cell[i].getElementsByTagName("h1");
    var random = unique();

    cellmark[0].style.backgroundColor = "transparent";
    cellmark[0].style.borderRadius = "0";

    switch(i){
      case 12:
        celltext[0].innerHTML = "Free Space";
        break;

      default:
        celltext[0].innerHTML = phrases[random];
        break;
    }
  }
}


function unique(){

  var allPhrases = phrases.length;
  var allUsed = isUsed.length;
  var isUnique = false;

  while(isUnique === false){
    var random = Math.floor(Math.random()*allPhrases);
    var uniqueCount = 0;

    for(var j = 0; j < allUsed; ++j){
      if(random !== isUsed[j]){ uniqueCount += 1; }
    }

    if(uniqueCount === allUsed){ isUnique = true; }
  }

  isUsed.push(random);
  return random;
}

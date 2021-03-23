let $start = document.getElementById('start');
let $game = document.getElementById('game');
let $time = document.getElementById('time');
let $timeHeader = document.getElementById('time-header');
let $resultHeader = document.getElementById('result-header');
let $resultGame = document.getElementById('result');
let $gameTime = document.getElementById('game-time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handelBoxClick);  // Click item
$gameTime.addEventListener('input', setGameTime);

function startGame() {
    score = 0;
    isGameStarted = true;

    hide($start);
    hide($resultHeader);
    show($timeHeader);
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');
    $game.style.backgroundColor = '#fff';

    let interval = setInterval(function() {
        let time = parseFloat($time.textContent);
        
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function handelBoxClick(event) {
    //  If isGameStared = false, we do not click box
    if(!isGameStarted) {
        return;
    }

    // target.dataset - Shows our attributes
    // Shows 'data-box' in an object without 'data', only box
    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

function renderBox() {
    //  Deleted old box
    $game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(30, 100);
    // Got info about size object
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.position = 'absolute';
    box.style.height = box.style.width = boxSize + 'px';
    box.style.backgroundColor = getColorRandom();
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
// Created something element to understand whether exists the box-element
    box.setAttribute('data-box', 'true');  // data-nameAttribute - write(data) required!

// box start after loaded $game
    $game.insertAdjacentElement('afterbegin', box);
}

function show($element) {
    return $element.classList.remove('hide');
}

function hide($element) {
    return $element.classList.add('hide');
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getColorRandom() {
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let newArr = ['#'];
    
    for(let i = 0; i < 3; i++) {
        newArr.push(arr[Math.floor(Math.random() * arr.length)])
    }
    return newArr.join('');
}

function setGameScore() {
    $resultGame.textContent = score.toString();
}

function setGameTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
}

function endGame() {
    isGameStarted = false;
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc'
    $gameTime.removeAttribute('disabled');
    
    hide($timeHeader);
    show($start);
    show($resultHeader);
    setGameScore();
}

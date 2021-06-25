/*
* 串接(chaining)是一种快捷方式，可避免使用多个步骤来访问对象(和数组)的属性和方法。使用串接可利用句点运算符将对象引用连接起来，从而将多条语句合而为一，并避免使用临时变量。
* 迭代器do while循环和while工作原理几乎相同，只是先执行循环体中的语句，再检查循环条件。
* onclick 点击事件(函数) click 点击(会触发点击事件)
* 质量保证(QA)是代码开发过程的重要组成部分。它不仅要求测试输入有效时的情形，还要求测试输入无效时的情情形
* */
var model = {
    boardSize: 7,//游戏板网格的大小
    numShips: 3,//游戏包含的战舰数
    shipLength: 3,//每艘战舰占据多少个单元格
    shipsSunk: 0,//有多少艘战舰已被击沉
    ships: [
        {locations: ["0", "0", "0"], hits: ["", "", ""]},
        {locations: ["0", "0", "0"], hits: ["", "", ""]},
        {locations: ["0", "0", "0"], hits: ["", "", ""]}
    ],//战舰所处的位置以及被击中的部位
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];//获取战舰
            /*var locations = ship.locations;//获取战舰的位置(数组locations)
            var index = locations.indexOf(guess);//获取guess在数组中的索引*/

            var index = ship.locations.indexOf(guess);//使用串接简化引用
            if (ship.hits[index] === "hit") {
                view.displayMessage("Oops, you already hit that location!");
                return true;
            } else if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            //判断那个战舰单元格被击中
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateShipLocations: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        if (direction === 1) {
            //生成水平战舰的起始位置
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * this.boardSize - this.shipLength);
        } else {
            //生成垂直战舰的起始位置
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }
        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + (col));
            }
        }
        return newShipLocations;
    },
    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true
                }
            }
        }
        return false;
    }
};

var view = {
    // 这个方法将一个字符串作为参数，并在消息区域中显示它
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

var controller = {
    guesses: 0,
    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
};

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize ||
            column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
}


function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    e = e || window.event;
    if (e.keyCode === 13) {
        fireButton.click();//触发按钮的点击
        return false;
    }
}

window.onload = init;

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;//点击时触发事件handleFireButton
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;//回车时触发事件handleKeyPress

    model.generateShipLocations();
}

console.log(model.ships);
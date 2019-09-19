let btn = document.querySelector('.btn');
const howBowlRow = 4;
const howRow = 10;
let s = howBowlRow * howRow;
let m = howBowlRow * howRow;
let smalk = 0;
let tablecolor = ['red', 'yellow', 'green', 'white', 'blue', 'violet'];
let tableColorTemp = [];
let checkC = 0;
let checkColors = 0;
let changeWL = true;
btn.addEventListener('click', function () {
    if (changeWL) {

        if (checkRowBowls()) {
            checkBowls();
        }
    }
});

function addBowl() {
    for (let i = 0; i < howBowlRow; i++) {
        let bowl = document.createElement('div');
        bowl.classList.add('bowl');
        let id = "c" + i;
        bowl.setAttribute('id', id);
        let ms = Math.floor(Math.random() * 6);
        bowl.style.backgroundColor = "gray";
        tableColorTemp.push(tablecolor[ms]);
        let el = document.querySelector(".borderM");
        el.appendChild(bowl);
    }
    tableColorTemp.reverse();
    addClear();
    for (let j = 1; j < 60; j++) {
        if (j % 6 === 0) {
            addClear();
        } else {
            if (smalk < howBowlRow) {
                let bowl = document.createElement('div');
                bowl.classList.add('bowl');
                let id = "b" + s;
                bowl.setAttribute('id', id);
                bowl.addEventListener('click', function () {
                    bowl.style.backgroundColor = checkButton(id);
                });
                let el = document.querySelector(".borderM");
                el.appendChild(bowl);
                s--;
                smalk++;
            } else {
                for (let z = 0; z < howBowlRow; z++) {
                    let bowl = document.createElement('div');
                    bowl.classList.add('bowlM');
                    let id = "m" + m;
                    bowl.setAttribute('id', id);
                    let el = document.querySelector(".borderM");
                    el.appendChild(bowl);
                    m--;
                }
                smalk = 0;
            }

        }
    }
}

function addClear() {
    let cl = document.createElement('div');
    cl.classList.add('clear');
    let el = document.querySelector(".borderM");
    el.appendChild(cl);
}

function selectColor() {
    if (changeWL) {
        if (checkC === 5) {
            checkC = 0;
            return tablecolor[5];
        } else {
            checkC++;
            return tablecolor[checkC - 1];
        }
    }
}

function checkButton(id) {
    let ch1 = checkColors + 1;
    let ch2 = checkColors + 2;
    let ch3 = checkColors + 3;
    let ch4 = checkColors + 4;

    if (("b" + ch1 == id) || ("b" + ch2 == id) || ("b" + ch3 == id) || ("b" + ch4 == id)) {

        return selectColor();
    }
}

function checkRowBowls() {
    let bowlOk = true;
    for (let i = 0; i < howBowlRow; i++) {
        let colorClass = document.getElementById("b" + (checkColors + 1 + i)).style.backgroundColor;
        if (colorClass === "" || colorClass === null) {
            bowlOk = false;
        }
    }
    return bowlOk;
}

function checkBowls() {
    let tempR = [];
    let tempRan = tableColorTemp.slice();
    let tempColorRaw = [];
    for (let i = 0; i < howBowlRow; i++) {
        let colorClass = document.getElementById("b" + (checkColors + 1 + i)).style.backgroundColor;
        tempColorRaw[i] = colorClass;

    }
    for (let i = 0; i < howBowlRow; i++) {
        if (tempColorRaw[i] === tempRan[i]) {
            tempR.push('black');
            tempRan[i] = 'br';
            tempColorRaw[i] = "cos";
            console.log(tempColorRaw[i]);
            console.log(tempRan[i]);
        }
    }
    for (let i = 0; i < howBowlRow; i++) {
        for (let j = 0; j < howBowlRow; j++) {
            if (tempColorRaw[i] === tempRan[j]) {
                tempR.push('white');
                tempColorRaw[i] = "cc";
            }
        }
        for (let i = 0; i < tempR.length; i++) {

            document.getElementById("m" + (checkColors + 4 - i)).style.backgroundColor = tempR[i];
        }
    }
    isWin(tempR);
}

function isWin(tempR) {
    checkColors += howBowlRow;
    if ((tempR[0] == 'black') && (tempR[1] == 'black') && (tempR[2] == 'black') &&
        (tempR[3] == 'black')) {
        changeWL = false;
        openColor();
        btn.classList.remove('btn-info');
        btn.classList.add('btn-success');
        btn.innerText = "WINNER!!!    New game? ";
        btn.addEventListener('click', function () {
            refreshPage();
        });
    } else if (checkColors == (howBowlRow * howRow)) {
        changeWL = false;
        openColor();
        btn.classList.remove('btn-info');
        btn.classList.add('btn-danger');
        btn.innerText = "LOST!!!    Tray again";
        btn.addEventListener('click', function () {
            refreshPage();
        });
    }
}

function refreshPage() {
    window.location.reload();
}

function openColor() {
    for (let i = 0; i < howBowlRow; i++) {
        let id = "c" + (3 - i);
        document.getElementById(id).style.backgroundColor = tableColorTemp[i];
    }
}
addBowl();
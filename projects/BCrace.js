function preload() {
    data = loadTable("barChart.csv", "csv", "header");
}

let l1 = 40;
let l2 = 35;
let l3 = 30;
let l4 = 25;
let l5 = 20;
let t = 0;
let x = 0;
let play = true;

function setup() {
    createCanvas(620, 500);
}

function nlargest(arr, n) {
    var top = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arr = arr.sort(function(a, b) {
        return a - b
    });
    for (var i = 0; i < n; i++) {
        top[i] = arr[arr.length - i - 1];
    }
    return top;
}



function colValsMinMax(tab, colName) {
    let vals = data.getColumn(colName);
    let obj = {
        values: vals,
        min: min(vals),
        max: max(vals),
    }
    return obj;
}

function draw() {
    background(255);
    brackets = data.getColumn('Bracket');

    r1V = colValsMinMax(data, 'r64')
    r1V.values = r1V.values.map(Number);
    r2V = colValsMinMax(data, 'r32')
    r2V.values = r2V.values.map(Number);
    r3V = colValsMinMax(data, 'r16')
    r3V.values = r3V.values.map(Number);
    r4V = colValsMinMax(data, 'r8')
    r4V.values = r4V.values.map(Number);
    r5V = colValsMinMax(data, 'r4')
    r5V.values = r5V.values.map(Number);
    rFV = colValsMinMax(data, 'finals')
    rFV.values = rFV.values.map(Number);

    r1Vsorted = nlargest(r1V.values, 11)
    r2Vsorted = nlargest(r2V.values, 11)
    r3Vsorted = nlargest(r3V.values, 11)
    r4Vsorted = nlargest(r4V.values, 11)
    r5Vsorted = nlargest(r5V.values, 11)
    rFVsorted = nlargest(rFV.values, 11)

    r1l = ['4','6','Top Bracket Overall','12','21','17','24','5','20','25', "People's Bracket"]
    r2l = ['4','Top Bracket Overall','6','21','24','12','17','5','20', "People's Bracket",'25']
    r3l = ['Top Bracket Overall','4','6','21','24','17','12','20', "People's Bracket",'5','25']
    r4l = ['Top Bracket Overall','4','21','17','6','24','12','20', "People's Bracket",'5','25']
    r5l = ['Top Bracket Overall','4','21','17','6','24','20','12', "People's Bracket",'5','25']


    line(60, 55, 60, 430);
    line(55, 60, 555, 60);

    text('Number of Correct Picks', 360, 35)

    for (var j = 0; j<10; j++){
        text(5 + 5*j, 111+50*j, 52)
        line(105+50*j, 55, 105+50*j, 430)
    }

    textSize(11);
    textAlign(RIGHT);

    switch(x){
        case 0:
            for (var i = 0; i<11; i++){
                fill('lightblue')
                rect(60, 75 + 35 * i,(r1Vsorted[i])*10, 30);
                fill('black')
                text(r1l[i], ((r1Vsorted[i])*10)+55, 95 +35 * i);
                text('Round of 64', 540, 450)
            }
            break;
        case 1:
            for (i = 0; i<11; i++){
                fill('lightblue')
                rect(60, 75 + 35 * i,(r2Vsorted[i])*10, 30);
                fill('black')
                text(r2l[i], ((r2Vsorted[i])*10)+55, 95 +35 * i);
                text('Round of 32', 540, 450)
            }
            break;
        case 2:
            for (i = 0; i<11; i++){
                fill('lightblue')
                rect(60, 75 + 35 * i,(r3Vsorted[i])*10, 30)
                fill('black')
                text(r3l[i], ((r3Vsorted[i])*10)+55, 95 +35 * i)
                text('Sweet Sixteen', 540, 450)
            }
            break;
        case 3:
            for (i = 0; i<11; i++){
                fill('lightblue')
                rect(60, 75 + 35 * i,(r4Vsorted[i])*10, 30)
                fill('black')
                text(r4l[i], ((r4Vsorted[i])*10)+55, 95 +35 * i);
                text('Elite Eight', 540, 450);
            }
            break;
        case 4:
            for (i = 0; i<11; i++){
                fill('lightblue')
                rect(60, 75 + 35 * i,(r5Vsorted[i])*10, 30)
                fill('black')
                text(r5l[i], ((r5Vsorted[i])*10)+55, 95 +35 * i)
                text('Final Four', 540, 450)
            }
            break;
        case 5:
            for (i = 0; i<11; i++){
                fill('lightblue')
                rect(60, 75 + 35 * i,(rFVsorted[i])*10, 30)
                fill('black')
                text(r5l[i], ((rFVsorted[i])*10)+55, 95 +35 * i)
                text("Tournament's End", 540, 450)
            }
            break;

    }
    if (t%135 == 134){
        x++;
    }

    textSize(12);
    if (play){
        t++;
        text('stop', 260, 450);
    }
    else{
        text('start', 260, 450);
    }

    if (x == 6){
        t = 0;
        x = 0;
    }
}

function mouseClicked(){
    if (play){
        play = false;
    }
    else{
        play = true
    }
}
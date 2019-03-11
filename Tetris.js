var tetromino = [7];
var Width = 12;
var Height = 18;
var pField = [Width * Height];
var pix = 20;
var gameOver = false;

var counter = 0;
var Speed = 10;
var ForcedDown = false;
var arr = [];
var PieceCounter = 0;
var Score = 0;

var CurrentPiece;
var NextPiece;
var CurrentRotation = 0;
var CurrentX = Width / 2 - 2;
var CurrentY = 0;

var Lines = 0;

var push = true;

class box {
    constructor(x, y, arg) {
        this.x = x;
        this.y = y;
        this.arg = arg;
    }

    draw() {
        return rect(this.x * pix, this.y * pix, pix, pix);
    }
}

function keyPressed() {
    if (keyCode === 65) {
        if (DoesPieceFit(CurrentPiece, CurrentRotation, CurrentX - 1, CurrentY))
            CurrentX = CurrentX - 1;
    } else if (keyCode === 68) {
        if (DoesPieceFit(CurrentPiece, CurrentRotation, CurrentX + 1, CurrentY)) {
            CurrentX = CurrentX + 1;
        }
    } else if (keyCode === 83) {
        if (DoesPieceFit(CurrentPiece, CurrentRotation, CurrentX, CurrentY + 1)) {
            CurrentY = CurrentY + 1;
        }
    } else if (keyCode === 87) {
        if (DoesPieceFit(CurrentPiece, CurrentRotation + 1, CurrentX, CurrentY)) {
            CurrentRotation++;
        }
    } else if (keyCode === 32) {
        push = true;
        while (push)
            MoveDown();
    }


}

function Rotate(px, py, r, n) {
    r %= 4;
    if (n != 0 && n != 1 && n != 2 && n != 4 && n != 3) {

        if (r == 0) return py * 4 + px;

        if (r == 1) return 12 + py - (px * 4);

        if (r == 2) return 15 - (py * 4) - px;

        if (r == 3) return 3 - py + (px * 4);
    } else if (n == 4) {
        if (r == 0) return py * 3 + px;
        if (r == 1) return 6 + py - (px * 3);
        if (r == 2) return 8 - py * 3 - px;
        if (r == 3) return 2 - py + px * 3;
    } else {
        if (r == 0 || r == 2) return py * 4 + px;
        if (r == 1 || r == 3) return 12 + py - (px * 4);
    }
}

function DoesPieceFit(nTetromino, nRotation, nPosX, nPosY) {
    if (nTetromino == 4) {
        for (var px = 0; px < 3; px++) {
            for (var py = 0; py < 3; py++) {
                var pi = Rotate(px, py, nRotation, CurrentPiece);
                var fi = (nPosY + py) * Width + nPosX + px;
                if (nPosX + px >= 0 && nPosX + px < Width) {
                    if (nPosY + py >= 0 && nPosY + py < Height) {
                        if (tetromino[nTetromino][pi] == "X" && pField[fi].arg != 0)
                            return false;
                    }
                }
            }
        }
    } else {
        for (var px = 0; px < 4; px++) {
            for (var py = 0; py < 4; py++) {
                var pi = Rotate(px, py, nRotation, CurrentPiece);
                var fi = (nPosY + py) * Width + nPosX + px;
                if (nPosX + px >= 0 && nPosX + px < Width) {
                    if (nPosY + py >= 0 && nPosY + py < Height) {
                        if (tetromino[nTetromino][pi] == "X" && pField[fi].arg != 0)
                            return false;
                    }
                }
            }
        }
    }
    return true;
}

function DrawPiece(n, t) {
    if (t) {
        if (n != 4) {
            for (var px = 0; px < 4; px++) {
                for (var py = 0; py < 4; py++) {
                    if (tetromino[n][Rotate(px, py, CurrentRotation, n)] == "X") {
                        rect((CurrentX + px) * pix, (CurrentY + py) * pix, pix, pix);
                    }
                }
            }
        } else {
            for (var px = 0; px < 3; px++) {
                for (var py = 0; py < 3; py++) {
                    if (tetromino[n][Rotate(px, py, CurrentRotation, n)] == "X") {
                        rect((CurrentX + px) * pix, (CurrentY + py) * pix, pix, pix);
                    }
                }
            }
        }
    } else {
        if (n != 4) {
            for (var px = 0; px < 4; px++) {
                for (var py = 0; py < 4; py++) {
                    if (tetromino[n][Rotate(px, py, 0, n)] == "X") {
                        rect((Width + px) * pix, (1 + py) * pix, pix, pix);
                    }
                }
            }
        } else {
            for (var px = 0; px < 3; px++) {
                for (var py = 0; py < 3; py++) {
                    if (tetromino[n][Rotate(px, py, 0, n)] == "X") {
                        rect((Width + px) * pix, (1 + py) * pix, pix, pix);
                    }
                }
            }
        }
    }
}

function sleep(seconds) {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
}

function Color(n) {
    var c;
    if (n == 0) c = color(255, 171, 38);
    else if (n == 1) c = color(171, 21, 221);
    else if (n == 2) c = color(7, 239, 239);
    else if (n == 3) c = color(249, 34, 63);
    else if (n == 4) c = color(255, 234, 12);
    else if (n == 5) c = color(135, 255, 15);
    else if (n == 6) c = color(126, 7, 239);
    return c;
}

function Draw() {
    background(0, 0, 0);
    for (var x = 0; x < Width; x++) {
        for (var y = 0; y < Height; y++) {
            var arg = pField[y * Width + x].arg;

            if (arg == 0) {
                strokeWeight(1);
                fill(221, 253, 255);
                pField[y * Width + x].draw();
                strokeWeight(2);
            } else if (arg == 8) {
                fill(114, 3, 3);
                pField[y * Width + x].draw();
            } else if (arg == 11) {
                fill(200, 50, 50);
                pField[y * Width + x].draw();
            } else {
                fill(82, 215, 242);
                pField[y * Width + x].draw();
            }
        }
    }

    fill(Color(CurrentPiece));

    DrawPiece(CurrentPiece, true);

    fill(Color(NextPiece));

    DrawPiece(NextPiece, false);

    fill(255, 255, 255);
    text("Lines:", (Width + 1) * pix, (Height - 4) * pix);
    text(Lines, (Width + 1) * pix, (Height - 3) * pix);
    text("Score:", (Width + 1) * pix, (Height - 2) * pix);
    text(Score, (Width + 1) * pix, (Height - 1) * pix);
}

function MoveDown() {
    if (DoesPieceFit(CurrentPiece, CurrentRotation, CurrentX, CurrentY + 1)) {
        CurrentY++;
    } else {
        push = false;
        if (CurrentPiece != 4) {
            for (var px = 0; px < 4; px++) {
                for (var py = 0; py < 4; py++) {
                    if (tetromino[CurrentPiece][Rotate(px, py, CurrentRotation, CurrentPiece)] == "X") {
                        pField[(CurrentY + py) * Width + CurrentX + px] =
                            new box(CurrentX + px, CurrentY + py, 8);
                    }
                }
            }
        } else {
            for (var px = 0; px < 3; px++) {
                for (var py = 0; py < 3; py++) {
                    if (tetromino[CurrentPiece][Rotate(px, py, CurrentRotation, CurrentPiece)] == "X") {
                        pField[(CurrentY + py) * Width + CurrentX + px] =
                            new box(CurrentX + px, CurrentY + py, 8);
                    }
                }
            }
        }

        Score += 25;

        for (var py = 0; py < 4; py++) {
            if (CurrentY + py < Height - 1) {
                var Line = true;
                for (var px = 1; px < Width - 1; px++) {
                    if (CurrentY + py >= 0)
                        if (pField[(CurrentY + py) * Width + px].arg == 0)
                            Line = false;
                }
                if (Line) {
                    for (var px = 1; px < Width - 1; px++) {
                        if (CurrentY + py >= 0)
                            pField[(CurrentY + py) * Width + px].arg = 0;
                    }
                    arr.push(CurrentY + py);
                }
            }
        }
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                for (var px = 1; px < Width - 1; px++) {
                    for (var py = arr[i]; py > 0; py--) {
                        fill(0, 0, 255);
                        rect(px * pix, py * pix, pix, pix);

                    }
                }
            }
            sleep(0.5);
        }
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                for (var i = 0; i < arr.length; i++) {
                    for (var px = 1; px < Width - 1; px++) {
                        for (var py = arr[i]; py > 0; py--) {
                            pField[py * Width + px] = new box(px, pField[(py - 1) * Width + px].y + 1, pField[(py - 1) * Width + px].arg)
                        }
                        pField[px].arg = 0;
                    }
                }
                Score += pow(2, arr.length) * 100;
                Lines += arr.length;
            }
            arr = [];
        }
        CurrentX = Width / 2 - 2;
        CurrentY = 0;
        CurrentRotation = 0;
        CurrentPiece = NextPiece;
        if (CurrentPiece == 3 || CurrentPiece == 6 || CurrentPiece == 5)
            CurrentY = -1;
        if (DoesPieceFit(CurrentPiece, CurrentRotation, CurrentX, CurrentY) == false)
            gameOver = true;
        NextPiece = floor(random(7));

    }
}

function SpeedUP() {
    if (counter == Speed) {
        ForcedDown = true;
        counter = 0;
    } else counter++;

}

function setup() {
    frameRate(20);
    createCanvas((Width + 4) * pix, (Height * pix));
    CurrentPiece = floor(random(7));
    if (CurrentPiece == 3 || CurrentPiece == 6 || CurrentPiece == 5)
        CurrentY = -1;

    NextPiece = floor(random(7));

    tetromino[0] = ".X.." +
        ".X.." +
        ".X.." +
        ".X..";

    tetromino[1] = "..X." +
        ".XX." +
        ".X.." +
        "....";

    tetromino[2] = ".X.." +
        ".XX." +
        "..X." +
        "....";

    tetromino[3] = "...." +
        ".XX." +
        ".XX." +
        "....";

    tetromino[4] = "..." +
        "XXX" +
        ".X.";

    tetromino[5] = "...." +
        ".XX." +
        "..X." +
        "..X.";

    tetromino[6] = "...." +
        ".XX." +
        ".X.." +
        ".X..";
    strokeWeight(2);
    for (var x = 0; x < Width; x++) {
        for (var y = 0; y < Height; y++) {
            if (x == 0 || x == Width - 1 || y == Height - 1) {
                pField[y * Width + x] = new box(x, y, 9);
            } else pField[y * Width + x] = new box(x, y, 0);
        }
    }
}

function draw() {
    if (!gameOver) {
        SpeedUP();
        if (ForcedDown)
            MoveDown();
        ForcedDown = false;
        Draw();
    } else {
        alert("Game over, your score: " + Score);
        noLoop();
        return;
    }
}
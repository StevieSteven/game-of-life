export default class Board {
    // sizeX;
    // sizeY;
    //
    // fields;
    // props;

    constructor(props) {

        this.props = props;
        this.sizeX = props.sizeX ? props.sizeX : 8;
        this.sizeY = props.sizeY ? props.sizeY : 8;

        this.onesAlive = props.onesAlive ? props.onesAlive : true;
        if(props.fields) {
            this.fields = props.fields;
        } else {
            this.calculateBoard();
        }
    }

    setSize(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    changeValueOfField(posX, posY) {
        if (posX < this.sizeX && posY < this.sizeY)
            this.fields[posX][posY] = !this.fields[posX][posY]
    }

    calculateBoard() {
        this.fields = [];
        for (let i = 0; i < this.sizeX; i++) {
            this.fields[i] = [];
            for (let j = 0; j < this.sizeY; j++) {
                this.fields[i][j] = false;
            }
        }
    }


    getSizeX() {
        return this.sizeX;
    }

    getSizeY() {
        return this.sizeY;
    }

    getFields() {
        return this.fields;
    }

    getOnesAlive() {
        return this.onesAlive;
    }

    /**
     * todo getters for neighbors
     */

    getLeft(x, y) {
        if (x > 0) {
            x--
        } else {
            x = this.sizeX - 1;
        }
        return {x, y}
    }

    getRight(x, y) {
        if (x < this.sizeX - 1) {
            x++
        } else {
            x = 0;
        }
        return {x, y}
    }

    getBottom(x, y) {
        if (y < this.sizeY - 1) {
            y++
        } else {
            y = 0;
        }
        return {x, y}
    }

    getTop(x, y) {
        if (y > 0) {
            y--
        } else {
            y = this.sizeY - 1;
        }
        return {x, y}
    }

    getTopLeft(x, y) {
        let l = this.getLeft(x, y);
        return this.getTop(l.x, l.y);
    }

    getTopRight(x, y) {
        let r = this.getRight(x, y);
        return this.getTop(r.x, r.y);
    }

    getBottomLeft(x, y) {
        let l = this.getLeft(x, y);
        return this.getBottom(l.x, l.y);
    }

    getBottomRight(x, y) {
        let r = this.getRight(x, y);
        return this.getBottom(r.x, r.y);
    }

    countNeighborsAlive(x, y) {
        let t = this.getTop(x, y),
            tr = this.getTopRight(x, y),
            r = this.getRight(x, y),
            br = this.getBottomRight(x, y),
            b = this.getBottom(x, y),
            bl = this.getBottomLeft(x, y),
            l = this.getLeft(x, y),
            tl = this.getTopLeft(x, y);
        let neighbors = [t, tr, r, br, b, bl, l, tl];

        return neighbors.filter(({x, y}) => {
            return this.fields[x][y] === true;
        }).length;
    }

    getBinaryFieldString() {
        let string = '';
        this.fields.forEach((line, lineIndex) => {
            line.forEach((field, fieldIndex) => {
                if(field === true) {
                    string += `${lineIndex*this.sizeX+fieldIndex}-`;
                }
            })
        });

        return string.substr(0, string.length-1);
    }

    calculateNewValue(x, y) {
        let neighborsAlive = this.countNeighborsAlive(x, y);
        let alive = this.fields[x][y];

        if (alive) {
            //1) Jede lebende Zelle, die weniger als 2 lebende Nachbarzellen hat, stirbt
            //2) Jede lebende Zelle, die 2 oder 3 lebendige Nachbarzellen hat, lebt weiter
            //3) Jede lebende Zelle, die mehr als 3 lebende Nachbarzellen hat, stirbt
            if (neighborsAlive < 2 || neighborsAlive > 3) {
                return false;
            }

        } else {
            //4) Jede tote Zelle, die genau 3 lebende Nachbarzellen hat, wird lebendig
            if (neighborsAlive === 3) {
                return true;
            }
        }
        return this.fields[x][y];
    }

    calculateNewBoard() {
        let newBoard = [];
        let onesAlive = false;

        this.fields.forEach((line, x) => {
            newBoard[x] = [];
            line.forEach((item, y) => {
                newBoard[x][y] = this.calculateNewValue(x, y);
                onesAlive = onesAlive || newBoard[x][y];
            })
        });

        this.fields = newBoard;
        this.onesAlive = onesAlive;
    }

    clone() {
        return new Board({
            sizeX: this.sizeX,
            sizeY: this.sizeY,
            fields: this.fields,
            onesAlive: this.onesAlive
        })
    }

    static generateBoardFromParameter(pathName) {
        const getCoordinatesFromIndex = (index, sizeX) => {
            return {
                x: Math.floor(index/sizeX),
                y: (index % sizeX)
            }
        };

        let args = pathName.split(":");

        if(args.length !== 3)
            return;
        let sizeX = parseInt(args[0], 10);
        let sizeY = parseInt(args[1], 10);
        let aliveString = args[2];

        let board = new Board({
            sizeX,
            sizeY
        });

        let aliveStrings = aliveString.split("-");
        let error = false;
        aliveStrings.forEach(item => {
            let int = parseInt(item, 10);
            if(isNaN(int)) {
                error = true;
                return;
            }
            let pos = getCoordinatesFromIndex(int, sizeX);

            board.changeValueOfField(pos.x, pos.y)
        });

        return error ? null :board;


    }
}
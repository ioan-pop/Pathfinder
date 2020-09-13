import React, {Component} from 'react';
import styles from './Grid.module.css';
import _ from 'lodash';
import $ from 'jquery';

class grid extends Component {
    state = {
        showNumbers: false,
        searchAlgorithm: 'breadthFirst',
        grid: [],
        startSquare: null,
        endSquare: null,
        mouseDown: false
    };

    // Class variables
    searchStack = [];
    searchInterval = undefined;
    searchDirection = undefined;

    algorithmFunctions = {
        searchNextSquare: this.breadthFirstSearchNextSquare.bind(this)
    };

    componentDidMount() {
        for(let i = 0; i < this.props.rows; i++) {
            let row = [];

            for(let j = 0; j < this.props.columns; j++) {
                row.push({x: j, y: i});
            }

            this.setState(prevState => ({
                grid: [...prevState.grid, row]
            }));
        }

        $('#grid').mousedown(() => {
            this.setState({mouseDown: true});
        });

        $('#grid').mouseup(() => {
            this.setState({mouseDown: false});
        });
    }

    selectSquare(square) {
        let currentGrid = [...this.state.grid];

        if(!this.state.startSquare) {
            currentGrid[square.y][square.x].startSquare = true;
            currentGrid[square.y][square.x].searchedSquare = true;
            this.setState({startSquare: square});
        } else if (!this.state.endSquare) {
            currentGrid[square.y][square.x].endSquare = true;
            this.setState({endSquare: square});
        } else {
            currentGrid[square.y][square.x].wallSquare = true;
        }

        this.setState({grid: currentGrid});
    }

    getClassName(square) {
        let additionalStyles = '';

        if (square.startSquare) {
            additionalStyles = ' ' + styles.StartSquare;
        } else if (square.endSquare) {
            additionalStyles = ' ' + styles.EndSquare;
        } else if (square.wallSquare) {
            additionalStyles = ' ' + styles.WallSquare;
        } else if (square.pathSquare) {
            additionalStyles = ' ' + styles.PathSquare;
        } else if (square.searchedSquare) {
            additionalStyles = ' ' + styles.SearchedSquare;
        }

        return styles.Square + additionalStyles;
    }

    startSearch() {
        this.searchStack.push({x: this.state.startSquare.x, y: this.state.startSquare.y});
        
        this.searchInterval = setInterval(() => {
            this.algorithmFunctions.searchNextSquare();
        }, 10);
    }

    stopSearch() {
        clearInterval(this.searchInterval);
    }

    // Returns booleans of: end found, wall square, searched square, out of bounds bound
    searchSquare(x, y, searchedFrom) {
        if(this.state.endSquare.x === x && this.state.endSquare.y === y) {
            this.setState({endSquare: {...this.state.endSquare, searchedFrom}});
            return [true];
        } else if (this.state.grid[y][x].searchedSquare || this.state.grid[y][x].startSquare || this.state.grid[y][x].wallSquare) {
            if (this.state.grid[y][x].wallSquare) {
                return [false, true];
            } else if (this.state.grid[y][x].searchedSquare) {
                return [false, false, true];
            } else {
                return [false];
            }
        } else {
            let currentGrid = [...this.state.grid];
            
            currentGrid[y][x].searchedSquare = true;
            currentGrid[y][x].searchedFrom = searchedFrom;
            
            this.searchStack.push({x, y});

            this.setState({grid: currentGrid});
    
            return [false];
        }
    }

    breadthFirstCheckSquareAvailable(squareToCheck, currentSquare) {
        let checkNextIf = true;
        let endFound = false;

        if (!squareToCheck.searchedSquare && !squareToCheck.wallSquare) {
            checkNextIf = false;
            [endFound] = this.searchSquare(squareToCheck.x, squareToCheck.y, currentSquare);
        }

        return [checkNextIf, endFound];
    }

    breadthFirstSearchNextSquare() {
        let currentSquare = this.state.grid[this.searchStack[0].y][this.searchStack[0].x];
        let checkNextIf = true;
        let endFound = false;
        
        if (currentSquare.y > 0) {
            let topSquare = this.state.grid[currentSquare.y - 1][currentSquare.x];
            [checkNextIf, endFound] = this.breadthFirstCheckSquareAvailable(topSquare, currentSquare);
        }
        
        if (checkNextIf && (currentSquare.x < this.state.grid[0].length - 1)) {
            let rightSquare = this.state.grid[currentSquare.y][currentSquare.x + 1];
            [checkNextIf, endFound] = this.breadthFirstCheckSquareAvailable(rightSquare, currentSquare);
        }
        
        if (checkNextIf && (currentSquare.y < this.state.grid.length - 1)) {
            let bottomSquare = this.state.grid[currentSquare.y + 1][currentSquare.x];
            [checkNextIf, endFound] = this.breadthFirstCheckSquareAvailable(bottomSquare, currentSquare);
        }
        
        if (checkNextIf && (currentSquare.x > 0)) {
            let leftSquare = this.state.grid[currentSquare.y][currentSquare.x - 1];
            [checkNextIf, endFound] = this.breadthFirstCheckSquareAvailable(leftSquare, currentSquare);
        }
        
        if (checkNextIf) {
            this.searchStack.splice(0,1);
            endFound = false;
            this.algorithmFunctions.searchNextSquare();
        }

        if (endFound) {
            clearInterval(this.searchInterval);
            this.buildFastestPath();
        }
    }

    getAdjacentSquares(x, y) {
        let currentSquare = this.state.grid[y][x];

        let topSquare = undefined;
        let rightSquare = undefined;
        let bottomSquare = undefined;
        let leftSquare = undefined;

        let topSearchable = true;
        let rightSearchable = true;
        let bottomSearchable = true;
        let leftSearchable = true;

        if (currentSquare.y > 0) {
            topSquare = this.state.grid[y - 1][x];
            if (topSquare.wallSquare || topSquare.searchedSquare) {
                topSearchable = false;
            }
        } else {
            topSearchable = false;
        }
        if (currentSquare.x < this.state.grid[0].length - 1) {
            rightSquare = this.state.grid[y][x + 1];
            if (rightSquare.wallSquare || rightSquare.searchedSquare) {
                rightSearchable = false;
            }
        } else {
            rightSearchable = false;
        }
        if (currentSquare.y < this.state.grid.length - 1) {
            bottomSquare = this.state.grid[y + 1][x];
            if (bottomSquare.wallSquare || bottomSquare.searchedSquare) {
                bottomSearchable = false;
            }
        } else {
            bottomSearchable = false;
        }
        if (currentSquare.x > 0) {
            leftSquare = this.state.grid[y][x - 1];
            if (leftSquare.wallSquare || leftSquare.searchedSquare) {
                leftSearchable = false;
            }
        } else {
            leftSearchable = false;
        }

        return {
            topSquare, rightSquare, bottomSquare, leftSquare, topSearchable, rightSearchable, bottomSearchable, leftSearchable,
            noSearchableSquares: (!topSearchable && !rightSearchable && !bottomSearchable && !leftSearchable)
        };
    }

    depthFirstSearchNextSquare(pullFromBottomOfStack) {
        let currentSquare = pullFromBottomOfStack ? 
            this.state.grid[this.searchStack[0].y][this.searchStack[0].x] : 
            this.state.grid[this.searchStack[this.searchStack.length - 1].y][this.searchStack[this.searchStack.length - 1].x];

        let adjacentSquares = this.getAdjacentSquares(currentSquare.x, currentSquare.y);
        let endFound = false;
        let hitWallSquare = false;
        let hitSearchedSquare = false;

        
        if (adjacentSquares.noSearchableSquares) {
            if(this.searchStack[0].x === currentSquare.x && this.searchStack[0].y === currentSquare.y) {
                this.searchStack.splice(0,1);
            }
            this.searchDirection = undefined;
            this.depthFirstSearchNextSquare(true);
            return;
        }

        if (
            ((currentSquare.y <= 0) && (this.searchDirection === 'top')) || 
            ((currentSquare.x <= 0) && (this.searchDirection === 'left')) || 
            ((currentSquare.y >= this.state.grid.length - 1) && (this.searchDirection === 'bottom')) || 
            ((currentSquare.x >= this.state.grid[0].length - 1) && (this.searchDirection === 'right'))
        ) {
            this.searchDirection = undefined;
            this.depthFirstSearchNextSquare(true);
            return;
        }

        if(!this.searchDirection) {
            if(adjacentSquares.topSearchable) {
                this.searchDirection = 'top';
            } else if (adjacentSquares.rightSearchable) {
                this.searchDirection = 'right';
            } else if (adjacentSquares.bottomSearchable) {
                this.searchDirection = 'bottom';
            } else if (adjacentSquares.leftSearchable) {
                this.searchDirection = 'left';
            }
        }

        if (this.searchDirection === 'top') {
            [endFound, hitWallSquare, hitSearchedSquare] = this.searchSquare(currentSquare.x, currentSquare.y - 1, currentSquare);
        } else if (this.searchDirection === 'right') {
            [endFound, hitWallSquare, hitSearchedSquare] = this.searchSquare(currentSquare.x + 1, currentSquare.y, currentSquare);            
        } else if (this.searchDirection === 'bottom') {
            [endFound, hitWallSquare, hitSearchedSquare] = this.searchSquare(currentSquare.x, currentSquare.y + 1, currentSquare);            
        } else if (this.searchDirection === 'left') {
            [endFound, hitWallSquare, hitSearchedSquare] = this.searchSquare(currentSquare.x - 1, currentSquare.y, currentSquare);            
        }

        if(hitWallSquare || hitSearchedSquare) {
            this.searchDirection = undefined;
            this.depthFirstSearchNextSquare(true);
            return;
        }

        if (endFound) {
            clearInterval(this.searchInterval);
            this.buildFastestPath();
        }
    }

    buildFastestPath() {
        let path = [];
        let endPath = false;

        let searchedFrom = this.state.endSquare.searchedFrom;

        while(!endPath) {
            path.push(searchedFrom);
            if(searchedFrom.searchedFrom === undefined) {
                endPath = true;
            } else {
                searchedFrom = searchedFrom.searchedFrom;
            }
        }

        for(let i = 0; i < path.length; i++) {
            this.markSquareForPath(path[i].x, path[i].y);
        }
    }

    markSquareForPath(x, y) {
        let currentGrid = [...this.state.grid];
        
        currentGrid[y][x].pathSquare = true;

        this.setState({grid: currentGrid});
    }

    numbersToggleHandler(event) {
        this.setState({showNumbers: event.currentTarget.checked});
    }

    searchAlgorithmChange(event) {
        switch (_.camelCase(event.target.value)) {
            case 'breadthFirst':
                this.algorithmFunctions.searchNextSquare = this.breadthFirstSearchNextSquare.bind(this);
                break;
            case 'depthFirst':
                this.algorithmFunctions.searchNextSquare = this.depthFirstSearchNextSquare.bind(this);
                break;
            default:
                console.log('Error: No algorithm selected');
                break;
        };
    }

    render() {
        let grid = this.state.grid.map((row, index) => {
            return (
                <div key={index} className={styles.Row}>
                    {
                        row.map((column, index) => {
                            return (
                                <span 
                                    key={index} 
                                    className={this.getClassName(column)} 
                                    onClick={() => {this.selectSquare(column)}}
                                    onMouseEnter={() => this.state.mouseDown ? this.selectSquare(column) : null}
                                    style={{height: this.props.squareHeight + "px", width: this.props.squareWidth + "px"}}>
                                    {
                                        this.state.showNumbers ?
                                        <span
                                            className={styles.SquareNumbers}>
                                            {column.x}, {column.y}
                                        </span> :
                                        null
                                    }
                                </span>
                            );
                        })
                    }
                </div>
            );
        });

        return(
            <React.Fragment>
                <div className={styles.Menu}>
                    <div className={styles.InnerMenu}>
                        <div>
                            Numbers
                            <input type="checkbox" onChange={this.numbersToggleHandler.bind(this)}/>
                        </div>
                        <div>
                            <div>Algorithm</div>
                            <div>
                                <select onChange={this.searchAlgorithmChange.bind(this)}>
                                    <option>Breadth First</option>
                                    <option>Depth First</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button 
                                disabled={!this.state.startSquare || !this.state.endSquare} 
                                onClick={() => {this.startSearch()}}>
                                Start
                            </button>
                            <button onClick={() => {this.stopSearch()}}>
                                Stop
                            </button>
                        </div>
                    </div>
                </div>
                <div id="grid" className={styles.Grid}>
                    {grid}
                </div>
            </React.Fragment>
        );
    }
}

export default grid;
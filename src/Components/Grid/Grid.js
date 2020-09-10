import React, {Component} from 'react';
import styles from './Grid.module.css';
import _ from 'lodash';
import $ from 'jquery';

class grid extends Component {
    state = {
        searchAlgorithm: 'breadthFirst',
        grid: [],
        startSquare: null,
        endSquare: null,
        mouseDown: false
    };

    searchStack = [];
    searchInterval = undefined;

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

    searchSquare(x, y, searchedFrom) {
        if(this.state.endSquare.x === x && this.state.endSquare.y === y) {
            this.setState({endSquare: {...this.state.endSquare, searchedFrom}});
            return true;
        } else if (this.state.grid[y][x].searchedSquare || this.state.grid[y][x].startSquare || this.state.grid[y][x].wallSquare) {
            return false
        } else {
            let currentGrid = [...this.state.grid];
            
            currentGrid[y][x].searchedSquare = true;
            currentGrid[y][x].searchedFrom = searchedFrom;
            this.searchStack.push({x, y});

            this.setState({grid: currentGrid});
    
            return false;
        }
    }

    startSearch() {
        this.searchStack.push({x: this.state.startSquare.x, y: this.state.startSquare.y});
        
        this.searchInterval = setInterval(() => {
            this.searchNextSquare();
            this.searchStack.splice(0,1);
        }, 10);
    }

    breadthFirstSearchNextSquare(currentSquare) {
        let endFound = (currentSquare.y > 0 ? this.searchSquare(currentSquare.x, currentSquare.y - 1, currentSquare) : false) ||
            (currentSquare.x < this.state.grid[0].length - 1 ? this.searchSquare(currentSquare.x + 1, currentSquare.y, currentSquare) : false) ||
            (currentSquare.y < this.state.grid.length - 1 ? this.searchSquare(currentSquare.x, currentSquare.y + 1, currentSquare) : false) ||
            (currentSquare.x > 0 ? this.searchSquare(currentSquare.x - 1, currentSquare.y, currentSquare) : false);

        return endFound;
    }

    depthFirstSearchNextSquare() {

    }

    searchNextSquare() {
        let currentSquare = this.state.grid[this.searchStack[0].y][this.searchStack[0].x];
        let endFound = false;
        
        endFound = this.algorithmFunctions.searchNextSquare(currentSquare);

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
                                    {/* {column.x} {column.y} */}
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
                    <div style={{margin: "5px"}}>
                        <div>
                            <div>Algorithm</div>
                            <div>
                                <select onChange={this.searchAlgorithmChange}>
                                    <option>Breadth First</option>
                                    <option>Depth First</option>
                                </select>
                            </div>
                        </div>
                        <button 
                            disabled={!this.state.startSquare || !this.state.endSquare} 
                            onClick={() => {this.startSearch()}}
                            style={{marginTop: "20px"}}>
                            Start
                        </button>
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
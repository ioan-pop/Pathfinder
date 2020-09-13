import React from 'react';
import styles from './Square.module.css';

let getClassName = (square) => {
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
};

const square = (props) => (
    <span 
        onClick={props.clicked}
        onMouseEnter={props.mouseEnter}
        className={getClassName(props.column)} 
        style={{height: props.squareHeight + "px", width: props.squareWidth + "px"}}>
        {
            props.showNumbers ?
            <span
                className={styles.SquareNumbers}>
                {props.column.x}, {props.column.y}
            </span> :
            null
        }
    </span>
);

export default square;
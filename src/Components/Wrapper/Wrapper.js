import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import $ from 'jquery';
import styles from './Wrapper.module.css'

class wrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: !localStorage.getItem('skipInstructions'),
            calculatedCells: false
        }
    }

    componentDidMount() {
        this.calculateCells();

        $(window).resize(() => {
            this.setState({calculatedCells: false});
            this.calculateCells();
        });
    }

    calculateCells() {
        let rows = 0;
        let columns = 0;
        let wWidth = $(window).width();
        let wHeight = $(window).height();
        let ratio = wWidth/wHeight;

        if (wWidth > 2000) {
            columns = 40;
        } else if (wWidth > 1000) {
            columns = 25;
        } else {
            columns = 10;
        }

        rows = Math.floor(columns / ratio);

        this.setState({
            calculatedCells: true,
            rows,
            columns,
            squareWidth: wWidth / columns,
            squareHeight: (wHeight / rows)
        });
    }

    instructionsConfirmHandler() {
        if ($('#dontShowCheckbox').is(':checked')) {
            localStorage.setItem('skipInstructions', true);
        }

        this.setState({showModal: false});
    }

    render() {
        let modal = this.state.showModal ? (
            <div className={styles.InstructionsModalWrapper}>
                <div className={styles.InstructionsModal}>
                    <div style={{marginBottom: '15px', fontSize: '24px'}}>Instructions</div>
                    <div>1. Click anywhere on the grid to create a starting position</div>
                    <div>2. Click anywhere on the grid to create a ending position</div>
                    <div>3. Optionally click (or drag) any additional squares to create wall squares</div>
                    <div>4. Select algorith on the menu on the right</div>
                    <div>5. Click start to begin the search</div>
                    <div style={{marginTop: '15px', fontSize: '14px', color: '#333'}}>
                        <input type="checkbox" id="dontShowCheckbox"/>Don't show this again
                    </div>
                    <button style={{marginTop: '15px'}} onClick={this.instructionsConfirmHandler.bind(this)}>Okay</button>
                </div>
            </div>
        ) : null;

        return(
            <div>
                { modal }
                {
                    this.state.calculatedCells ?
                    (<Grid rows={this.state.rows} columns={this.state.columns} squareWidth={this.state.squareWidth} squareHeight={this.state.squareHeight}/>) :
                    <div>Calculating best size</div>
                }
            </div>
        );
    }
}

export default wrapper;

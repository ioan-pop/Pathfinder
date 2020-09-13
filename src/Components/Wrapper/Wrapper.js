import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import $ from 'jquery';

class wrapper extends Component {
    state = {
        calculatedCells: false
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

    render() {
        return(
            <div>
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

(this.webpackJsonppathfinder=this.webpackJsonppathfinder||[]).push([[0],{13:function(e,t,a){e.exports={InstructionsModalWrapper:"Wrapper_InstructionsModalWrapper__G6jgf",InstructionsModal:"Wrapper_InstructionsModal__3Hzzo"}},18:function(e,t,a){e.exports=a(27)},23:function(e,t,a){},24:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),i=a(16),n=a.n(i),c=(a(23),a(24),a(7)),h=a(8),u=a(12),l=a(11),o=a(1),d=a(14),S=a(6),m=a(9),q=a(5),g=a.n(q),v=a(3),b=a.n(v),p=function(e){var t="";return e.startSquare?t=" "+b.a.StartSquare:e.endSquare?t=" "+b.a.EndSquare:e.wallSquare?t=" "+b.a.WallSquare:e.pathSquare?t=" "+b.a.PathSquare:e.searchedSquare&&(t=" "+b.a.SearchedSquare),b.a.Square+t},f=function(e){return s.a.createElement("span",{onClick:e.clicked,onMouseEnter:e.mouseEnter,className:p(e.column),style:{height:e.squareHeight+"px",width:e.squareWidth+"px"}},e.showNumbers?s.a.createElement("span",{className:b.a.SquareNumbers},e.column.x,", ",e.column.y):null)},y=a(17),k=a.n(y),x=a(2),w=a.n(x),E=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(c.a)(this,a);for(var r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={showNumbers:!1,searchAlgorithm:"breadthFirst",grid:[],startSquare:null,endSquare:null,mouseDown:!1},e.searchStack=[],e.searchInterval=void 0,e.searchDirection=void 0,e.algorithmFunctions={searchNextSquare:e.breadthFirstSearchNextSquare.bind(Object(m.a)(e))},e}return Object(h.a)(a,[{key:"componentDidMount",value:function(){for(var e=this,t=function(t){for(var a=[],r=0;r<e.props.columns;r++)a.push({x:r,y:t});e.setState((function(e){return{grid:[].concat(Object(S.a)(e.grid),[a])}}))},a=0;a<this.props.rows;a++)t(a);w()("#grid").mousedown((function(){e.setState({mouseDown:!0})})),w()("#grid").mouseup((function(){e.setState({mouseDown:!1})}))}},{key:"selectSquare",value:function(e){var t=Object(S.a)(this.state.grid);this.state.startSquare?this.state.endSquare?t[e.y][e.x].wallSquare=!0:(t[e.y][e.x].endSquare=!0,this.setState({endSquare:e})):(t[e.y][e.x].startSquare=!0,t[e.y][e.x].searchedSquare=!0,this.setState({startSquare:e})),this.setState({grid:t})}},{key:"startSearch",value:function(){var e=this;this.searchStack.push({x:this.state.startSquare.x,y:this.state.startSquare.y}),this.searchInterval=setInterval((function(){e.algorithmFunctions.searchNextSquare()}),10)}},{key:"stopSearch",value:function(){clearInterval(this.searchInterval)}},{key:"searchSquare",value:function(e,t,a){if(this.state.endSquare.x===e&&this.state.endSquare.y===t)return this.setState({endSquare:Object(d.a)(Object(d.a)({},this.state.endSquare),{},{searchedFrom:a})}),[!0];if(this.state.grid[t][e].searchedSquare||this.state.grid[t][e].startSquare||this.state.grid[t][e].wallSquare)return this.state.grid[t][e].wallSquare?[!1,!0]:this.state.grid[t][e].searchedSquare?[!1,!1,!0]:[!1];var r=Object(S.a)(this.state.grid);return r[t][e].searchedSquare=!0,r[t][e].searchedFrom=a,this.searchStack.push({x:e,y:t}),this.setState({grid:r}),[!1]}},{key:"breadthFirstCheckSquareAvailable",value:function(e,t){var a=!0,r=!1;if(!e.searchedSquare&&!e.wallSquare){a=!1;var s=this.searchSquare(e.x,e.y,t);r=Object(o.a)(s,1)[0]}return[a,r]}},{key:"breadthFirstSearchNextSquare",value:function(){var e=this.state.grid[this.searchStack[0].y][this.searchStack[0].x],t=!0,a=!1;if(e.y>0){var r=this.state.grid[e.y-1][e.x],s=this.breadthFirstCheckSquareAvailable(r,e),i=Object(o.a)(s,2);t=i[0],a=i[1]}if(t&&e.x<this.state.grid[0].length-1){var n=this.state.grid[e.y][e.x+1],c=this.breadthFirstCheckSquareAvailable(n,e),h=Object(o.a)(c,2);t=h[0],a=h[1]}if(t&&e.y<this.state.grid.length-1){var u=this.state.grid[e.y+1][e.x],l=this.breadthFirstCheckSquareAvailable(u,e),d=Object(o.a)(l,2);t=d[0],a=d[1]}if(t&&e.x>0){var S=this.state.grid[e.y][e.x-1],m=this.breadthFirstCheckSquareAvailable(S,e),q=Object(o.a)(m,2);t=q[0],a=q[1]}t&&(this.searchStack.splice(0,1),a=!1,this.algorithmFunctions.searchNextSquare()),a&&(clearInterval(this.searchInterval),this.buildFastestPath())}},{key:"getAdjacentSquares",value:function(e,t){var a=this.state.grid[t][e],r=void 0,s=void 0,i=void 0,n=void 0,c=!0,h=!0,u=!0,l=!0;return a.y>0?((r=this.state.grid[t-1][e]).wallSquare||r.searchedSquare)&&(c=!1):c=!1,a.x<this.state.grid[0].length-1?((s=this.state.grid[t][e+1]).wallSquare||s.searchedSquare)&&(h=!1):h=!1,a.y<this.state.grid.length-1?((i=this.state.grid[t+1][e]).wallSquare||i.searchedSquare)&&(u=!1):u=!1,a.x>0?((n=this.state.grid[t][e-1]).wallSquare||n.searchedSquare)&&(l=!1):l=!1,{topSquare:r,rightSquare:s,bottomSquare:i,leftSquare:n,topSearchable:c,rightSearchable:h,bottomSearchable:u,leftSearchable:l,noSearchableSquares:!c&&!h&&!u&&!l}}},{key:"depthFirstSearchNextSquare",value:function(e){var t=e?this.state.grid[this.searchStack[0].y][this.searchStack[0].x]:this.state.grid[this.searchStack[this.searchStack.length-1].y][this.searchStack[this.searchStack.length-1].x],a=this.getAdjacentSquares(t.x,t.y),r=!1,s=!1,i=!1;if(a.noSearchableSquares)return this.searchStack[0].x===t.x&&this.searchStack[0].y===t.y&&this.searchStack.splice(0,1),this.searchDirection=void 0,void this.depthFirstSearchNextSquare(!0);if(t.y<=0&&"top"===this.searchDirection||t.x<=0&&"left"===this.searchDirection||t.y>=this.state.grid.length-1&&"bottom"===this.searchDirection||t.x>=this.state.grid[0].length-1&&"right"===this.searchDirection)return this.searchDirection=void 0,void this.depthFirstSearchNextSquare(!0);if(this.searchDirection||(a.topSearchable?this.searchDirection="top":a.rightSearchable?this.searchDirection="right":a.bottomSearchable?this.searchDirection="bottom":a.leftSearchable&&(this.searchDirection="left")),"top"===this.searchDirection){var n=this.searchSquare(t.x,t.y-1,t),c=Object(o.a)(n,3);r=c[0],s=c[1],i=c[2]}else if("right"===this.searchDirection){var h=this.searchSquare(t.x+1,t.y,t),u=Object(o.a)(h,3);r=u[0],s=u[1],i=u[2]}else if("bottom"===this.searchDirection){var l=this.searchSquare(t.x,t.y+1,t),d=Object(o.a)(l,3);r=d[0],s=d[1],i=d[2]}else if("left"===this.searchDirection){var S=this.searchSquare(t.x-1,t.y,t),m=Object(o.a)(S,3);r=m[0],s=m[1],i=m[2]}if(s||i)return this.searchDirection=void 0,void this.depthFirstSearchNextSquare(!0);r&&(clearInterval(this.searchInterval),this.buildFastestPath())}},{key:"buildFastestPath",value:function(){for(var e=[],t=!1,a=this.state.endSquare.searchedFrom;!t;)e.push(a),void 0===a.searchedFrom?t=!0:a=a.searchedFrom;for(var r=0;r<e.length;r++)this.markSquareForPath(e[r].x,e[r].y)}},{key:"markSquareForPath",value:function(e,t){var a=Object(S.a)(this.state.grid);a[t][e].pathSquare=!0,this.setState({grid:a})}},{key:"numbersToggleHandler",value:function(e){this.setState({showNumbers:e.currentTarget.checked})}},{key:"searchAlgorithmChange",value:function(e){switch(k.a.camelCase(e.target.value)){case"breadthFirst":this.algorithmFunctions.searchNextSquare=this.breadthFirstSearchNextSquare.bind(this);break;case"depthFirst":this.algorithmFunctions.searchNextSquare=this.depthFirstSearchNextSquare.bind(this);break;default:console.log("Error: No algorithm selected")}}},{key:"render",value:function(){var e=this,t=this.state.grid.map((function(t,a){return s.a.createElement("div",{key:a,className:g.a.Row},t.map((function(t,a){return s.a.createElement(f,{key:a,column:t,clicked:function(){e.selectSquare(t)},mouseEnter:function(){return e.state.mouseDown?e.selectSquare(t):null},squareHeight:e.props.squareHeight,squareWidth:e.props.squareWidth,showNumbers:e.state.showNumbers})})))}));return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:g.a.Menu},s.a.createElement("div",{className:g.a.InnerMenu},s.a.createElement("div",null,"Numbers",s.a.createElement("input",{type:"checkbox",onChange:this.numbersToggleHandler.bind(this)})),s.a.createElement("div",null,s.a.createElement("div",null,"Algorithm"),s.a.createElement("div",null,s.a.createElement("select",{onChange:this.searchAlgorithmChange.bind(this)},s.a.createElement("option",null,"Breadth First"),s.a.createElement("option",null,"Depth First")))),s.a.createElement("div",{style:{display:"inline-grid"}},s.a.createElement("button",{disabled:!this.state.startSquare||!this.state.endSquare,onClick:function(){e.startSearch()}},"Start"),s.a.createElement("button",{onClick:function(){e.stopSearch()}},"Stop")))),s.a.createElement("div",{id:"grid",className:g.a.Grid},t))}}]),a}(r.Component),_=a(13),F=a.n(_),N=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).state={showModal:!localStorage.getItem("skipInstructions"),calculatedCells:!1},r}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.calculateCells(),w()(window).resize((function(){e.setState({calculatedCells:!1}),e.calculateCells()}))}},{key:"calculateCells",value:function(){var e,t=0,a=w()(window).width(),r=w()(window).height(),s=a/r;t=a>2e3?40:a>1e3?25:10,e=Math.floor(t/s),this.setState({calculatedCells:!0,rows:e,columns:t,squareWidth:a/t,squareHeight:r/e})}},{key:"instructionsConfirmHandler",value:function(){w()("#dontShowCheckbox").is(":checked")&&localStorage.setItem("skipInstructions",!0),this.setState({showModal:!1})}},{key:"render",value:function(){var e=this.state.showModal?s.a.createElement("div",{className:F.a.InstructionsModalWrapper},s.a.createElement("div",{className:F.a.InstructionsModal},s.a.createElement("div",{style:{marginBottom:"15px",fontSize:"24px"}},"Instructions"),s.a.createElement("div",null,"1. Click anywhere on the grid to create a starting position"),s.a.createElement("div",null,"2. Click anywhere on the grid to create a ending position"),s.a.createElement("div",null,"3. Optionally click (or drag) any additional squares to create wall squares"),s.a.createElement("div",null,"4. Select algorith on the menu on the right"),s.a.createElement("div",null,"5. Click start to begin the search"),s.a.createElement("div",{style:{marginTop:"15px",fontSize:"14px",color:"#333"}},s.a.createElement("input",{type:"checkbox",id:"dontShowCheckbox"}),"Don't show this again"),s.a.createElement("button",{style:{marginTop:"15px"},onClick:this.instructionsConfirmHandler.bind(this)},"Okay"))):null;return s.a.createElement("div",null,e,this.state.calculatedCells?s.a.createElement(E,{rows:this.state.rows,columns:this.state.columns,squareWidth:this.state.squareWidth,squareHeight:this.state.squareHeight}):s.a.createElement("div",null,"Calculating best size"))}}]),a}(r.Component);var C=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(N,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},3:function(e,t,a){e.exports={Square:"Square_Square__3PWzo",SquareNumbers:"Square_SquareNumbers__3hlXO",StartSquare:"Square_StartSquare__2e4Ay",EndSquare:"Square_EndSquare__1v8y5",WallSquare:"Square_WallSquare__BT3Et",SearchedSquare:"Square_SearchedSquare__1lM8d",PathSquare:"Square_PathSquare__28Whz"}},5:function(e,t,a){e.exports={Menu:"Grid_Menu__17n1H",InnerMenu:"Grid_InnerMenu__2-G4s",Grid:"Grid_Grid__3T6sz",Row:"Grid_Row__1emuE"}}},[[18,1,2]]]);
//# sourceMappingURL=main.bb5a822d.chunk.js.map
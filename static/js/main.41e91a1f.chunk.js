(this.webpackJsonppathfinder=this.webpackJsonppathfinder||[]).push([[0],{1:function(e,t,a){e.exports={Menu:"Grid_Menu__17n1H",Grid:"Grid_Grid__3T6sz",Row:"Grid_Row__1emuE",Square:"Grid_Square__3p_Gc",StartSquare:"Grid_StartSquare__3uz-B",EndSquare:"Grid_EndSquare__3ek2-",WallSquare:"Grid_WallSquare__2iAa0",SearchedSquare:"Grid_SearchedSquare__1_OxM",PathSquare:"Grid_PathSquare__3t6mS"}},13:function(e,t,a){e.exports=a(22)},18:function(e,t,a){},19:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(11),i=a.n(n),u=(a(18),a(19),a(4)),c=a(5),h=a(8),l=a(7),o=a(9),d=a(3),S=a(6),q=a(1),m=a.n(q),v=a(12),g=a.n(v),f=a(2),p=a.n(f),y=function(e){Object(h.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(u.a)(this,a);for(var r=arguments.length,s=new Array(r),n=0;n<r;n++)s[n]=arguments[n];return(e=t.call.apply(t,[this].concat(s))).state={searchAlgorithm:"breadthFirst",grid:[],startSquare:null,endSquare:null,mouseDown:!1},e.searchStack=[],e.searchInterval=void 0,e.algorithmFunctions={searchNextSquare:e.breadthFirstSearchNextSquare.bind(Object(S.a)(e))},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){for(var e=this,t=function(t){for(var a=[],r=0;r<e.props.columns;r++)a.push({x:r,y:t});e.setState((function(e){return{grid:[].concat(Object(d.a)(e.grid),[a])}}))},a=0;a<this.props.rows;a++)t(a);p()("#grid").mousedown((function(){e.setState({mouseDown:!0})})),p()("#grid").mouseup((function(){e.setState({mouseDown:!1})}))}},{key:"selectSquare",value:function(e){var t=Object(d.a)(this.state.grid);this.state.startSquare?this.state.endSquare?t[e.y][e.x].wallSquare=!0:(t[e.y][e.x].endSquare=!0,this.setState({endSquare:e})):(t[e.y][e.x].startSquare=!0,this.setState({startSquare:e})),this.setState({grid:t})}},{key:"getClassName",value:function(e){var t="";return e.startSquare?t=" "+m.a.StartSquare:e.endSquare?t=" "+m.a.EndSquare:e.wallSquare?t=" "+m.a.WallSquare:e.pathSquare?t=" "+m.a.PathSquare:e.searchedSquare&&(t=" "+m.a.SearchedSquare),m.a.Square+t}},{key:"searchSquare",value:function(e,t,a){if(this.state.endSquare.x===e&&this.state.endSquare.y===t)return this.setState({endSquare:Object(o.a)(Object(o.a)({},this.state.endSquare),{},{searchedFrom:a})}),!0;if(this.state.grid[t][e].searchedSquare||this.state.grid[t][e].startSquare||this.state.grid[t][e].wallSquare)return!1;var r=Object(d.a)(this.state.grid);return r[t][e].searchedSquare=!0,r[t][e].searchedFrom=a,this.searchStack.push({x:e,y:t}),this.setState({grid:r}),!1}},{key:"startSearch",value:function(){var e=this;this.searchStack.push({x:this.state.startSquare.x,y:this.state.startSquare.y}),this.searchInterval=setInterval((function(){e.searchNextSquare(),e.searchStack.splice(0,1)}),10)}},{key:"breadthFirstSearchNextSquare",value:function(e){return e.y>0&&this.searchSquare(e.x,e.y-1,e)||e.x<this.state.grid[0].length-1&&this.searchSquare(e.x+1,e.y,e)||e.y<this.state.grid.length-1&&this.searchSquare(e.x,e.y+1,e)||e.x>0&&this.searchSquare(e.x-1,e.y,e)}},{key:"depthFirstSearchNextSquare",value:function(){}},{key:"searchNextSquare",value:function(){var e=this.state.grid[this.searchStack[0].y][this.searchStack[0].x];this.algorithmFunctions.searchNextSquare(e)&&(clearInterval(this.searchInterval),this.buildFastestPath())}},{key:"buildFastestPath",value:function(){for(var e=[],t=!1,a=this.state.endSquare.searchedFrom;!t;)e.push(a),void 0===a.searchedFrom?t=!0:a=a.searchedFrom;for(var r=0;r<e.length;r++)this.markSquareForPath(e[r].x,e[r].y)}},{key:"markSquareForPath",value:function(e,t){var a=Object(d.a)(this.state.grid);a[t][e].pathSquare=!0,this.setState({grid:a})}},{key:"searchAlgorithmChange",value:function(e){switch(g.a.camelCase(e.target.value)){case"breadthFirst":this.algorithmFunctions.searchNextSquare=this.breadthFirstSearchNextSquare.bind(this);break;case"depthFirst":this.algorithmFunctions.searchNextSquare=this.depthFirstSearchNextSquare.bind(this);break;default:console.log("Error: No algorithm selected")}}},{key:"render",value:function(){var e=this,t=this.state.grid.map((function(t,a){return s.a.createElement("div",{key:a,className:m.a.Row},t.map((function(t,a){return s.a.createElement("span",{key:a,className:e.getClassName(t),onClick:function(){e.selectSquare(t)},onMouseEnter:function(){return e.state.mouseDown?e.selectSquare(t):null},style:{height:e.props.squareHeight+"px",width:e.props.squareWidth+"px"}})})))}));return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:m.a.Menu},s.a.createElement("div",{style:{margin:"5px"}},s.a.createElement("div",null,s.a.createElement("div",null,"Algorithm"),s.a.createElement("div",null,s.a.createElement("select",{onChange:this.searchAlgorithmChange},s.a.createElement("option",null,"Breadth First"),s.a.createElement("option",null,"Depth First")))),s.a.createElement("button",{disabled:!this.state.startSquare||!this.state.endSquare,onClick:function(){e.startSearch()},style:{marginTop:"20px"}},"Start"))),s.a.createElement("div",{id:"grid",className:m.a.Grid},t))}}]),a}(r.Component),k=function(e){Object(h.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(u.a)(this,a);for(var r=arguments.length,s=new Array(r),n=0;n<r;n++)s[n]=arguments[n];return(e=t.call.apply(t,[this].concat(s))).state={calculatedCells:!1},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.calculateCells(),p()(window).resize((function(){e.setState({calculatedCells:!1}),e.calculateCells()}))}},{key:"calculateCells",value:function(){var e,t=0,a=p()(window).width(),r=p()(window).height(),s=a/r;t=a>2e3?40:a>1e3?30:10,e=Math.floor(t/s),this.setState({calculatedCells:!0,rows:e,columns:t,squareWidth:a/t,squareHeight:r/e})}},{key:"render",value:function(){return s.a.createElement("div",null,this.state.calculatedCells?s.a.createElement(y,{rows:this.state.rows,columns:this.state.columns,squareWidth:this.state.squareWidth,squareHeight:this.state.squareHeight}):s.a.createElement("div",null,"Calculating best size"))}}]),a}(r.Component);var w=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(k,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.41e91a1f.chunk.js.map
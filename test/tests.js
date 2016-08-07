"use strict";
var pi = Math.PI;
var tests = [
{ title: "empty",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90})`
},
{ title: "style",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         style:{ ls:"black",
                 fs:"lightgreen"}
        })`
},
{ title: "title",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"turtle"
        })`
},
{ title: "title\nstyle",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:{
           text:"title text",
           style:{
             foc:"maroon",
             foz:17
           }
         }
        })`
},
{ title: "x-range\nbut no\nx-axis",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"very long title",
         xmin:-20, xmax:100,
         xaxis:false,
        })`
},
{ title: "x-axis\ndefault\nwith\nx-range",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"stormy monday",
         xmin:0, xmax:100,
        })`
},
{ title: "x-axis\ntitle\nno\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"supper's ready",
         xaxis:{
           title:"X-axis"
         },
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:0, xmax:1,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:0, xmax:12,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:0,xmax:100,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:20,xmax:100,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-20,xmax:100,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:25,xmax:100,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-25,xmax:100,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-225,xmax:-100,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:0,xmax:115,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:20,xmax:115,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-20,xmax:115,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:25,xmax:115,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-25,xmax:115,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-225,xmax:-115,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-275,xmax:137,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-325,xmax:137,
        })`
},
{ title: "x-axis\n\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         xmin:-0.75,xmax:0.75,
        })`
},
{ title: "x-axis\ntitle\nwith\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"supper's ready",
         xmin:0, xmax:12,
         xaxis:{
           title:"x.axis"
         },
        })`
},
{ title: "x-axis\nstyle\nwith\norigin",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"shortest title",
         xmin:-20, xmax:100,
         xaxis:{
           title:"\u03be",
           origin: true,
           style:{
             ls:"red",
             foc:"red"
           }
         }
        })`
},
{ title: "x-axis\nno ticks",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"α",
         xmin:-100, xmax:20,
         xaxis:{
           title:"x",
           ticks: false
         }
        })`
},
{ title: "x-axis\nno labels",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:{ text:"total" },
         xmin:65, xmax:100,
         xaxis:{
           title:"X-axis",
           labels: false
         }
        })`
},
{ title: "x-axis\ntitle\nstyle",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"bottle",
         xmin:20, xmax:200,
         xaxis:{
           style:{
             ls:"purple",
             foc:"purple",
             foz:10
           },
           title:{
             text:"X-axis",
             style:{foc:"navy"}
           }
         }
        })`
},
{ title: "x-axis\ngrid",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:" another title",
         xmin:0, xmax:50,
         xaxis:{
           title:"X-axis",
           grid: true
         }
        })`
},
{ title: "x-axis\ngrid\nstyle",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"kettle",
         xmin:65, xmax:100,
         xaxis:{
           title:"X-axis",
           grid: { 
             ls:"green", 
             ld:[4,4] 
           }
         }
        })`
},


{ title: "y-axis\ndefault\nwith\ny-range",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"time for lunch",
         ymin:0, ymax:100,
        })`
},
{ title: "no\ny-axis",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"very long title",
         ymin:-20, ymax:100,
         yaxis:false,
        })`
},
{ title: "y-axis\ntitle\nno\nrange",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"it's one o'clock",
         yaxis:{
           title:"y-axis"
         },
        })`
},
{ title: "y-axis\nstyle\nwith\norigin",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"frettle",
         ymin:-20, ymax:100,
         yaxis:{
           title:"\u03be",
           origin: true,
           style:{
             ls:"red",
             foc:"red"
           }
         }
        })`
},
{ title: "y-axis\nno ticks",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"α",
         ymin:-100, ymax:20,
         yaxis:{
           title:"Y",
           ticks: false
         }
        })`
},
{ title: "y-axis\nno labels",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:{ text:"total" },
         ymin:65, ymax:100,
         yaxis:{
           title:"Y-axis",
           labels: false
         }
        })`
},
{ title: "y-axis\ntitle\nstyle",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"buffle",
         ymin:20, ymax:200,
         yaxis:{
           style:{
             ls:"purple",
             foc:"purple",
             foz:10
           },
           title:{
             text:"Y-axis",
             style:{foc:"navy"}
           }
         }
        })`
},
{ title: "y-axis\ngrid",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"hubble",
         ymin:0, ymax:50,
         yaxis:{
           title:"Y-axis",
           grid: true
         }
        })`
},
{ title: "x-axis\ngrid\nstyle",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"humble",
         ymin:65, ymax:100,
         yaxis:{
           title:"Y-axis",
           grid: { 
             ls:"green", 
             ld:[4,4] 
           }
         }
        })`
},
{ title: "x/y-axis\ndefault",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
         title:"both axes",
         xmin:-200, xmax:300,
         ymin:65, ymax:100
        })`
},
{ title: "data",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"flat array",
     funcs:[
       {data:[-1,4,2,-2,3,1,4,1]}
     ],
  })`
},
{ title: "data\narray",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"array of arrays",
     funcs:[
       {data:[[-1,4],
              [2,-2],
              [3,1],
              [4,1]]}
     ],
  })`
},
{ title: "data\nobjects",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"array of objects",
     funcs:[
       {data:[{x:-1,y:4},
              {x:2,y:-2},
              {x:3,y:1},
              {x:4,y:1}]}
     ],
  })`
},
{ title: "data\nspline",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"spline",
     funcs:[
       {data:[-1,4,2,-2,3,1,4,1],
        spline:true}
     ],
  })`
},
{ title: "data\ndots",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"spline",
     funcs:[
       {data:[-1,4,2,-2,3,1,4,1],
        spline:true,
        dots:true}
     ],
  })`
},
{ title: "data\nfilled",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"flat array",
     funcs:[
       {data:[-1,4,2,-2,3,1,4,1],
        style:{
          fs:"rgba(0,256,0,0.5)"
        }
       }
     ],
  })`
},
{ title: "data\nfilled\ndots",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"flat array",
     funcs:[
       {data:[-1,4,2,-2,3,1,4,1],
        dots:true,
        style:{
          fs:"rgba(0,256,0,0.5)"
        }
       }
     ],
  })`
},
{ title: "multiple\ndata\nsets",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"multiple data sets",
     funcs:[
       {data:[-1,4,2,-2,3,1,4,1]},
       {data:[-1,-1,0,-2,2,4,3,2]},
       {data:[0,0,2,3,4,3]}
     ],
  })`
},
{ title: "multiple\ndata\nsets\nfill",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"filled data sets",
     funcs:[
       {data:[-1,4,2,-2,3,1,4,1],
        fill:true},
       {data:[-1,-1,0,-2,2,4,3,2],
        fill:true},
       {data:[0,0,2,3,4,3],
        fill:true}
     ],
  })`
},
{ title: "fn",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"sine",
     xmin:-pi/2, xmax:pi,
     funcs:[{fn:Math.sin,
             dx:pi/30}
     ],
  })`
},
{ title: "fn",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
     title:"sine filled",
     xmin:-pi/2, xmax:pi,
     funcs:[{fn:Math.sin,
             dx:pi/30,
             fill:true}
     ],
  })`
},
{ title: "fn\ntrimmed\ny-region",
  src: `g2().cartesian()
 .chart({x:70,y:35,b:120,h:90,
   title:{text:"tangent"},
   xmin:-pi/3,xmax:4/3*pi,
   ymin:-5,ymax:5,
   funcs:[{fn:Math.tan,dx:pi/240,
       fill:true}],
   xaxis:{title:{text:"phi"},
       grid:true},
   yaxis:{title:{text:"sin(phi)"},
       origin:true}
  })`
},
];

if (typeof module === "object" && module.exports)
   module.exports = tests;
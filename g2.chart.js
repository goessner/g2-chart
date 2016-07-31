/**
 * g2.chart (c) 2015-16 Stefan Goessner
 * @license
 * MIT License
 */

// treat node.js
if (this.require !== undefined)  // assume 'g2.js' in the same directory ...
   g2 = require("./g2.js");

/**
 * Line chart extensions.
 * (Requires cartesian coordinates)
 * @namespace
 */
var g2 = g2 || { prototype:{} };  // for jsdoc only ...

/**
 * Create a line chart.<br>
 * @constructor
 * @returns {object} chart
 * @param {object} args Chart arguments object.
 * @param {float} args.x x-position of chart rectangle.
 * @param {float} args.y y-position of chart rectangle.
 * @param {float} [args.b=150} breadth of chart rectangle.
 * @param {float} [args.h=100] height of chart rectangle.
 * @param {string} [args.title='chart'] chart title.
 * @param {string} [args.title='chart'] chart title.
 * @param {float} [args.xmin=0] minimal x-axis value. If not given it is calculated from chart data values.
 * @param {float} [args.xmax=1] maximal x-axis value. If not given it is calculated from chart data values.
 * @param {float} [args.ymin=0] minimal y-axis value. If not given it is calculated from chart data values.
 * @param {float} [args.ymax=1] maximal y-axis value. If not given it is calculated from chart data values.
 */
g2.prototype.chart = function chart(args) {
   var ch = Object.getPrototypeOf(args) === g2.Chart.prototype ? args : g2.Chart.create(args);
   return ch.draw(this);
}

g2.Chart = {
   create: function() { var o = Object.create(this.prototype); o.constructor.apply(o,arguments); return o; },
   prototype: {
      constructor: function(args) {
         var fncs;
         if (args) Object.assign(this,args);
         if (this.funcs && this.funcs.length) {  // init all funcs ...
            for (var i=0; i<this.funcs.length; i++)
               this.initFunc(this.funcs[i],this.xmin===undefined,
                                           this.xmax===undefined,
                                           this.ymin===undefined,
                                           this.ymax===undefined);
         }
         if (this.xmin !== undefined && this.xmax !== undefined)
            this.xAxis = g2.Chart.AutoAxis.create(this.xmin,this.xmax,0,this.b);
         if (this.ymin !== undefined && this.ymax !== undefined)
            this.yAxis = g2.Chart.AutoAxis.create(this.ymin,this.ymax,0,this.h);
      },
      // get chart property ... custom or default value.
      get: function(n1,n2,n3,n4) {
          var loc = n4 ? this[n1] && this[n1][n2] && this[n1][n2][n3] && this[n1][n2][n3][n4]
                       : n3 ? this[n1] && this[n1][n2] && this[n1][n2][n3]
                            : n2 ? this[n1] && this[n1][n2]
                                 : n1 ? this[n1] 
                                      : undefined;
//          console.log(loc)
          return loc !== undefined 
               ? loc
               : n4 ? g2.Chart[n1] && g2.Chart[n1][n2] && g2.Chart[n1][n2][n3] && g2.Chart[n1][n2][n3][n4]
                     : n3 ? g2.Chart[n1] && g2.Chart[n1][n2] && g2.Chart[n1][n2][n3]
                          : n2 ? g2.Chart[n1] && g2.Chart[n1][n2]
                               : n1 ? g2.Chart[n1]
                                    : undefined;
      },
      initFunc: function(fn,setXmin,setXmax,setYmin,setYmax) {
         // Install func iterator.
         var itr;
         if (fn.data && fn.data.length) { // data must have a polyline conform array structure
            itr = fn.itr = g2.prototype.ply.itrOf.call(null,fn.data);  // get iterator ...
         }
         else if (fn.fn && !setXmin && !setXmax && fn.dx) {
            var self = this;
            itr = fn.itr = function(i) {
               var x = self.xmin + i*fn.dx;
               return { x:x,y:fn.fn(x) };
            }
            itr.len = (this.xmax - this.xmin)/fn.dx + 1;
         }
         // Get func's bounding box
         if (itr) {
            var xmin = Number.POSITIVE_INFINITY, ymin = Number.POSITIVE_INFINITY, 
                xmax = Number.NEGATIVE_INFINITY, ymax = Number.NEGATIVE_INFINITY,
                p;  // data point
            for (var i=0, n=itr.len; i<n; i++) {
               p = itr(i);
               if (p.x < xmin) xmin = p.x;
               if (p.y < ymin) ymin = p.y;
               if (p.x > xmax) xmax = p.x;
               if (p.y > ymax) ymax = p.y;
            }
            fn.xmin = xmin; fn.xmax = xmax, fn.ymin = ymin, fn.ymax = ymax;
            if (setXmin && (this.xmin === undefined || xmin < this.xmin)) this.xmin = xmin;
            if (setXmax && (this.xmax === undefined || xmax < this.xmax)) this.xmax = xmax;
            if (setYmin && (this.ymin === undefined || ymin < this.ymin)) this.ymin = ymin;
            if (setYmax && (this.ymax === undefined || ymax < this.ymax)) this.ymax = ymax;
         }
      },
      valOf: function(pix) {  // to do implementation ...
         return pix;
      },
      pixOf: function(val) {
         return { x: this.x + (val.x - this.xAxis.zmin)*this.xAxis.scl,
                  y: this.y + (val.y - this.yAxis.zmin)*this.yAxis.scl };
      },
      trimPixOf: function(val) {
         return { x: this.x + Math.max(Math.min((val.x - this.xAxis.zmin)*this.xAxis.scl,this.b),0),
                  y: this.y + Math.max(Math.min((val.y - this.yAxis.zmin)*this.yAxis.scl,this.h),0) };
      },
      draw: function(g) {
         var title = this.title,
             funcs = this.get("funcs");
         // draw background & border ...
         g.rec(this.x,this.y,this.b,this.h,this.get("style"));
         // draw title & axes ...
         g.beg(Object.assign({x:this.x,y:this.y},g2.Chart.style,this.style));
         if (title)
            g.txt(title.text || title,this.b/2,this.h + this.get("title","offset"),0,
                  Object.assign({},g2.Chart.title.style,this.title && this.title.style));
         this.drawXAxis(g);
         this.drawYAxis(g);
         g.end();
         // draw funcs ...
         if (funcs && funcs.length)
            for (var i=0; i<funcs.length; i++)
               this.drawFunc(g,funcs[i],g2.Chart.func.color[i]);
         return g;
      },
      drawFunc: function(g,fn,defaultcolor) {
         var plydata = [], itr = fn.itr,
             fill = fn.fill || fn.style && fn.style.fs && fn.style.fs !== "transparent",
             style = Object.assign({},g2.Chart.func.style,
                                      fill ? {ls:defaultcolor,fs:(defaultcolor[0]==="#" ? g2.Chart.semiTransparentOf(defaultcolor) : defaultcolor)}
                                           : {ls:defaultcolor},
                                      fn.style);
         if (itr) {
            if (fill)  // start from base line (y=0)
               plydata.push(this.trimPixOf({x:itr(0).x,y:0}));
            for (var i=0, n=itr.len; i<n; i++)
               plydata.push(this.trimPixOf(itr(i)));
            if (fill)  // back to base line (y=0)
               plydata.push(this.trimPixOf({x:itr(itr.len-1).x,y:0}));
            if (fn.spline)
               g.spline(plydata,false,style);
            else
               g.ply(plydata,false,style);
            if (fn.dots) {
               g.beg({fs:"snow"});
               for (var i=0; i<plydata.length; i++)
                  g.cir(plydata[i].x,plydata[i].y,3);
               g.end();
            }
         }
      },
      drawXAxis: function(g) {
         var tick,
             showgrid = this.xaxis && this.xaxis.grid,
             gridstyle = showgrid
                       ? Object.assign({},g2.Chart.xaxis.grid,this.xaxis.grid)
                       : null,
             showaxis = this.xaxis || this.xAxis,
             axisstyle = showaxis && Object.assign({},g2.Chart.xaxis.style,g2.Chart.xaxis.labels.style,
                                                     this.xaxis && this.xaxis.style),
             showline = showaxis && this.get("xaxis","line"),
             showlabels = this.xAxis && showaxis && this.get("xaxis","labels"),
             showticks = this.xAxis && showaxis && this.get("xaxis","ticks"),
             ticklen = showticks ? this.get("xaxis","ticks","len") : 0,
             showorigin = showaxis && this.get("xaxis","origin"),
             title = this.xaxis && this.xaxis.title,
             itr = this.xAxis && this.xAxis.itr();
         // draw tick/grid lines
         g.beg(axisstyle);
         for (i=0,n=itr && itr.len; i<n; i++) {
            tick = itr(i);
            if (showticks) g.lin(tick.t,0,tick.t,tick.maj ? -ticklen : -2/3*ticklen);
            if (showgrid)  g.lin(tick.t,0,tick.t,this.h,gridstyle);
            if (showorigin && tick.z === 0) g.lin(tick.t,0,tick.t,this.h);  // origin line emphasized ...
            if (showlabels && tick.maj)  // add label
               g.txt(tick.z,tick.t,-(this.get("xaxis","ticks","len")+this.get("xaxis","labels","offset")),0,
                     Object.assign({},g2.Chart.xaxis.labels.style,this.xaxis && this.xaxis.labels && this.xaxis.labels.style));
         }
         if (showline) g.lin(0,0,this.b,0);
         if (title) {
            g.txt(title.text || title,this.b/2,-(  this.get("xaxis","title","offset")
                                                 +(showticks  && this.get("xaxis","ticks","len") || 0)     
                                                 +(showlabels && this.get("xaxis","labels","offset") || 0)     
                                                 +(showlabels && this.get("xaxis","labels","style","foz") || 0)),0,
                  Object.assign({},g2.Chart.xaxis.title.style,this.xaxis && this.xaxis.title && this.xaxis.title.style));
         }
         g.end();
      },
      drawYAxis: function(g) {
         var tick,
             showgrid = this.yaxis && this.yaxis.grid,
             gridstyle = showgrid
                       ? Object.assign({},g2.Chart.yaxis.grid,this.yaxis.grid)
                       : null,
             showaxis = this.yaxis || this.yAxis,
             axisstyle = showaxis && Object.assign({},g2.Chart.yaxis.style,g2.Chart.yaxis.labels.style,
                                                      this.yaxis && this.yaxis.style),
             showline = showaxis && this.get("yaxis","line"),
             showlabels = this.yAxis && this.get("yaxis","labels"),
             showticks = this.yAxis && this.get("yaxis","ticks"),
             ticklen = showticks ? this.get("yaxis","ticks","len") : 0,
             showorigin = showaxis && this.get("yaxis","origin"),
             title = this.yaxis && this.yaxis.title,
             itr = this.yAxis && this.yAxis.itr();
         // draw tick/grid lines
         g.beg(axisstyle);
         for (i=0,n=itr && itr.len; i<n; i++) {
            tick = itr(i);
            if (showticks) g.lin(0,tick.t,tick.maj ? -ticklen : -2/3*ticklen,tick.t);
            if (showgrid)  g.lin(0,tick.t,this.b,tick.t,gridstyle);
            if (showorigin && tick.z === 0) g.lin(0,tick.t,this.b,tick.t);  // origin line emphasized ...
            if (showlabels && tick.maj)  // add label
               g.txt(tick.z,-(this.get("yaxis","ticks","len")+this.get("yaxis","labels","offset")),tick.t,Math.PI/2);
         }
         if (showline) g.lin(0,0,0,this.h);
         if (title)
            g.txt(title.text || title,-( this.get("yaxis","title","offset")
                                        +(showticks  && this.get("yaxis","ticks","len") || 0)   
                                        +(showlabels && this.get("yaxis","labels","offset") || 0)    
                                        +(showlabels && this.get("yaxis","labels","style","foz") || 0)),this.h/2,Math.PI/2,
                        Object.assign({},g2.Chart.yaxis.title.style,this.yaxis && this.yaxis.title && this.yaxis.title.style));
         g.end();
      }
   },
/**
 * Create an axis from given range with ticks.<br>
 * @constructor
 * @returns {object} axis
 * @param {float} zmin min-value in user units.
 * @param {float} zmax max-value in user units.
 * @param {float} tmin min-value in device units (tick space).
 * @param {float} tmax max-value in device units (tick space).
 */
   AutoAxis: {
      create: function() { var o = Object.create(this.prototype); o.constructor.apply(o,arguments); return o; },
      prototype: {
         constructor: function(zmin,zmax,tmin,tmax) {
            var base = 2, exp = 1, eps = Math.sqrt(Number.EPSILON),
                dtick,                     // tickrange
                t0,                        // first tick
                dz = zmax - zmin || 1,     // value range
                dt = tmax - tmin || 1,     // pixel range
                scl = dz > eps ? dt/dz : 1;
            while ((dtick = scl*base*Math.pow(10,exp)) < 14 || dtick > 35) {  // 14 < dtick <= 35 !
               if (dtick < 14) {
                  if      (base == 1) base = 2;
                  else if (base == 2) base = 5;
                  else if (base == 5) { base = 1; exp++; }
               }
               else { // dtick > 35
                  if      (base == 1) { base = 5; exp--; }
                  else if (base == 2) base = 1;
                  else if (base == 5) base = 2;
               }
            }
            t0 = Math.abs(zmin*scl%dtick);
            t0 = t0 < eps || dtick - t0 < eps ? 0 : t0;
//            console.log(t0+";"+dtick+";"+(dtick-t0)+";"+eps)
            this.scl = scl;                                // scale [usr]->[pix]
            this.zmin = zmin;                              // min. value [usr]
            this.dz = dz;                                  // value range [usr]
            this.tmin = tmin;                              // min. value [pix]
            this.dt = dt;                                  // pixel range [pix]
            this.exp = exp;                                // 10^exp
            this.dtick = dtick;                            // tickrange [pix] ... scl*base*10^exp
            this.jth = base===2 ? 5 : 2;                   // tick count between every major tick
            this.i0 = zmin >= 0 || t0 === 0                // start tick index relative to zero
                    ? Math.floor(zmin*scl/dtick)           // Math.floor has strange behaviour ..
                    : Math.floor(zmin*scl/dtick + 1);      // .. for negative numbers !
            this.z0 = this.i0*dtick/scl;                   // start tick value [usr] .. not used !
            this.t0 = Math.floor(t0);// start tick [pix]
//            z       = i*dtick/scl + j0*dtick/scl
//            this.t0 = Math.floor((this.z0 - zmin)*scl + tmin + 0.5); // start tick value [pix]
//console.log("dtick="+this.dtick)
//console.log("zmin*scl%dtick="+(zmin*scl%dtick))
//console.log("i0="+this.i0)
//console.log("t0="+this.t0)
//console.log("z0="+this.z0)
         },
         get zmax() { return this.zmin + this.dz; },
         get tmax() { return this.tmin + this.dt; },
         itr: function() {
            var self = this;
            function tickItr(i) { 
               var t = self.t0 + i*self.dtick;
               return { t: self.t0 + i*self.dtick,
                        z: Math.round(((self.i0 + i)*self.dtick/self.scl)*Math.pow(10,-self.exp))*Math.pow(10,self.exp),
                        maj: (self.i0 + i)%self.jth === 0 };
            }
            tickItr.len = Math.floor((this.dt - this.t0)/this.dtick + 1);
//console.log("n="+tickItr.len)
            return tickItr;
         }
      }
   },
   // static helpers ...
   semiTransparentOf: function(hexstr) { 
       var hex = parseInt(hexstr.substring(1),16); 
       return "rgba("+((hex & 0xff0000) >> 16)+","+((hex & 0x00ff00) >> 8)+","+(hex & 0x0000ff)+",0.5)"; 
   },
   // chart default properties
   style: { ls:"transparent",fs:"#efefef" },
   title: {
      text: null,
      offset: 3,
      style: { foc:"#000", foz:16, thal:"center", tval:"bottom" }
   },
   funcs: [],
   func: {
      style: { lw:1, fs:"transparent" },
      // s. https://web.njit.edu/~kevin/rgb.txt.html
      color: ["#426F42", /*medium seagreen*/
              "#8B2500", /*orange red 4*/
              "#23238E", /*navy*/
              "#5D478B"  /*medium purple 4*/
             ]
   },
   xaxis: {
      line: true,
      style: { ls:"#888", thal:"center", tval:"top", foc:"black" },
      origin: false,
      title: {
         text: null,
         offset: 1,
         style: { foz:12 },
      },
      ticks: { len: 6 },
      grid: { ls:"#ddd", ld:[] },
      labels: {
         loc: "auto",    // "auto" | [2,4,6] | [{v:3.14,s:"pi"},{v:6.28,s:"2*pi"}]
         offset: 1,
         style: { foz:11 }
      }
   },
   yaxis: {
      line: true,
      style: { ls:"#888", thal:"center", tval:"bottom", foc:"black"  },
      origin: false,
      title: {
         text: null,
         offset: 2,
         style: { foz:12 },
      },
      ticks: { len: 6 },
      grid: { ls:"#ddd", ld:[] },
      labels: {
         loc: "auto",    // "auto" | [2,4,6] | [{v:3.14,s:"pi"},{v:6.28,s:"2*pi"}]
         offset: 1,
         style: { foz:11 }
/*
         ticks: true,
         offset: 7,
         style: { ls:"#000", foc:"#000", foz:11, thal:"right", tval:"middle" },
         loc:  "auto",   // "auto" | [2,4,6] | [{v:3.14,s:"pi"},{v:6.28,s:"2*pi"}]
*/
      },
   }
};

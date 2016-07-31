/**
* see https://github.com/hanifbbz/micromustache/blob/master/src/micromustache.js
* Replaces every {{member}} string inside the template string with values corresponding to obj[member].
* @param str {string} template string containing one or more {{member}} names or expressions.
* @param obj {object} object containing string (or number) values for every object member that is used in the template
* @return {string} template with member expressions replaced by object's member values.
*/
function applyTemplate(tmpl,obj) {
   function eval(name,val) {
      switch (typeof val) {
         case 'string':
         case 'number':
         case 'boolean':
            return val;
         case 'function':  // if the value is a function, call it passing the variable name
            return val(name);
         default:
            return '';
      }
   }
   return tmpl.replace(/\{?\{\{\s*(.*?)\s*\}\}\}?/g, function(match,variable) {
      var m1, m2, m3;
            variable.replace(/([^.]+)[\.](.+)[\.](.+)/g, function($0,$1,$2,$3) { m1 = $1; m2 = $2; m3 = $3; return ""; });
            if (!m1)
               variable.replace(/([^.]+)[\.](.+)/g, function($0,$1,$2) { m1 = $1; m2 = $2; return ""; });
            if (!m1)
               variable.replace(/(.+)/g, function($0,$1) { m1 = $1; return ""; });
            if      (m1 && !m2 && !m3) return eval(variable,obj[m1]);
            else if (m1 &&  m2 && !m3) return eval(variable,obj[m1][m2]);
            else if (m1 &&  m2 &&  m3) return eval(variable,obj[m1][m2][m3]);
            else                       return "";
         });
}

window.onload = function() {
   var rows = document.getElementById("rows"),
       tmpl = document.getElementById("row-tmpl"),
       row, cell, g, out = { width:201, height:101 };
   for (var i=0; i<tests.length; i++) {
      rows.innerHTML += tmpl.innerHTML;
      document.getElementById("row").id = "#"+i;
   }
   for (var i=0; i<tests.length; i++) {
      cell = document.getElementById("#"+i).getElementsByTagName("td");
      cell[0].innerHTML = tests[i].title;
      cell[1].innerHTML = tests[i].src.replace("<","&lt;");
      delete g; 
      g = eval(tests[i].src);
      g.exe(cell[2].firstChild.getContext("2d"));
      g.exe(cell[3]);
   }
}

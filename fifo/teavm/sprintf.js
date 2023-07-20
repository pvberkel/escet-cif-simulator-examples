//////////////////////////////////////////////////////////////////////////////
// Copied from https://www.wis.co.uk/andy/brushstrokes/sprintfjs.html
// 
// Copyright © 2009 Andy Watkins
// 
// Permission is hereby granted, free of charge, to any person obtaining a 
// copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE. 
//////////////////////////////////////////////////////////////////////////////
function sprintfJS(str, args)
{
   if (!args || !RegExp)
   {
      return;
   }
   var re = /([^%]*)%('.|0|\d\$)?(-)?(\d+)?(\.\d+)?(%|b|c|d|e|u|f|o|s|x|X)(.*)/;
   var a = b = [], numSubstitutions = 0, numMatches = 0;
   while (a = re.exec(str))
   {
      var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
      var pPrecision = a[5], pType = a[6], rightPart = a[7];
      numMatches++;
      if (pType == '%') {
         padding='';
         subst = '&#37;';
      }
      else
      {
         numSubstitutions++;
         if (numSubstitutions >= args.length+1)
         {
            console.info('Error! Not enough function arguments (' + (args.length)
               + ', excluding the string)\n'
               + 'for the number of substitution parameters in string ('
               + numSubstitutions + ' so far).');
         }
         var param = args[numSubstitutions-1];
         var pad = '';
         if (pPad) {
             if (pPad.substr(1,1) == '$') {            // Arg swapping
                 param = args[parseInt(pPad)-1];
             } else if (pPad.substr(0,1) == "'") {     // Custom pad character
                 pad = pPad.substr(1,1);
             } else {                                  // Pad with zeros
                 pad = pPad;
             }
         }
         var justifyRight = true;
         if (pJustify && pJustify === "-") justifyRight = false;
         var minLength = -1;
         if (pMinLength) minLength = parseInt(pMinLength);
         var precision = -1;
         if (pPrecision && (pType == 'e'|| pType == 'f')) {
             precision = parseInt(pPrecision.substring(1));
         }
         var subst = param;
         switch (pType)
         {
        case 'b':
            subst = parseInt(param).toString(2);
            break;
         case 'c':
            subst = String.fromCharCode(parseInt(param));
            break;
         case 'd':
            subst = parseInt(param) ? parseInt(param) : 0;
            break;
         case 'e':
            subst = precision>-1 ? param.toExponential(precision) : param.toExponential();
            break;
         case 'u':
            subst = Math.abs(param);
            break;
         case 'f':
            subst = (precision > -1)
             ? Math.round(parseFloat(param) * Math.pow(10, precision))
              / Math.pow(10, precision)
             : parseFloat(param);
            break;
         case 'o':
            subst = parseInt(param).toString(8);
            break;
         case 's':
            subst = param;
            break;
         case 'x':
            subst = ('' + parseInt(param).toString(16)).toLowerCase();
            break;
         case 'X':
            subst = ('' + parseInt(param).toString(16)).toUpperCase();
            break;
         }
         var padLeft = minLength - subst.toString().length;
         if (padLeft > 0)
         {
            var arrTmp = new Array(padLeft+1);
            var padding = arrTmp.join(pad?pad:" ");
         }
         else
         {
            var padding = "";
         }
      }
      str = leftpart + padding + subst + rightPart;
   }
   return str;
}

JavaScript twilight zone list
-----------------------------

var a;  
a == undefined --> true  
var e = document.getElementById("not_existing_id");  
e == null --> true  
a == e --> true

var n0 = 0 / 0;  
n0 == NaN --> false
isNaN(n0) --> true  
typeof n0 --> "number"  
isNaN("not_number") --> true  
isNaN("42") --> false

99 == "99" --> true  
"99" + 99 --> "9999"  
"10" + 4 --> "104"  
"10" - 4 --> 6  
5 - true --> 4  

undefined == false --> false  
null == false --> false
undefined == null --> true  

0 == "" --> true  
0 == "0" --> true  
"" == "0" --> false  

1 == true --> true  
"1" == true --> true  
"true" == true --> false  



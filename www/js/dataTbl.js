var s_wlc = [];
var s_ap = [];
var base_url = "https://greyboxerp.in/wpundit";

function getData(q,type,f,dSuccess,dError) {
	 
	var sql = "q=" + q;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				 dSuccess(req.responseText);
								
			} catch (e) {
				dError(req.responseText);
				console.log("Exception::-"+e.toString());
			}
		}
		if (req.readyState == 4 && req.status == 404) {
			dError(req.responseText);
		}
	};
	if(type==0){
		req.open("GET", base_url + "/"+f+"?" +  q, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send();
	}else{
		req.open("POST", base_url + "/" + f, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(sql);
	}
}

function getRandomColor(sid) {
  var colors = ["ff6347","ff00ff","ff0080","00cc00","ff6347","55C1E7","003399","990033","ff6347","55C1E7"];
  var toText = sid.toString(); //convert to string
  var lastChar = toText.slice(-1); //gets last character
  var lastDigit = +(lastChar); 
  
  return colors[lastDigit];
}

function markAbs(id,att){
	var ele = document.getElementById("m_" + id);
	if(ele.style.background == "rgb(211, 246, 250)"){
		ele.style.background = "white";
		var i = att.indexOf(id);
		if(i!= -1)
			att[i] = "";
	}	
	else{	
		ele.style.background = "#D3F6FA";
		att.push(id);
	}
}

function calcRec(){
		
	var q = "wlc=" + localStorage["wlc"] + "&ap=" + localStorage["ap"];
	getData(q,0,"getRec.php",recSuccess,eRR);
	
}
function recSuccess(data){
	var d = JSON.parse(data);
	var d1 = d["wlc"];
	var d2 = d["ap"];
	var d3 = d["wlc_ap"];
	var txt = ""
	
	//WLC
	for(var key in d1){
		if(d1[key][0] == 1){
			txt += key + " is EOL ";
			
			if(d1[key][1] == 1)
				txt += "and End of Support. <br>";
			else
				txt += ".<br>";	
		}	
	}
	txt += "<hr>";
	//AP
	for(var key in d2){
		if(d2[key][0] == 1){
			txt += key + " is EOL ";
			if(d2[key][1] == 1)
				txt += "and End of Support. <br>";
			else
				txt += ".<br>";	
		}	
	}
	
	document.getElementById("alert").innerHTML = txt;	
	
	// map wlc to ap for recommended and last supported aireos version
	var txt = "";
	for(var key in d3){
	    document.getElementById("selwlc").innerHTML = " for <u>" + key + "</u>";
	    txt +=  enList(d3[key]) ;
	}
	// Now list those AP in red if they are not supported by WLC
	for(var key in d2){
	    for(var key1 in d3){
	        var v = String(d3[key1]).split("|")[0];
	        if(v != key)
	           txt += "<span style='color:red'>" + key + "<br></span>";
	    }
	}
	
		document.getElementById("aos").innerHTML = txt;
}
function eRR(){}
function enList(str){
    str = String(str);
    var ret = "";
    var res = str.split(",");
    res.forEach(function(r){ 
        var os = r.split("|");
        ret += os[0] + " <b style='font-size:14px;'> " + os[1] + "</b>" + "<br>";
        
    });
    
    return ret;
}
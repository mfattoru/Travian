// ==UserScript==
// @name        RiepilogoTruppe
// @namespace   http://ts*.travian.*/build.php*id=39*
// @description riepilogo tutte le truppe in un villo
// @include     http://ts*.travian.*/build.php*id=39*
// @version     1
// @grant       none
// ==/UserScript==

var mioDiv=null;
var container=null;
var i=0;
var j=0;
var k=0;
var container=0;
var tempTruppe=0;
var temp=null;
var tempName=null;
var query=null;
var consumo;
var tipoRiepilogo;
var nomeVillo;
var villoRiepilogo;
var truppe=new Array(0,0,0,0,0,0,0,0,0,0,0);
var nomeTruppe=new Array('#1','#2','#3','#4','#5','#6','#7','#8','#9','#10','#11');
mioDiv=document.createElement('div');
mioDiv.id='riepilogoTruppe';
//recupero icone delle truppe

tempName=document.getElementById('unitRowAtTown');
for(k=0;k<11;k++){
	nomeTruppe[k]=tempName.getElementsByTagName('td')[k].innerHTML;
}


//recuper numero di truppe
container=document.getElementsByClassName('units last')[0];
nomeVillo=document.getElementById('villageNameField').innerHTML;
while(container!=undefined){
    tipoRiepilogo=container.parentNode.className;
    if(tipoRiepilogo=='troop_details'){ //calcolo consumo grano solo nei report di riepilogo e non di rinforzo o raid
        //recupero consumo grano delle truppe.se sono belve non consumano grano
        consumo=container.parentNode.getElementsByClassName('infos')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByClassName('sup')[0].innerHTML; 
	    if((parseInt(consumo.charAt(7))!=0)){ // se non sono bestie
	       villoRiepilogo=container.parentNode.getElementsByClassName('role')[0].getElementsByTagName('a')[0].innerHTML;
           if(nomeVillo==villoRiepilogo){  //al riepilogo del villaggio vengono sommate soltanto le truppe create in quel villaggio
	           for(j=0;j<11;j++){
	               temp=container.getElementsByTagName('tr')[0].getElementsByTagName('td')[j].innerHTML;
	               if(!isNaN(parseInt(temp.charAt(0)))){
	                   tempTruppe=parseInt(temp.charAt(0)+temp.charAt(1)+temp.charAt(2)+temp.charAt(3)+temp.charAt(4)+temp.charAt(5));
	                   truppe[j]=truppe[j]+tempTruppe;
	               }
	               else if(!isNaN(parseInt(temp.charAt(14)))){
		              tempTruppe=parseInt(temp.charAt(14)+temp.charAt(15)+temp.charAt(16)+temp.charAt(17)+temp.charAt(18)+temp.charAt(19));
		              truppe[j]=truppe[j]+tempTruppe;
                   }	
	           }
	        }
        }
    }
    else if(tipoRiepilogo=='troop_details outRaid' || tipoRiepilogo=='troop_details inReturn' || tipoRiepilogo=='troop_details outAttack' || tipoRiepilogo=='troop_details outSupply'){  //riepilogo di raid o ritorno truppe
        for(j=0;j<11;j++){
	       temp=container.getElementsByTagName('tr')[0].getElementsByTagName('td')[j].innerHTML;
	       if(!isNaN(parseInt(temp.charAt(0)))){
	           tempTruppe=parseInt(temp.charAt(0)+temp.charAt(1)+temp.charAt(2)+temp.charAt(3)+temp.charAt(4)+temp.charAt(5));
	           truppe[j]=truppe[j]+tempTruppe;
	       }
	       else if(!isNaN(parseInt(temp.charAt(14)))){
		      tempTruppe=parseInt(temp.charAt(14)+temp.charAt(15)+temp.charAt(16)+temp.charAt(17)+temp.charAt(18)+temp.charAt(19));
		      truppe[j]=truppe[j]+tempTruppe;
           }	
	   }
    }
	i=i+1;
	container=document.getElementsByClassName('units last')[i];
}

query="<table border='1'><tr>";

for(j=0;j<11;j++){
    query+="<td>"+nomeTruppe[j]+"</td>";
}
query+="</tr><tr>";
for(j=0;j<11;j++){
	query+="<td>"+truppe[j]+"</td> ";
}
query+="</tr></table>";
mioDiv.innerHTML=query;
document.body.insertBefore(mioDiv,document.body.firstChild);


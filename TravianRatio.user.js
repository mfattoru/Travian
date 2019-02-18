// ==UserScript==
// @name        TravianRatio
// @namespace   http://ts*.travian.*/*
// @include     http://ts*.travian.*/*
// @version     1
// @grant       none
// ==/UserScript==


//nascondi Infobox
/*if(document.getElementById('sidebarBoxInfobox')!=undefined){
	document.getElementById('sidebarBoxInfobox').style.display="none";
}*/

//recupero nome pagina aperta
var pathname = window.location.pathname;

if(pathname=="/dorf1.php"){
    //recupero tipo di popolazione  
    var romano=document.getElementsByClassName('nation nation1')[0];  //romano
    var teutone=document.getElementsByClassName('nation nation2')[0];  //teutone
    var gallo=document.getElementsByClassName('nation nation3')[0];  //gallo

    var Rlegno;
    var Rargilla;
    var Rferro;
    var Rgrano;

    if(romano!=undefined){
        Rlegno=10;
        Rargilla=12;
        Rferro=8;
        Rgrano=6;
    }
    else if(gallo!=undefined){
        Rlegno=10;
        Rargilla=12;
        Rferro=8;
        Rgrano=6;  
    }
    else{
        Rlegno=12;
        Rargilla=10;
        Rferro=8;
        Rgrano=6;
    }


    var production=document.getElementById('production').getElementsByTagName('tbody')[0];

    //recupera stringa contenente la produzione oraria del tuo villo
    var legno=production.getElementsByTagName('tr')[0].getElementsByClassName('num')[0].innerHTML;
    var argilla=production.getElementsByTagName('tr')[1].getElementsByClassName('num')[0].innerHTML;
    var ferro=production.getElementsByTagName('tr')[2].getElementsByClassName('num')[0].innerHTML;
    var grano=production.getElementsByTagName('tr')[3].getElementsByClassName('num')[0].innerHTML;

    //estrazione del valore numerico dalla stinga e calcolo del ratio
    var Vlegno=parseInt(legno.charAt(8)+legno.charAt(9)+legno.charAt(10)+legno.charAt(11)+legno.charAt(12))/Rlegno;
    var Vargilla=parseInt(argilla.charAt(8)+argilla.charAt(9)+argilla.charAt(10)+argilla.charAt(11)+argilla.charAt(12))/Rargilla;
    var Vferro=parseInt(ferro.charAt(8)+ferro.charAt(9)+ferro.charAt(10)+ferro.charAt(11)+ferro.charAt(12))/Rferro;
    var Vgrano=parseInt(grano.charAt(8)+grano.charAt(9)+grano.charAt(10)+grano.charAt(11)+grano.charAt(12))/Rgrano;
	
	//se produzione di grano è negativa avverti che si deve aumentare la produzione
	if(isNaN(Vgrano)){
		Vgrano=0;
	}


    //decisione della risorsa da uppare
    if(romano!=undefined || gallo!=undefined){
         //--------------------------------------Gestione Argilla-------------------------------------------
         if(Vargilla<=Vlegno && Vargilla<=Vferro && Vargilla <=Vgrano){
            production.getElementsByTagName('tr')[1].getElementsByClassName('num')[0].style.color="red";
         }
         else{
            production.getElementsByTagName('tr')[1].getElementsByClassName('num')[0].style.color="green";
        }
        //--------------------------------------Gestione Legno---------------------------------------------
        if(Vlegno<Vargilla && Vlegno<=Vferro && Vlegno <=Vgrano){
            production.getElementsByTagName('tr')[0].getElementsByClassName('num')[0].style.color="red";
        }
        else{
            production.getElementsByTagName('tr')[0].getElementsByClassName('num')[0].style.color="green";
        }
    }
    else if(teutone!=undefined){
        //--------------------------------------Gestione Argilla-------------------------------------------
        if(Vargilla<Vlegno && Vargilla<=Vferro && Vargilla <=Vgrano){
            production.getElementsByTagName('tr')[1].getElementsByClassName('num')[0].style.color="red";
        }
        else{
            production.getElementsByTagName('tr')[1].getElementsByClassName('num')[0].style.color="green";
        }
        //--------------------------------------Gestione Legno---------------------------------------------
        if(Vlegno<=Vargilla && Vlegno<=Vferro && Vlegno <=Vgrano){
            production.getElementsByTagName('tr')[0].getElementsByClassName('num')[0].style.color="red";
        }
        else{
            production.getElementsByTagName('tr')[0].getElementsByClassName('num')[0].style.color="green";
        }
    }

    //--------------------------------------Gestione Ferro---------------------------------------------
    if(Vferro<Vargilla && Vferro<Vlegno && Vferro <= Vgrano){     //amplia ferro
        production.getElementsByTagName('tr')[2].getElementsByClassName('num')[0].style.color="red";
    }
    else{
        production.getElementsByTagName('tr')[2].getElementsByClassName('num')[0].style.color="green";
    }

    //---------------------------------------Gestione Grano--------------------------------------------
    if(Vgrano<Vargilla && Vgrano<Vlegno && Vgrano<Vferro){
        production.getElementsByTagName('tr')[3].getElementsByClassName('num')[0].style.color="red";
    }
    else{
        production.getElementsByTagName('tr')[3].getElementsByClassName('num')[0].style.color="green";
    }
    document.getElementsByClassName('linklistNotice')[0].innerHTML='<a href="http://www.gettertools.com" target="_blank">Getter Tool</a> <br> <a href="http://travian.kirilloid.ru/warsim2.php" target="_blank">Combat Simulator</a> <br> <a href="http://elephants.travibot.com" target="_blak">Cerca Elefanti</a> <br> Ratio Legno='+Vlegno.toFixed(3)+'<br> Ratio Argilla='+Vargilla.toFixed(3)+'<br> Ratio Ferro='+Vferro.toFixed(3)+'<br> Ratio Grano='+Vgrano.toFixed(3);
}
else{
    document.getElementsByClassName('linklistNotice')[0].innerHTML='<a href="http://www.gettertools.com" target="_blank">Getter Tool</a> <br> <a href="http://travian.kirilloid.ru/warsim2.php" target="_blank">Combat Simulator</a> <br> <a href="http://elephants.travibot.com" target="_blak">Cerca Elefanti</a>';
}

/*
if(pathname=="/dorf1.php" || pathname=="/dorf2.php"){
	var legnoTot=document.getElementById('stockBarResource1').getElementsByClassName('middle')[0].getElementById('l1').innerHTML;
	var argillaTot=document.getElementById('stockBarResource2').getElementsByClassName('middle')[0].getElementById('l2').innerHTML;
	var ferroTot=document.getElementById('stockBarResource3').getElementsByClassName('middle')[0].getElementById('l3').innerHTML;
	var granoTot=document.getElementById('stockBarResource4').getElementsByClassName('middle')[0].getElementById('l4').innerHTML;
	
	if(pathname=="/dorf2.php"){
		var infoCosto=document.getElementById('clickareas').getElementsByTagName('area')[0].alt;
		
			infoCosto=infoCosto.substring(infoCosto.indexOf('/>')+2,infoCosto.length);
			infoCosto=infoCosto.substring(infoCosto.indexOf('/>')+2,infoCosto.length);
			var costoLegno=parseInt(infoCosto.charAt(0)+infoCosto.charAt(1)+infoCosto.charAt(2)+infoCosto.charAt(3)+infoCosto.charAt(4)+infoCosto.charAt(5)+infoCosto.charAt(6));
			infoCosto=infoCosto.substring(infoCosto.indexOf('/>')+2,infoCosto.length);
			var costoArgilla=parseInt(infoCosto.charAt(0)+infoCosto.charAt(1)+infoCosto.charAt(2)+infoCosto.charAt(3)+infoCosto.charAt(4)+infoCosto.charAt(5)+infoCosto.charAt(6));
			infoCosto=infoCosto.substring(infoCosto.indexOf('/>')+2,infoCosto.length);
			var costoFerro=parseInt(infoCosto.charAt(0)+infoCosto.charAt(1)+infoCosto.charAt(2)+infoCosto.charAt(3)+infoCosto.charAt(4)+infoCosto.charAt(5)+infoCosto.charAt(6));
			infoCosto=infoCosto.substring(infoCosto.indexOf('/>')+2,infoCosto.length);
			var costoGrano=parseInt(infoCosto.charAt(0)+infoCosto.charAt(1)+infoCosto.charAt(2)+infoCosto.charAt(3)+infoCosto.charAt(4)+infoCosto.charAt(5)+infoCosto.charAt(6));

			alert(costoLegno);
			alert(costoArgilla);
			alert(costoFerro);
			alert(costoGrano);
		
	}
}
*/




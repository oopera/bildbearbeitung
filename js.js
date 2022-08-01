// Bild in Canvas laden
window.onload=function(){
    document.getElementById('imageLoader').onchange = function(e) {
        img = new Image();
        img.onload = draw;
        img.onerror = failed;
        img.src = URL.createObjectURL(this.files[0]);
      };
    const el = document.querySelector("#sitecontainer");
    const body = document.querySelector('body')
    dragElement(document.getElementsByClassName('frame')[0]);
    dragElement(document.getElementById('asuka'));
    dragElement(document.getElementById('reio'));
    initialize();

    body.addEventListener("mousemove", (e) => {
        el.style.backgroundPositionX = -e.pageY /50 + "px";
        el.style.backgroundPositionY = -e.pageX /50 + "px";
        animateMouse(e)
        animateRei(e)
        
      });
  }

  var img;



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

  function draw() {
    var canvas = document.getElementById('myCanvas');
    const factor = 900; 
    if(this.height > factor || this.width > factor){
        const ratioH = this.height/this.width
        const ratioW = this.width/this.height
        this.height > this.width ? (canvas.height=factor, canvas.width= factor*ratioW)  : (canvas.width=factor, canvas.height= factor*ratioH)
    }else{
        canvas.height=this.height
        canvas.width=this.width
    }
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0,0, this.width, this.height, 0,0, canvas.width, canvas.height);
  }
  function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
  }

function animateRei(e){
    const rei = document.getElementById('reio');
    const asuka = document.getElementById('asuka');
    const globey = document.getElementById('globecontainer')
    const frame = document.getElementsByClassName('frame')[0]

    rei.style.transform = "translate(" + e.pageX/15 + 'px,' + e.pageY/55 + 'px)'
    asuka.style.transform = "translate(" + e.pageY/63 + 'px,' + e.pageX/50 + 'px)'
    globey.style.left = 650-e.pageY/63 + 'px';
    globey.style.top = 350-e.pageX/50 + 'px';
    frame.style.transform = "translate(" +e.pageX/100 + 'px,' + e.pageY/100 + 'px)'

}

function animateMouse(e){
    const y = mouseTing.style.top = e.clientY-25/2,
    x = mouseTing.style.left = e.clientX-25/2;

    const keyframes = {
        transform: `translate(${x}px, ${y}px) `
      }
      
      mouseTing.animate(keyframes, { 
        duration: 800, 
        fill: "forwards" 
      });
      
}



/*  
const factor = 500; 
if(this.height < factor || this.width < factor){
    const ratio = this.width/this.height
    this.height > this.width ? (canvas.style.height=factor, canvas.style.width= factor*ratio)  : (canvas.style.width=factor, canvas.style.height= factor*ratio)
}else{
    canvas.style.height=this.height
    canvas.style.width=this.width
}
*/

function hide(){
    const arrow = document.getElementById('arrow').classList;
    arrow.contains('arrow') ? (arrow.remove('arrow'), arrow.add('arrowleft')) : (arrow.remove('arrowleft'), arrow.add('arrow'))
    const cont = document.getElementById('controlcontainer').classList;
    cont.contains('hidden') ? cont.remove('hidden') : cont.add('hidden')
}

function getPixelColor(imgData, x, y) {
    var i = 4*(x+y*imgData.width);
    r = imgData.data[i+0];
    g = imgData.data[i+1];
    b = imgData.data[i+2];
	a = imgData.data[i+3];
    return { r: r, g: g, b: b, a: a};
}

function setPixelColor(imgData, x, y, r, g, b, a) {
    var i = 4*(x+y*imgData.width);
    imgData.data[i + 0] = r;
    imgData.data[i + 1] = g;
    imgData.data[i + 2] = b;
	imgData.data[i + 3] = a;
}


 //1.Umwandlung in Graubild
function Grauwertbild() {
	let canvas = document.getElementById("myCanvas");
	let srcImg = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			var Pixel = getPixelColor(imgData, x,y);
			let lightness = ((Pixel.r + Pixel.g + Pixel.b) / 3);
			setPixelColor(imgData, x,y, lightness, lightness, lightness, Pixel.a);
  } }
  ctx.putImageData(imgData, 0, 0);
}

//2 Umwandlung in ein Schwarz-Weiß-Bild, der Schwellwert ist einstellbar zu halten
function SWBild(){
    var schwellwert = document.getElementById('420').value;
    var srcImg = document.getElementById('myCanvas');
    var canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			var Pixel = getPixelColor(imgData, x,y);
			let lightness = ((Pixel.r + Pixel.g + Pixel.b) / 3);
			lightness = lightness < schwellwert ? 0 : 255;
			setPixelColor(imgData, x,y, lightness, lightness, lightness, Pixel.a);
      }}
    ctx.putImageData(imgData, 0, 0);
}

//3. Aufhellen und Abdunkeln des Bildes in Stufen
function Helligkeit() {
	let faktor = document.getElementById("421").value;
	let canvas = document.getElementById("myCanvas");
	let srcImg = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			var Pixel = getPixelColor(imgData, x,y);
			setPixelColor(imgData, x,y, Pixel.r*faktor, Pixel.g*faktor, Pixel.b*faktor, Pixel.a);
		}}
 	  ctx.putImageData(imgData, 0, 0);
}
//4. Kontrast des Bildes um einen einstellbaren Wert erhöhen bzw. erniedrigen
function Kontrast(){ 
	let contrast = document.getElementById("422").value;
	let canvas = document.getElementById("myCanvas");
	let srcImg = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
  	let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    contrast = (contrast/100) + 1;  
    var intercept = 128 * (1 - contrast);
	for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			var Pixel = getPixelColor(imgData, x,y);
			setPixelColor(imgData, x,y, Pixel.r*contrast + intercept, Pixel.g*contrast + intercept, Pixel.b*contrast + intercept, Pixel.a);
		}}
 	  ctx.putImageData(imgData, 0, 0);
}
//5.Dynamische Veränderung des Rot-, Grün- und Blau-Anteils
function RGB(){
    let red = document.getElementById("423").value;
    let green = document.getElementById("424").value;
    let blue = document.getElementById("425").value;
    let canvas = document.getElementById("myCanvas");
    let srcImg = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			var pix = getPixelColor(imgData, x, y);
			setPixelColor(imgData, x, y, (pix.r*red)+1, (pix.g*green)+1, (pix.b*blue)+1, pix.a);
    }}
    ctx.putImageData(imgData, 0, 0);
}
//6. Negativ Erstellung eines Bildes
//RGB Wert der Pixel von 255 abgezogen um Negativen Wert zu erhalten 
function Negativ(){
    let canvas = document.getElementById("myCanvas");
    let srcImg = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			var Pixel = getPixelColor(imgData, x,y);
			setPixelColor(imgData, x,y, 255-Pixel.r, 255-Pixel.g, 255-Pixel.b, Pixel.a);
      }}
    
    ctx.putImageData(imgData, 0, 0);
}
//7. Rotation um 90° 
//7.1 im Uhrzeigersinn (3-mal 90°Drehung linksrum)
function RotationU() {
//3-mal nach links drehen ergibt 1-mal nach rechts
	for(i=0; i<3; i++){
		var sourceimage = document.getElementById('myCanvas');
		var canvas = document.getElementById('myCanvas');
		var w = canvas.width;
		var h = canvas.height;
		var ctx = canvas.getContext('2d');
		var imgData = ctx.getImageData(0, 0, w, h);
		var newimgData = ctx.createImageData(h, w);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
            var Pixel = getPixelColor(imgData, x ,y);
            setPixelColor(newimgData, y, imgData.width - x -1, Pixel.r, Pixel.g, Pixel.b, Pixel.a);
        }
    }
 	canvas.width = newimgData.width;
	canvas.height = newimgData.height;
    ctx.putImageData(newimgData, 0, 0);
}}
 //7.2 gegen den Uhrzeigersinn
function RotationGGU() {
	var sourceimage = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imgData = ctx.getImageData(0, 0, w, h);
	var newImgData = ctx.createImageData(h, w);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
            var Pixel = getPixelColor(imgData, x ,y);
            setPixelColor(newImgData, y, imgData.width - x -1, Pixel.r, Pixel.g, Pixel.b, Pixel.a);
        }
    }
 	canvas.width = newImgData.width;
	canvas.height = newImgData.height;
    ctx.putImageData(newImgData, 0, 0);
}
//8. Spiegelung
//8.1 horizontale Spiegelung
/*Methode zur horizontalen Spiegelung des Bildes mittels 
    Formel: PixelOben(x/y) -> PixelUnten(x, Höhe - y - 1)
    @var PixelOben - Pixel der oberen Reihen 
    @var PixelUnten - Pixel der oberen Reihen 
    SetPixelColor - Setzen der RGBA Werte eines Pixels 
    GetPixelColor - Zugriff auf RGBA Werte eines Pixels */

function SpiegelungHor() {
	var sourceimage = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imgData = ctx.getImageData(0, 0, w, h);
    for (var x = 0; x < imgData.width / 2; x++) {
        for (var y = 0; y <= imgData.height; y++) {
            var PixelLinks = getPixelColor(imgData, x, y);
            var PixelRechts = getPixelColor(imgData, imgData.width - x - 1, y);
            setPixelColor(imgData, x, y, PixelRechts.r, PixelRechts.g, PixelRechts.b, PixelRechts.a);
            setPixelColor(imgData, imgData.width - x - 1, y, PixelLinks.r, PixelLinks.g, PixelLinks.b, PixelLinks.a);
        }
    }

    ctx.putImageData(imgData, 0, 0);
}
//8.2 vertikale Spiegelung
function SpiegelungVer() {
	var srcImg = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imgData = ctx.getImageData(0, 0, w, h);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height/ 2; y++) {
            var PixelOben = getPixelColor(imgData, x, y);
            var PixelUnten = getPixelColor(imgData, x ,  imgData.height - y - 1);
            setPixelColor(imgData, x, y, PixelUnten.r, PixelUnten.g, PixelUnten.b, PixelUnten.a);
            setPixelColor(imgData, x,  imgData.height - y - 1 , PixelOben.r, PixelOben.g, PixelOben.b, PixelOben.a);
        }
    }

    ctx.putImageData(imgData, 0, 0);
}
//9.Skalierung um den Faktor 2 bzw. 0.5
//9.1 Faktor 2.0
function SkalierungH(){
	var srcImg = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var w = canvas.width;
	var h = canvas.height;
	var ctx = canvas.getContext('2d');
	var data = ctx.getImageData(0, 0, w, h);
	var pix2 = ctx.createImageData(w*2, h*2);
    for (var x = 0; x < data.width; x++) {
        for (var y = 0; y <= data.height; y++) {
            var Pixel = getPixelColor(data, x, y);
            setPixelColor(pix2, x*2, y*2, Pixel.r, Pixel.g, Pixel.b, Pixel.a);
            setPixelColor(pix2, x*2-1, y*2, Pixel.r, Pixel.g, Pixel.b, Pixel.a);
			setPixelColor(pix2, x*2, y*2-1, Pixel.r, Pixel.g, Pixel.b, Pixel.a);
			setPixelColor(pix2, x*2-1, y*2-1, Pixel.r, Pixel.g, Pixel.b, Pixel.a);
			
        }
    }
 	canvas.width = w*2;
	canvas.height = h*2;
    ctx.putImageData(pix2, 0, 0);
}
//9.2 Faktor 0.5
function SkalierungR(){
	var srcImg = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var w = canvas.width;
	var h = canvas.height;
	var ctx = canvas.getContext('2d');
	var data = ctx.getImageData(0, 0, w, h);
	var pix2 = ctx.createImageData(w/2, h/2);
    for (var x = 0; x < data.width; x++) {
        for (var y = 0; y <= data.height; y++) {
            var Pixel = getPixelColor(data, x*2, y*2);
            setPixelColor(pix2, x, y, Pixel.r, Pixel.g, Pixel.b, Pixel.a);
        }
    }
 	canvas.width = w/2;
	canvas.height = h/2;
    ctx.putImageData(pix2, 0, 0);
}
//10.Einfacher Rauschfilters
function Rauschfilter() {
	var sourceimage = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imgData = ctx.getImageData(0, 0, w, h);
	var newImgData = ctx.createImageData(w, h);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			
            var Pixel1 = getPixelColor(imgData, x-1 ,y-1);
			var Pixel2 = getPixelColor(imgData, x ,y-1);
			var Pixel3 = getPixelColor(imgData, x+1 ,y-1);
			var Pixel4 = getPixelColor(imgData, x-1 ,y);
			var Pixel5 = getPixelColor(imgData, x ,y);
			var Pixel6 = getPixelColor(imgData, x+1 ,y);
			var Pixel7 = getPixelColor(imgData, x-1 ,y+1);
			var Pixel8 = getPixelColor(imgData, x ,y+1);
			var Pixel9 = getPixelColor(imgData, x+1 ,y+1);
;
			
			var PivelRAvg = (Pixel1.r + Pixel2.r + Pixel3.r + Pixel4.r +Pixel5.r +Pixel6.r +Pixel7.r +Pixel8.r +Pixel9.r)/9;
			var PivelGAvg = (Pixel1.g + Pixel2.g + Pixel3.g + Pixel4.g +Pixel5.g +Pixel6.g +Pixel7.g +Pixel8.g +Pixel9.g)/9;
			var PivelBAvg = (Pixel1.b + Pixel2.b + Pixel3.b + Pixel4.b +Pixel5.b +Pixel6.b +Pixel7.b +Pixel8.b +Pixel9.b)/9;
			
			setPixelColor(newImgData, x, y, PivelRAvg, PivelGAvg, PivelBAvg, 255);
           
        }
    }
 	canvas.width = newImgData.width;
	canvas.height = newImgData.height;
    ctx.putImageData(newImgData, 0, 0);
}
//11.Gauß-Filter 
//11.1 3x3 Filter
function gaussFilterDreiDrei(){

	var sourceimage = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imgData = ctx.getImageData(0, 0, w, h);
	var newImgData = ctx.createImageData(w,h);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
			
            var Pixel1 = getPixelColor(imgData, x-1 ,y-1);
			var Pixel2 = getPixelColor(imgData, x ,y-1);
			var Pixel3 = getPixelColor(imgData, x+1 ,y-1);
			var Pixel4 = getPixelColor(imgData, x-1 ,y);
			var Pixel5 = getPixelColor(imgData, x ,y);
			var Pixel6 = getPixelColor(imgData, x+1 ,y);
			var Pixel7 = getPixelColor(imgData, x-1 ,y+1);
			var Pixel8 = getPixelColor(imgData, x ,y+1);
			var Pixel9 = getPixelColor(imgData, x+1 ,y+1);
;
			
			var PivelRAvg = (Pixel1.r + (Pixel2.r * 2) + Pixel3.r + (Pixel4.r * 2) + (Pixel5.r * 4) + (Pixel6.r * 2) +Pixel7.r + (Pixel8.r * 2) +Pixel9.r)/16;
			var PivelGAvg = (Pixel1.g + (Pixel2.g * 2) + Pixel3.g + (Pixel4.g * 2) + (Pixel5.g * 4) + (Pixel6.g * 2) +Pixel7.g + (Pixel8.g * 2) +Pixel9.g)/16;
			var PivelBAvg = (Pixel1.b + (Pixel2.b * 2) + Pixel3.b + (Pixel4.b * 2) + (Pixel5.b * 4) + (Pixel6.b * 2) +Pixel7.b + (Pixel8.b * 2) +Pixel9.b)/16;
			
			setPixelColor(newImgData, x, y, PivelRAvg, PivelGAvg, PivelBAvg, 255);
           
        }
    }
 	canvas.width = newImgData.width;
	canvas.height = newImgData.height;
    ctx.putImageData(newImgData, 0, 0);
}
//11.2 5x5 Filter	
function gaussFilterFuenfFuenf(){
	var sourceimage = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imgData = ctx.getImageData(0, 0, w, h);
	var newImgData = ctx.createImageData(w,h);
    for (var x = 0; x < imgData.width; x++) {
        for (var y = 0; y <= imgData.height; y++) {
		
			var Pixel1 = getPixelColor(imgData, x-2 ,y-2);
			var Pixel2 = getPixelColor(imgData, x-1 ,y-2);
			var Pixel3 = getPixelColor(imgData, x ,y-2);
			var Pixel4 = getPixelColor(imgData, x+1 ,y-2);
			var Pixel5 = getPixelColor(imgData, x+2 ,y-2);
			var Pixel6 = getPixelColor(imgData, x-2,y-1);
			var Pixel7 = getPixelColor(imgData, x-1 ,y-1);
			var Pixel8 = getPixelColor(imgData, x ,y-1);
			var Pixel9 = getPixelColor(imgData, x+1 ,y-1);
			var Pixel10 = getPixelColor(imgData, x+2 ,y-1);
			var Pixel11 = getPixelColor(imgData, x-2 ,y);
			var Pixel12 = getPixelColor(imgData, x-1 ,y);
			var Pixel13 = getPixelColor(imgData, x ,y);
			var Pixel14 = getPixelColor(imgData, x+1 ,y);
			var Pixel15 = getPixelColor(imgData, x+2,y);
			var Pixel16 = getPixelColor(imgData, x-2,y+1);
			var Pixel17 = getPixelColor(imgData, x-1 ,y+1);
			var Pixel18 = getPixelColor(imgData, x ,y+1);
			var Pixel19 = getPixelColor(imgData, x+1 ,y+1);
			var Pixel20 = getPixelColor(imgData, x+2 ,y+1);
			var Pixel21 = getPixelColor(imgData, x-2,y+2);
			var Pixel22 = getPixelColor(imgData, x-1 ,y+2);
			var Pixel23 = getPixelColor(imgData, x ,y+2);
			var Pixel24 = getPixelColor(imgData, x+1,y+2);
			var Pixel25 = getPixelColor(imgData, x+2 ,y+2);
;
			
			var PivelRAvg = (Pixel1.r + (Pixel2.r * 4) + (Pixel3.r * 7) + (Pixel4.r * 4) +Pixel5.r +(Pixel6.r *4) + (Pixel7.r*16) +(Pixel8.r*26) +(Pixel9.r*16) + (Pixel10.r*4) + (Pixel11.r*7) + (Pixel12.r*26) + (Pixel13.r * 41) + (Pixel14.r*26) +(Pixel15.r *7) + (Pixel16.r * 4) + (Pixel17.r * 16) +(Pixel18.r * 26) + (Pixel19.r * 16) + (Pixel20.r * 4) + Pixel21.r + (Pixel22.r*4) + (Pixel23.r*7) + (Pixel24.r*4) +Pixel25.r)/273;
			var PivelGAvg = (Pixel1.g + (Pixel2.g * 4) + (Pixel3.g * 7) + (Pixel4.g * 4) +Pixel5.g +(Pixel6.g *4) + (Pixel7.g*16) +(Pixel8.g*26) +(Pixel9.g*16) + (Pixel10.g*4) + (Pixel11.g*7) + (Pixel12.g*26) + (Pixel13.g * 41) + (Pixel14.g*26) +(Pixel15.g *7) + (Pixel16.g * 4) + (Pixel17.g * 16) +(Pixel18.g * 26) + (Pixel19.g * 16) + (Pixel20.g * 4) + Pixel21.g + (Pixel22.g*4) + (Pixel23.g*7) + (Pixel24.g*4) +Pixel25.g)/273;
			var PivelBAvg = (Pixel1.b + (Pixel2.b * 4) + (Pixel3.b * 7) + (Pixel4.b * 4) +Pixel5.b +(Pixel6.b *4) + (Pixel7.b*16) +(Pixel8.b*26) +(Pixel9.b*16) + (Pixel10.b*4) + (Pixel11.b*7) + (Pixel12.b*26) + (Pixel13.b * 41) + (Pixel14.b*26) +(Pixel15.b *7) + (Pixel16.b * 4) + (Pixel17.b * 16) +(Pixel18.b * 26) + (Pixel19.b * 16) + (Pixel20.b * 4) + Pixel21.b + (Pixel22.b*4) + (Pixel23.b*7) + (Pixel24.b*4) +Pixel25.b)/273;
			setPixelColor(newImgData, x, y, PivelRAvg, PivelGAvg, PivelBAvg, 255);
           
        }
    }
 	canvas.width = newImgData.width;
	canvas.height = newImgData.height;
    ctx.putImageData(newImgData, 0, 0);
}
//12. Kantenerkennung 
function Kantenerkennung() {

    let canvas = document.getElementById("myCanvas");
    let srcImg = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    let imgData = ctx.getImageData(0, 0, w, h);
    Grauwertbild();
    for (var x=0; x < imgData.width; x++){
        for (var y=0; y < imgData.height; y++){
            var PixelA = getPixelColor(imgData, x, y);
            var PixelB = getPixelColor(imgData, x+1, y);
            if(((PixelA.r+PixelA.b+PixelA.g)/3)-((PixelB.r+PixelB.b+PixelB.g)/3) > 20){
                setPixelColor(imgData, x, y, 255, 255, 255,PixelA.a);
            } else {
                setPixelColor(imgData, x, y, 0, 0, 0, PixelA.a);
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);

}
//14. Zurücksetzen auf Anfangszustand vor Bearbeitung
function Zuruecksetzen(){
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
}



//15. Farbhistogram
function FarbHistogram(){
	var srcImg = document.getElementById('myCanvas');
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	let newcanvas = document.getElementById("histoCan");
	let ctx2 = newcanvas.getContext("2d");
	ctx2.clearRect(0, 0, newcanvas.width, newcanvas.height);
	var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
	var h = canvas.height;
	function a255(default_value) {
  array = [];
  for (var i=0; i<256; i++) { array[i] = default_value; }
  return array;
}
	var wertR = a255(0);
	var wertG = a255(0);
	var wertB = a255(0);
	for (var x=0; x < imgData.width; x++){
        for (var y=0; y < imgData.height; y++){
			 var Pixel = getPixelColor(imgData, x, y);
			wertR[Pixel.r] += 1;
			wertG[Pixel.g] += 1;
			wertB[Pixel.b] += 1;
		}
	}
	
	function Histogram(max, wert, color, y) {
	ctx2.fillStyle = color;
    for(var i = 0; i<wert.length; i++) {
    var prozent = (wert[i] / max) * 50;
    ctx2.fillRect(i, y, 1, -Math.round(prozent));
  }
}
var rmax = Math.max.apply(null, wertR);
var bmax = Math.max.apply(null, wertB);
var gmax = Math.max.apply(null, wertG);
Histogram(rmax, wertR, "rgb(255,0,0)", 50);
Histogram(gmax, wertB, "rgb(0,255,0)", 100);
Histogram(bmax, wertG, "rgb(0,0,255)", 150);
}
//Bonus Download
//ermöglicht herunterladen des Bildes in verschiedenen Versionen 
function download(){  
	var canvas = document.getElementById( 'myCanvas' );  
    var image = canvas.toDataURL();   
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'image.png';	
    tmpLink.href = image;  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}
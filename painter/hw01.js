var canvas = document.getElementById('art');
var ctx = canvas.getContext('2d');

var flag=0;
var sha=0;
var dra=0;
function draw(input){
    if (sha==1){
        canvas.removeEventListener('mousedown', rectMouseDown, false);
        canvas.removeEventListener('mousemove', rectMouseMove, false);
        canvas.removeEventListener('mouseout', rectMouseout, false);
        canvas.removeEventListener('mouseup', rectMouseUp, false);
        sha=0;
    }
    if (input==='p'){
        console.log("pen")
        canvas.style.cursor = "url('pen2.png'), auto";
        ctx.strokeStyle = 'black';
        flag=1;
    }

    if (input==='e'){
        flag=0;
        canvas.style.cursor = "url('eraser.png'), auto";
        ctx.strokeStyle = 'white';
    }

    if (dra==0){
        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('mouseup', mouseUp);
        dra=1;
    }
      
}

function mouseUp() {
    canvas.removeEventListener('mousemove', mouseMove, false);
    cPush();
}

function mouseDown(evt) {
    var mousePos = getMousePos(canvas, evt);
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    evt.preventDefault();
    canvas.addEventListener('mousemove', mouseMove, false);
}


function mouseMove(evt) {
    var mousePos = getMousePos(canvas, evt);
    ctx.lineTo(mousePos.x, mousePos.y);
    if ((flag==1) || (flag==0)) ctx.stroke();
}


function ini(){
    ctx.fillStyle="white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cPush();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    if (flag===1){
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
          };
    }
    else {
        return {
            x: evt.clientX - rect.left +10,
            y: evt.clientY - rect.top
        };
  }
}

function chooseColor (input){
    if (flag!=0){
        ctx.strokeStyle = input;
    }
}

function WidthSize(input){
    ctx.lineWidth=input;
}

function clearAll(input){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    flag=0;
    sha=0;
    dra=0;
    Step=-1;
    ini();
}


var PushArray = new Array();
var Step = -1;
var canvasPic = new Image();
	
function cPush() {
    console.log("push");
    Step++;
    if (Step < PushArray.length) { PushArray.length = Step; }
    PushArray.push(document.getElementById('art').toDataURL());
}

function Undo() {
    if (Step > 0) {
        Step--;
        //var canvasPic = new Image();
        canvasPic.src = PushArray[Step];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

function Redo() {
    if (Step < PushArray.length-1) {
        Step++;
        canvasPic.src = PushArray[Step];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

var imageLoader = document.getElementById('imageLoad');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
            cPush(); 
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function download_img(im) {
    var image = canvas.toDataURL("image/jpg");
    im.href = image;
};

var ss=30;
var tt="Arial";

function FontSize(val) {
    ss=val;
}

function FontType(op) {
    if (op=="one") tt="Arial";
    else if (op=="two") tt="Courier New";
    else if (op=="three") tt="Cursive";
    else if (op=="four") tt="Fantasy";
    else if (op=="five") tt="Monospace";
    
};

var mouse_x=0;
var mouse_y=0;
canvas.addEventListener("click", function(e){
    var rect = canvas.getBoundingClientRect();
    mouse_x=e.clientX - rect.left,
    mouse_y=e.clientY - rect.top
}, false);

function TextIn(input){
    ctx.fillStyle="black";
    ctx.font=ss+"px "+tt;
    ctx.fillText(document.getElementById(input).value, mouse_x, mouse_y);
    console.log("sdfghjk");
    cPush();
}

function shape(input) {
    flag=input;
    var mouse = {x: 0, y: 0};
    rectMouseMove = function(evt) {
        var mousePos = getMousePos(canvas, evt);
	    mouse.w = mousePos.x - mouse.x - 10;
        mouse.h = mousePos.y - mouse.y;
	};

	rectMouseDown = function(evt) {
        var mousePos = getMousePos(canvas, evt);
		ctx.beginPath();
		mouse.x = mousePos.x - 10;
		mouse.y = mousePos.y;
        canvas.addEventListener('mousemove', Draw, false);
	};

	rectMouseUp = function() {
        canvas.removeEventListener('mousemove', Draw, false);
        cPush();
	};

	rectMouseout = function() {
		canvas.removeEventListener('mousemove', Draw, false);
    };
    if (dra==1){
        canvas.removeEventListener('mousedown', mouseDown, false);
        canvas.removeEventListener('mouseup', mouseUp, false);
        dra=0;
    }
    if (sha==0){
        canvas.addEventListener('mousedown', rectMouseDown, false);
        canvas.addEventListener('mouseup', rectMouseUp, false);
        canvas.addEventListener('mousemove', rectMouseMove, false);
        canvas.addEventListener('mouseout', rectMouseout, false);
        sha=1;
    }
    
    canvas.style.cursor = "url('pen2.png'), auto";
    if (ctx.strokeStyle = "white") ctx.strokeStyle = "black";
	

	var Draw = function() {
        canvasPic.src = PushArray[Step];
        canvasPic.onload = function () {
            ctx.drawImage(canvasPic, 0, 0);
        }
        ctx.fillStyle = "black";
        if (flag==2){
            ctx.beginPath();
            ctx.rect(mouse.x, mouse.y, mouse.w, mouse.h);
            setTimeout(()=>{ctx.stroke();} , 5);
            ctx.closePath();
        }
        else if (flag==3){
            ctx.beginPath();
            ctx.moveTo(mouse.x,mouse.y);
		    ctx.lineTo(mouse.x-mouse.w, mouse.y+mouse.h);
            ctx.lineTo(mouse.x+mouse.w, mouse.y+mouse.h);
            setTimeout(()=>{ctx.stroke();} , 5);
            ctx.closePath();
        }
        else if (flag==4){
            ctx.beginPath();
            var a=Math.pow(mouse.w, 2);
            var b=Math.pow(mouse.h, 2);
            var r=Math.pow(a+b, 1/2);
            ctx.arc(mouse.x, mouse.y, r, 0, 2 * Math.PI);
            setTimeout(()=>{ctx.stroke();} , 3);
            ctx.closePath();
        }
    };
    
	
};
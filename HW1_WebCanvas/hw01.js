var canvas = document.getElementById('art');
var ctx = canvas.getContext('2d');

var flag=0;
var dra=0;
function draw(input){
    console.log(input);
    if (dra==0){
        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('mouseup', mouseUp);
        canvas.addEventListener('mouseout', mouseOut);
        dra=1;
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

    if (input=='tri'){
        flag=2;
        canvas.style.cursor = "url('pen2.png'), auto";
        ctx.strokeStyle = 'black';
    }

    if (input=='rec' ){
        flag=3;
        canvas.style.cursor = "url('pen2.png'), auto";
        ctx.strokeStyle = 'black';
    }

    if (input=='cir'){
        flag=4;
        canvas.style.cursor = "url('pen2.png'), auto";
        ctx.strokeStyle = 'black';
    }

    function mouseUp() {
        canvas.removeEventListener('mousemove', mouseMove, false);
        cPush();
    }
    var mouse = {x: 0, y: 0};
    function mouseDown(evt) {
        if ((flag==1) || (flag==0)){
            var mousePos = getMousePos(canvas, evt);
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            evt.preventDefault();
            canvas.addEventListener('mousemove', mouseMove, false);
        }
        else {
            var mousePos = getMousePos(canvas, evt);
            ctx.moveTo(mouse.x,mouse.y);
		    mouse.x = mousePos.x - 10;
		    mouse.y = mousePos.y;
            canvas.addEventListener('mousemove', mouseMove, false);
        }
    }
    
    function mouseMove(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouse.w = mousePos.x - mouse.x - 10;
        mouse.h = mousePos.y - mouse.y;
        if (flag==0 || flag==1){
            ctx.lineTo(mousePos.x, mousePos.y);
            if ((flag==1) || (flag==0)) ctx.stroke();
        }
        else {
            canvasPic.src = PushArray[Step];
            canvasPic.onload = function () {
                ctx.drawImage(canvasPic, 0, 0);
            }
            ctx.fillStyle = "black";
            if (flag==2){
                console.log("tritritri")
                ctx.beginPath();
                ctx.moveTo(mouse.x,mouse.y);
		        ctx.lineTo(mouse.x-mouse.w, mouse.y+mouse.h);
                ctx.lineTo(mouse.x+mouse.w, mouse.y+mouse.h);
                setTimeout(()=>{ctx.stroke();} , 5);
                ctx.closePath();
            }
        
            else if (flag==3){
                console.log("recrecrec")
                ctx.beginPath();
                ctx.rect(mouse.x, mouse.y, mouse.w, mouse.h);
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

        }
    }
    
    function mouseOut(evt) {
        canvas.removeEventListener('mousemove', mouseMove, false);
    }
      
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
    flag=0;
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
    cPush();
}

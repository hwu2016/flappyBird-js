//get canvas 2d context
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

//get start and end scene
let start = document.getElementById('start')
let end = document.getElementById('end')
let restart = document.getElementById('restart')

//load images
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//load sounds
let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

//define global variables and consts
const gap = 85
let cst
let bX = 10
let bY = 150
let gravity = 0

let score = 0
let reqID = null
let flag = true

//event on key down
document.addEventListener('keydown', moveUp)

function moveUp(){
    bY -= 25
    if(fly.currentTime){
        fly.currentTime = 0
    }
    fly.play()
    gravity= 0
}


//pipes
let pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}


//define easy mode
function draw_easy(){

    reqID = requestAnimationFrame(draw_easy);
    ctx.drawImage(bg,0,0)  
    
    for (let i = 0; i < pipe.length; i++){
        cst = pipeNorth.height + gap
        ctx.drawImage(pipeNorth, pipe[i].x , pipe[i].y)
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + cst)
        pipe[i].x--
        if(pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }
        //detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + cst) || bY + bird.height >= canvas.height - fg.height){
            cancelAnimationFrame(reqID)
            document.removeEventListener('keydown',moveUp)
            showRes()
        }
        //add score
        if(pipe[i].x == 5){
            score++
            scor.play()
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height)

    ctx.drawImage(bird, bX, bY)

    let gravity_curr = gravity;
    bY += gravity_curr 
    gravity += 0.05

    ctx.fillstyle = '#000'
    ctx.font = '20px Verdana'
    ctx.fillText('Score:'+ score, 100, 450)
}

//define hard mode
function draw_hard(){

    reqID = requestAnimationFrame(draw_hard);
    ctx.drawImage(bg,0,0)  
    
    for (let i = 0; i < pipe.length; i++){
        cst = pipeNorth.height + gap
        ctx.drawImage(pipeNorth, pipe[i].x , pipe[i].y)
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + cst)
        pipe[i].x = pipe[i].x - 2
        if(pipe[i].x == 110) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }
        //detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + cst) || bY + bird.height >= canvas.height - fg.height){
            cancelAnimationFrame(reqID)
            document.removeEventListener('keydown',moveUp)
            showRes()
        }
        //add score
        if(pipe[i].x == 0){
            score++
            scor.play()
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height)

    ctx.drawImage(bird, bX, bY)

    let gravity_curr = gravity;
    bY += gravity_curr 
    gravity += 0.1

    ctx.fillstyle = '#000'
    ctx.font = '20px Verdana'
    ctx.fillText('Score:'+ score, 100, 450)
}

//difficulty selection
easy.addEventListener('click', () => {
    draw_easy()
    start.style.display = 'none'
})
hard.addEventListener('click', () => {
    draw_hard()
    start.style.display = 'none'
})

//end scene
function showRes(){
    end.style.display = 'block'
}

//bind event to restart button
restart.addEventListener('click', () => {
    location.reload()
})


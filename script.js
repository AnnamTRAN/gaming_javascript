const score = document.getElementById("score")
const stopwatch = document.getElementById("stopwatch")
const QTE = document.getElementById("QTE")
const limit = document.getElementById("limit")
const start = document.getElementById("start")
const restart = document.getElementById("restart")
const notice = document.querySelectorAll(".notice")
const gif = document.getElementById("gif")
const stop = document.getElementById("stop")

const songname = document.getElementById("songname")
const playlist = Array("music/lethal.mp3","music/sonic.mp3","music/pokemon.mp3","music/sneakman.mp3")
const randomSong = playlist[Math.floor(Math.random()* playlist.length)]
const typing = new Audio("sound_effect/typing.mp3")
let music = new Audio(randomSong)
let x = 0
let time = 60

/* game */
const game = (event) =>{
    let keyvalue = event.key
    let txt = QTE.innerHTML
    const letters = "abcdefghijklmnopqrstuvwxyz"
    const randomChara = letters[Math.floor(Math.random() * letters.length)]
    const divWidth = limit.clientWidth
    const divHeight = limit.clientHeight

    /* condition if key = letter of paragraph */
    if (keyvalue === txt){
        console.log('good')
        typing.play()
        x++
        QTE.innerHTML = randomChara

        /* spelling point*/
        if (x < 2){
            score.innerHTML = `${x} point`
        }
        else{
            score.innerHTML = `${x} points`
        }
        /* random position */
        QTE.style.left = Math.round(Math.random() * divWidth) + 'px'
        QTE.style.top = Math.round(Math.random() * divHeight) + 'px'
    }

    else{
        console.log('bad')
        stopwatch.style.display = "none"
        limit.style.display = "none"
        restart.style.display = "block"
        score.style.fontSize = "50px"
        score.classList.add("colorstyle")
        document.body.onkeydown = null

        music.pause()
        music = new Audio("music/marvins.mp3")
        music.volume = 0.5
        music.play()
        songname.innerHTML = "Playing: Drake - Marvins Room"
        music.loop = true
        gif.setAttribute("src","gif/rat.gif")
        gif.setAttribute("alt","rat_eating_loser")
        gif.style.display = "block"
        time = 300
    }
}

/* start */
const timer = () =>{
    document.body.onkeydown = game
    score.innerHTML = `${x} point`
    /* countdown */
    const timer = setInterval(
        function(){
            if (time < 0){
                clearInterval(timer)
                limit.style.display = "none"
                stopwatch.style.display = "none"
                restart.style.display = "block"
                score.style.fontSize = "50px"
                score.classList.add("colorstyle")
                gif.setAttribute("src","gif/ratwin.gif")
                gif.setAttribute("alt","rat_dancing_winner")
                gif.style.display = "block"

                music.pause()
                music = new Audio("music/friday.mp3")
                music.volume = 0.1
                music.play()
                songname.innerHTML = "Playing: SEGA - Friday Night"
                music.loop = true
                document.body.onkeydown = null
            }
            else{
                stopwatch.innerHTML = 'time left: ' + time
                time--
            }
        }, 1000
        )
        
    score.style.display = "block"
    limit.style.display = "block"
    stopwatch.style.display = "block"
    start.style.display = "none"
    notice.forEach(p => p.style.display ="none")
    songname.classList.add("colorstyle")
    music.play()
    music.volume = 0.5

    if (randomSong === playlist[0]){
        songname.innerHTML = "Playing: Hideki Naganuma - AIN'T NOTHIN' LIKE A FUNKY BEAT"
    }
    else if (randomSong === playlist[1]){
        songname.innerHTML = "Playing: Boss: Big Arm - Sonic Generations"   
    }
    else if (randomSong === playlist[2]){
        songname.innerHTML = "Playing: Pokemon Black & White - Elite Four Battle Music"   
    }
    else{
        songname.innerHTML = "Playing: Hideki Naganuma - Sneakman"       
    }
}


/* music on or off */
stop.addEventListener("click", (event) => {
    if (music.volume === 0.5){ 
        music.volume = 0
        stop.style.background = "-webkit-linear-gradient(#403A3E, #BE5869)"
        stop.style.webkitBackgroundClip = "text"
        stop.style.backgroundClip = "text"
        stop.style.webkitTextFillColor =  "transparent"

    }
    else{
        music.volume = 0.5
        stop.style.background = "-webkit-linear-gradient(#eaff00, #068ab7)"
        stop.style.webkitBackgroundClip = "text"
        stop.style.backgroundClip = "text"
        stop.style.webkitTextFillColor =  "transparent"
    }
  }
)

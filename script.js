function main(event){
    var inputedLetter = document.getElementById("input").value.toLowerCase()
    if (event.key == "Enter" && inputedLetter != "" && gameOver == false){
        if (wordToGuess.includes(inputedLetter)){
                var indexesToChange = []
            for (counter = 0; counter < wordToGuess.length; counter ++){
                if (wordToGuess[counter] == inputedLetter){
                    indexesToChange.push(counter)
                }
            }
            var oldletters = document.getElementById("word").innerHTML.split("")
            for (counter = 0; counter < indexesToChange.length; counter ++){
                oldletters[indexesToChange[counter]*2] = inputedLetter
            }
            document.getElementById("word").innerHTML = oldletters.join("")
            if (oldletters.includes("_") == false){
                gameOver = true
                document.getElementById("word").style.color = "green"
                document.getElementById("reload").style.display = "unset"
            }
        } else {
            document.getElementById("wrongLetters").innerHTML += inputedLetter + " "
            wrongGuesses ++
            ctx.beginPath()
            if (hangmanDrawing[wrongGuesses][0] != "circle"){
                ctx.moveTo(hangmanDrawing[wrongGuesses][0]*canvasScale, hangmanDrawing[wrongGuesses][1]*canvasScale)
                ctx.lineTo(hangmanDrawing[wrongGuesses][2]*canvasScale,hangmanDrawing[wrongGuesses][3]*canvasScale)
            } else {
                ctx.arc(hangmanDrawing[wrongGuesses][1]*canvasScale,hangmanDrawing[wrongGuesses][2]*canvasScale,hangmanDrawing[wrongGuesses][3]*canvasScale,0,2*Math.PI)
            }
            ctx.stroke()
            if(wrongGuesses == 10){
                gameOver = true
                document.getElementById("word").innerHTML = wordToGuess.join(" ")
                document.getElementById("word").style.color = "red"
                document.getElementById("reload").style.display = "unset"
            }
        }
        document.getElementById("input").value = ""
    }
}
function init(){
    enter = false
    document.getElementById("hangmanCanvas").width = window.innerWidth/3
    document.getElementById("hangmanCanvas").height = window.innerWidth/3
    document.getElementById("input").addEventListener("keydown", function(event){main(event)})
    ctx = document.getElementById("hangmanCanvas").getContext("2d")
    canvasScale = document.getElementById("hangmanCanvas").width/100
    hangmanDrawing = [[5,95,30,95],[17,95,17,20],[17,20,83,20],[17,30,37,20],[83,20,83,30],['circle',83,40,10], [83,50,83,80], [83,50,73,60], [83,50,93,60], [83,80,73,95], [83,80,93,95]]
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        wordToGuess = xhttp.responseText
        wordToGuess = wordToGuess.split("\n")
        wordToGuess = wordToGuess[Math.floor(Math.random()*wordToGuess.length)]
        wordToGuess = wordToGuess.toLowerCase()
        wordToGuess = wordToGuess.split("")
        wordToGuess = wordToGuess.pop()
        wrongGuesses = -1
        gameOver = false
        for (counter = wordToGuess.length; counter > 0; counter -= 1){
            document.getElementById("word").innerHTML += "_ "
        }
        }
    }
    xhttp.open("GET", "nouns.csv", true);
    xhttp.send();


}
function replay(){
    location.reload()
}

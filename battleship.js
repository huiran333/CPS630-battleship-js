
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('battleshipCanvas');
    const myCanvas = document.getElementById('myBattleshipCanvas');
    const ctx = canvas.getContext('2d');
    const mctx = myCanvas.getContext('2d');
    const gridSize = 10;
    const cellSize = canvas.width / gridSize;
    const btnStart = document.getElementById('btnStart');
    let ships = [];
    let hits = [];
    let drownship = 0;
    let myShips = [];

    function getRndInteger(min, max) 
    {
        return Math.floor(Math.random() * (max - min) ) + min;
    }


    function randomShips()
    {        
        for (let i = 0; i < 5; i++)
        {
            let num1 = getRndInteger(0,9);
            let num2 = getRndInteger(0,9);
            let temp = [];
            temp[0] = num1;
            temp[1] = num2;
            console.log(temp);
            if (!ships.includes(temp))
            {
                ships[ships.length] = temp;
            }
            else
            {
                i--;
            }
        }
        console.log(ships);
    }

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }

        mctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                mctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    function handleCanvasClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const gridX = Math.floor(x / cellSize);
        const gridY = Math.floor(y / cellSize);

        if (!hits.some(hit => hit[0] === gridX && hit[1] === gridY)) {
            if (ships.some(ship => ship[0] === gridX && ship[1] === gridY)) {
                ctx.fillStyle = 'red';
                ctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                hits.push([gridX, gridY]);
                drawnship+=1;
                if(drownship == 5)
                {
                    initGame();
                }
            } else {
                ctx.fillStyle = 'blue';
                ctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                hits.push([gridX, gridY]);
            }
        }
    }

    function removeship(i1,i2)
    {
        const index = myShips.findIndex(ship => ship[0] === i1 && ship[1] === i2);
        if (index > -1) 
        { 
            myShips.splice(index, 1); 
        }
    }

    function placeShip(event)
    {
        const rect = myCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const gridX = Math.floor(x / cellSize);
        const gridY = Math.floor(y / cellSize);     

        if (!myShips.some(myship => myship[0] === gridX && myship[1] === gridY))//false = no ship
        {
            console.log("empty");
            if (myShips.length < 5)
            {
                mctx.fillStyle = 'green';
                mctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                 myShips.push([gridX,gridY]);
            }            
        }
        else//There is ship
        {
            console.log("ship");
            removeship(gridX,gridY);
            mctx.clearRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize)            
            
        }

        if (myShips.length == 5)
        {
            document.getElementById("btnStart").disabled = false;
        }
        else
        {
            document.getElementById("btnStart").disabled = true
        }
       console.log(myShips);
    }

    function initGame() {
        document.getElementById("btnStart").disabled = true
        drawBoard();        
        randomShips();
        canvas.addEventListener('click', handleCanvasClick);
        myCanvas.addEventListener('click', placeShip);
    }

    initGame();
});

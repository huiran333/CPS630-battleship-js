
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('battleshipCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 10;
    const cellSize = canvas.width / gridSize;
    let ships = []; // Ship placement
    let hits = [];


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
            } else {
                ctx.fillStyle = 'blue';
                ctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                hits.push([gridX, gridY]);
            }
        }
    }

    function initGame() {
        drawBoard();
        randomShips();
        canvas.addEventListener('click', handleCanvasClick);
    }

    initGame();
});

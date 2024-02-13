
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('battleshipCanvas');
    const myCanvas = document.getElementById('myBattleshipCanvas');
    const ship1 = document.getElementById("ship");
    const dropCanvas = document.getElementById("shipCanvas");
    let txthit = document.getElementById('myhits');
    let txtmiss = document.getElementById('mymiss');
    const ctx = canvas.getContext('2d');
    const mctx = myCanvas.getContext('2d');
    const gridSize = 10;
    const cellSize = canvas.width / gridSize;
    let ships = [];
    let hits = [];
    let drownship = 0;
    let missed = 0;
    let myShips = [];
    let myDrownShips = 0;
    let myTurn = false;

    ship1.addEventListener('dragstart', function(event){        
    })

    dropCanvas.addEventListener('dragover',function(event){
        event.preventDefault()        
    })

    dropCanvas.addEventListener('drop',function(event){
        const rect = myCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const gridX = Math.floor(x / cellSize);
        const gridY = Math.floor(y / cellSize);     
        if (!myShips.some(myship => myship[0] === gridX && myship[1] === gridY))//false = no ship
        {            
            if (myShips.length < 5)
            {
                mctx.fillStyle = 'PaleGreen';
                mctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                myShips.push([gridX,gridY]);
            }            
        }       

        if (myShips.length == 5)
        {
            document.getElementById("btnStart").disabled = false;
        }
        else
        {
            document.getElementById("btnStart").disabled = true
        }

    })

    function getRndInteger(min, max) 
    {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
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

        mctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                mctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    function enemyTurn()
    {
        let gridX = getRndInteger(0,10);
        let gridY = getRndInteger(0,10);     
        var gridColor = mctx.getImageData(gridX * cellSize, gridY * cellSize, cellSize, cellSize).data;
        console.log("color:" + gridColor[1]);
        if (gridColor[1] == 251)//green
        {
            mctx.fillStyle = 'Crimson';
            myDrownShips += 1;
            mctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
            myTurn = true;   
            console.log("bomed:" + gridX + "," + gridY); 
        }
        else if(gridColor[1] == 191 || gridColor[1] == 20)//blue or red
        {
            console.log("try again");
            enemyTurn();
        }        
        else
        {
            mctx.fillStyle = 'DeepSkyBlue';
            mctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
            myTurn = true;    
            console.log("bomed missed:" + gridX + "," + gridY);    
        }

        if (myDrownShips == 5)
        {
            setTimeout(loseFunc,500);
        }
        
    }

    function handleCanvasClick(event) {
        if(myTurn)
        {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const gridX = Math.floor(x / cellSize);
            const gridY = Math.floor(y / cellSize);

            if (!hits.some(hit => hit[0] === gridX && hit[1] === gridY)) {
                if (ships.some(ship => ship[0] === gridX && ship[1] === gridY)) {
                    ctx.fillStyle = 'Crimson';
                    ctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                    hits.push([gridX, gridY]);
                    drownship+=1;
                    txthit.textContent = "Hits: " + drownship.toString() + "/5";
                    
                } else {
                    missed += 1;
                    ctx.fillStyle = 'DeepSkyBlue';
                    txtmiss.textContent = "Missed: " + missed;
                    ctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                    hits.push([gridX, gridY]);
                }

                if(drownship == 5)
                {
                    setTimeout(winFunc,500);
                    
                }
                myTurn = false;
                setTimeout(enemyTurn,1);
                
            }
            else
            {
                window.alert("You already bombed here!");
            }
            
        }        
    }

    function winFunc()
    {
        myTurn = false;
        window.alert("You win!");
        initGame();
    }

    function loseFunc()
    {
        myTurn = false;
        window.alert("You lose.");
        initGame();
    }
    function removeship(i1,i2)
    {
        const index = myShips.findIndex(ship => ship[0] === i1 && ship[1] === i2);
        if (index > -1) 
        { 
            myShips.splice(index, 1); 
        }
    }

    function btnStartEvent()
    {
        myTurn = true;
        document.getElementById("btnStart").disabled = true
    }

    function initGame() {        
        ships = [];
        hits = [];
        drownship = 0;
        missed = 0;
        myShips = [];
        myDrownShips = 0;
        myTurn = false;

        document.getElementById("btnNew").addEventListener('click',initGame);
        document.getElementById("btnStart").disabled = true
        document.getElementById("btnStart").addEventListener('click',btnStartEvent);
        drawBoard();        
        randomShips();
        canvas.addEventListener('click', handleCanvasClick);
        txthit.textContent = "Hits: 0/5";
        txtmiss.textContent = "Missed: 0";
    }

    initGame();
});

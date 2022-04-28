// Main
arr = ['a', 'b', 'c', 'd'];
each = [];
visited = new Set();
for(let i=0; i<arr.length; i++) visited.add(i);
val = [1000, 1000, 1000, 1000, 1000];
size = arr.length;
edge = [];
dimension = 30;
rel = 15;
ctx = document.querySelector("canvas").getContext("2d");
time_delay = 2000;
dx = ctx.canvas.width / size;
dy = ctx.canvas.height / size;
create_edges();
create_graph();
init();

// Utility

function init() {
    document.querySelector(".dijstras").addEventListener("click", () => {
        dijstras(0);
    })

    

    document.querySelector(".graph").addEventListener("click", () => {
        create_graph();
    })
}

function findMin() {
    let pos = 0;
    count = 0;
    visited.forEach((e, i) => {
        if(count == 0) pos = e;
        else {
            if(val[e] < val[pos]) pos = e;
        }
        count ++;
    })

    visited.delete(pos)
    return pos;
}


async function dijstras(i) {
    val[i] = 0;
    await sleep(time_delay).then(() => {
        for(let i=0; i<size; i++) {
            createRect(i);
        }
    })
    while(visited.size != 0) {
        x = findMin();
        for(let j=0; j<size; j++) {
            if(+edge[x][j] > 0 && visited.has(j)){
                if(val[x] + edge[x][j] < val[j]) {
                    val[j] = val[x] + edge[x][j];
                    await sleep(time_delay).then(() => {
                        for(let i=0; i<size; i++) {
                            createRect(i);
                        }
                    })
                }
            }
        }
    }


}

function createRect(i) {
    width = 80;
    height = 50;
    start = 300;
    ctx.fillStyle = "black";
    ctx.fillRect(start + i * width + 10*i, ctx.canvas.height - height - 4, width, height);
    ctx.fillStyle = "white";
    ctx.font = "bolder 18px sans-serif";
    weight = val[i];
    if(+weight == 1000) weight = "Inf";
    ctx.fillText(weight, start + i * width + 10*i + width / 2 - 10, ctx.canvas.height - height + height / 2 + 4);
}	


function create_edges() {
    count = 0;
    limit = 7;
    for(let i=0; i<size; i++) {
        let temp = [];
        for(let i=0; i<size; i++) {
            temp.push(0);
        }
        edge.push(temp);
    }

    for(let i = 0; i< size; i++) {
        each.push(Math.floor(Math.random() * (size - 1)) + 1)
    }

    for(let i=0; i< size; i++) {
        if(count >= limit) break;
        for(let j=i + 1; j< size; j++) {
            if(count >= limit) break;
            let p = Math.floor(Math.random() * 2 );
            if(p == 1) {
                edge[i][j] = Math.floor(Math.random() * (100 - 1) +  1);
                edge[j][i] = edge[i][j]
                count ++;
            } else {
                edge[i][j] = 0;
                edge[j][i] = 0;
            }
            
        }	
    }
}

function createLine(i, j, color="black") {
    ctx.strokeStyle = color;
    cor = []
    let x = each[i] * dx + dimension / 2 + rel;
    let y = i * dy + dimension / 2 + rel;
    ctx.beginPath();
    ctx.moveTo(x, y);
    cor.push([x, y]);
    ctx.lineWidth = 4;
    x = each[j] * dx + dimension / 2 + rel;
    y = j * dy + dimension / 2 + rel;
    ctx.lineTo(x, y);
    cor.push([x, y]);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.font = "bolder 25px ubuntu";
    ctx.fillText(edge[i][j], (cor[0][0] + cor[1][0]) / 2, (cor[0][1] + cor[1][1]) / 2 - 4);
}

function createBox(i, color="red") {
    ctx.fillStyle = color
    ctx.moveTo(each[i] * dx, i* dy);
    let x = each[i] * dx + (dimension / 2) + rel;
    let y = i * dy + dimension / 2 + rel;
    ctx.arc(x , y , dimension ,0 , Math.PI * 2);
    ctx.fill();
}

function createText(i, color="white") {
    ctx.moveTo(each[i] * dx, i* dy);
    let x = each[i] * dx + (dimension / 2) + rel;
    let y = i * dy + dimension / 2 + rel;
    ctx.fillStyle = 'white';
    ctx.font = 'bolder 25px ubuntu'
    ctx.moveTo(each[i] * dx, i* dy);	
    ctx.fillText(arr[i],x - 4, y + 4);
}

async function create_graph() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for(let i=0; i< size; i++) {
        for(let j=i; j< size; j++) {
            if(+edge[i][j] >= 1) {
                createLine(i, j)
            }
        }	
    }
    for(let i=0; i< size; i++) {
        createBox(i, "red");
    }

    for(let i=0; i< size; i++) {
        createText(i, "white");
    }
    ctx.fillStyle = "lightgreen"
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
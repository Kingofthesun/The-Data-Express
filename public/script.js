// This script is used to make the bar graph.

const canvas = document.getElementById('graph');
const graph = canvas.getContext('2d');

// graph.strokeStyle = '#fff';
// graph.strokeRect(0, 0, 600, 400); this was used to see where the graph was

canvas.width=600;
canvas.height=400;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // The "data" variable has the data from the API. I've filled
        // in your variables with it here:
        const dogNum = data[0][0];
        const catNum = data[0][1];
        const dogCatNum = data[0][2];
        const neitherDogCatNum = data[0][3];
        
        const moviesNum = data[1][0];
        const gamingNum = data[1][1];
        const readingNum = data[1][2];
        const sportsNum = data[1][3];
        const otherNum = data[1][4];
        
        const fraculatorNum = data[2][0];
        const weatherNum = data[2][1];
        const thisAssignmentNum = data[2][2];
        const otherAssignmentNum = data[2][3];

        // All the code for making the graph needs to go in here.
        
    });


//these are currently fake numbers for testing purposes based on a total of 585 users

const dogGraph = (dogNum*100)/(dogNum+catNum+dogCatNum+neitherDogCatNum)
const catGraph = (catNum*100)/(dogNum+catNum+dogCatNum+neitherDogCatNum)
const dogCatGraph = (dogCatNum*100)/(dogNum+catNum+dogCatNum+neitherDogCatNum)
const neitherDogCatGraph = (neitherDogCatNum*100)/(dogNum+catNum+dogCatNum+neitherDogCatNum)


graph.fillStyle = '#222299';
graph.fillRect (0, (300-dogGraph*3), 40, dogGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Dog', 10, 320);


graph.fillStyle = '#BB2222';
graph.fillRect (40, (300-catGraph*3), 40, catGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Cat', 50, 320);


graph.fillStyle = '#6F225E';
graph.fillRect (80, (300-dogCatGraph*3), 40, dogCatGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Both', 85, 320);


graph.fillStyle = '#844400';
graph.fillRect (120, (300-neitherDogCatGraph*3), 40, neitherDogCatGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Neither', 120, 320);





graph.fillStyle = '#1eb4a6';
graph.font = '24px Arial';
graph.fillText('Favorite Pet?', 20, 380);






const movieGraph = (moviesNum*100)/(moviesNum+gamingNum+readingNum+sportsNum+otherNum)
const gamingGraph = (gamingNum*100)/(moviesNum+gamingNum+readingNum+sportsNum+otherNum)
const readingGraph = (readingNum*100)/(moviesNum+gamingNum+readingNum+sportsNum+otherNum)
const sportsGraph = (sportsNum*100)/(moviesNum+gamingNum+readingNum+sportsNum+otherNum)
const otherGraph = (otherNum*100)/(moviesNum+gamingNum+readingNum+sportsNum+otherNum)


graph.fillStyle = '#9F8170';
graph.fillRect (200, (300-movieGraph*3), 40, movieGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Movies', 199, 320);


graph.fillStyle = '#4682B4';
graph.fillRect (240, (300-gamingGraph*3), 40, gamingGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Gaming', 235, 340);


graph.fillStyle = '#E8F48C';
graph.fillRect (280, (300-readingGraph*3), 40, readingGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Reading', 277, 320);


graph.fillStyle = '#228B22';
graph.fillRect (320, (300-sportsGraph*3), 40, sportsGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Sports', 325, 340);


graph.fillStyle = '#844400';
graph.fillRect (360, (300-otherGraph*3), 40, otherGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Other', 365, 320);


graph.fillStyle = '#1eb4a6';
graph.font = '24px Arial';
graph.fillText('Favorite Activity?', 210, 380);








const fraculatorGraph = (fraculatorNum*100)/(fraculatorNum+weatherNum+thisAssignmentNum+otherAssignmentNum)
const weatherGraph = (weatherNum*100)/(fraculatorNum+weatherNum+thisAssignmentNum+otherAssignmentNum)
const thisAssignmentGraph = (thisAssignmentNum*100)/(fraculatorNum+weatherNum+thisAssignmentNum+otherAssignmentNum)
const otherAssignmentGraph = (otherAssignmentNum*100)/(fraculatorNum+weatherNum+thisAssignmentNum+otherAssignmentNum)


graph.fillStyle = '#AAA9AD';
graph.fillRect (440, (300-fraculatorGraph*3), 40, fraculatorGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Fraculator', 435, 320);


graph.fillStyle = '#87CEEB';
graph.fillRect (480, (300-weatherGraph*3), 40, weatherGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Weather API', 465, 340);


graph.fillStyle = '#ff9f1c';
graph.fillRect (520, (300-thisAssignmentGraph*3), 40, thisAssignmentGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('This One', 515, 320);

graph.fillStyle = '#844400';
graph.fillRect (560, (300-otherAssignmentGraph*3), 40, otherAssignmentGraph*3);

graph.fillStyle = '#1eb4a6';
graph.font = '14px Arial';
graph.fillText('Other', 565, 340);


graph.fillStyle = '#1eb4a6';
graph.font = '24px Arial';
graph.fillText('Hardest', 470, 365);
graph.fillText('Assignment?', 445, 385);
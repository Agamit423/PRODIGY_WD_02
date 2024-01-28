let startTime;
let stopwatch;
let laps = [];
let isRunning = false;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1].duration : 0);
        stopwatch = setInterval(updateDisplay, 10);
        document.getElementById('startBtn').textContent = 'Pause';
    } else {
        isRunning = false;
        clearInterval(stopwatch);
        document.getElementById('startBtn').textContent = 'Resume';
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(stopwatch);
    document.getElementById('display').textContent = '00:00:00.000';
    document.getElementById('startBtn').textContent = 'Start';
    laps = [];
    updateLaps();
}

function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push({ lap: laps.length + 1, duration: lapTime });
        updateLaps();
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = time % 1000;

    return (
        padNumber(minutes) +
        ':' +
        padNumber(seconds) +
        '.' +
        padNumber(milliseconds, 3)
    );
}

function padNumber(number, length = 2) {
    return number.toString().padStart(length, '0');
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';

    laps.forEach(lap => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lap.lap}: ${formatTime(lap.duration)}`;
        lapsList.appendChild(lapItem);
    });
}

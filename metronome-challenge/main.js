(function () {
    const label = document.getElementsByTagName('label')[0];
    const pendulum = document.querySelector('.pendulum');
    const startBtn = document.querySelector('.btn-start');
    const stopBtn = document.querySelector('.btn-stop');

    startBtn.addEventListener('click', startMetronome);
    stopBtn.addEventListener('click', stopMetronome);
    let interval;
    let pendulumDirection = 'left';
    /**
     * Main logic
     */
    function startMetronome() {
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        pendulum.disabled = true;

        label.textContent = `Weight slider ${pendulum.value} BPM:`;

        const sound = new Audio('./sound/metronome.wav');
        const milliseconds = calculateBPM(pendulum.value);

        pendulum.style.setProperty('--milliseconds', `${(milliseconds / 1000)*2}s`);
        interval = setInterval(() => {
            // if (pendulumDirection === 'left') {
            //     pendulum.style.setProperty('--direction', 'moveItLeft');
            //     pendulumDirection = 'right';
            // } else {
            //     pendulum.style.setProperty('--direction', 'moveItRight');
            //     pendulumDirection = 'left';
            // }
            sound.currentTime = 0;
            sound.play();
        }, milliseconds);
    }

    /**
     * Resets everything to initial state.
     */
    function stopMetronome() {
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        pendulum.disabled = false;

        label.textContent = `Weight slider (between 40 BPM and 218 BPM):`;

        pendulum.style.setProperty('--milliseconds', '0s');
        clearInterval(interval);
    }

    /**
     * Calculate the BPM, returns the milliseconds for every tick.
     * @param {string} pendulum.value 
     * @returns {number} accuracy is 4 digits after the floating-point.
     */
    function calculateBPM(sliderValue) {
        return 60000 / Number(sliderValue);
    }
})();
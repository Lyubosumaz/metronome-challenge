function metronome() {
    const label = document.getElementsByTagName('label')[0];
    const slider = document.getElementById('slider');
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');

    startBtn.addEventListener('click', startMetronome);
    stopBtn.addEventListener('click', stopMetronome);

    /**
     * Main logic
     */
    let interval;
    function startMetronome() {
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        slider.disabled = true;

        label.textContent = `Weight slider ${slider.value} BPM:`;
        const sound = new Audio('./sound/metronome.wav');
        const milliseconds = calculateBPM(slider.value);

        createMetronome();
        document.getElementsByClassName('pendulum')[0].style.animation = `moveIt ${(milliseconds / 500)}s ease-in-out infinite`;
        interval = setInterval(() => { sound.play(); }, milliseconds);
    }

    /**
     * Resets everything to initial state.
     */
    function stopMetronome() {
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        slider.disabled = false;

        label.textContent = `Weight slider (between 40 BPM and 218 BPM):`;
        document.getElementsByClassName('container')[0].remove();
        clearInterval(interval);
    }

    /**
     * Calculate the BPM, returns the milliseconds for every tick.
     * @param {string} slider.value 
     * @returns {number} accuracy is 4 digits after the floating-point.
     */
    function calculateBPM(sliderValue) {
        const result = (60000 / Number(sliderValue));
        return result.toFixed(4);
    }

    /**
     * Create the Metronome
     */
    function createMetronome() {
        const root = document.getElementById('root');
        const container = document.createElement('div');
        container.className = "container";
        container.style.position = "relative";
        container.style.height = "400px";
        container.style.width = "400px";
        container.style.backgroundColor = "#d3d3d3";

        root.appendChild(container);

        const trapezoid = document.createElement('div');
        trapezoid.className = "trapezoid";
        trapezoid.style.height = "5%";
        trapezoid.style.width = "25%";
        trapezoid.style.borderBottom = "360px solid #8B4513";
        trapezoid.style.borderLeft = "150px solid transparent";
        trapezoid.style.borderRight = "150px solid transparent";

        const pendulum = document.createElement('div');
        pendulum.className = "pendulum";
        pendulum.style.position = "absolute";
        pendulum.style.transformOrigin = "bottom center";
        pendulum.style.height = "260px";
        pendulum.style.width = "10px";
        pendulum.style.top = "40px";
        pendulum.style.left = "195px";
        pendulum.style.background = "#000000";

        container.appendChild(trapezoid);
        container.appendChild(pendulum);
    }
}
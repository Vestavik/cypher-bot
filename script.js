document.addEventListener("DOMContentLoaded", () => {
    const botStatus = document.getElementById("botStatus");

    // Function to update bot status
    function updateStatus() {
        fetch('http://localhost:3000/status')
            .then(response => response.json())
            .then(data => {
                botStatus.textContent = data.status;
            })
            .catch(err => console.error(err));
    }

    function updateButtonState() {
        fetch('http://localhost:3000/can-process')
            .then(response => response.json())
            .then(data => {
                const canProcess = data.canProcess === 'true';
                document.getElementById("startBtn").disabled = !canProcess;
                document.getElementById("stopBtn").disabled = canProcess;
            })
            .catch(err => console.error(err));
    }

    document.getElementById("startBtn").addEventListener("click", () => {
        botStatus.textContent = 'Starting bot...';
        fetch('http://localhost:3000/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            updateStatus(); 
            updateButtonState(); // Update button states
        })
        .catch(err => console.error(err));
    });

    document.getElementById("stopBtn").addEventListener("click", () => {
        botStatus.textContent = 'Stopping bot...';
        fetch('http://localhost:3000/stop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            updateStatus(); 
            updateButtonState(); // Update button states
        })
        .catch(err => console.error(err));
    });

    // Initial status check
    updateStatus();
    updateButtonState(); // Update button state on load
});

document.addEventListener("DOMContentLoaded", function() {
    const needle = document.getElementById("needle");
    const speedIndicator = document.getElementById("speed");
    const notification = document.getElementById("notification");
    const notificationSound = new Audio("alarm.mp3");
    const acceleratorButton = document.getElementById("accelerator");
    const brakeButton = document.getElementById("brake");
    let speed = 0;
    let accelerating = false;
    let decelerating = false;
    let alarmPlaying = false;
    let alarmTimeout;
    let fineMessageTimeout;

    // Function to update the speed indicator and check speed limit
    function updateSpeedIndicator() {
        speedIndicator.textContent = speed;
        if (speed > 60) {
            notification.textContent = "You are violating the speed limit, slow down the speed";
            if (!alarmPlaying) {
                alarmSound();
            }
        } else {
            notification.textContent = "";
            if (alarmPlaying) {
                stopAlarmSound();
            }
        }
    }

    // Function to play the alarm sound
    function alarmSound() {
        notificationSound.loop = true;
        notificationSound.play();
        alarmPlaying = true;
        alarmTimeout = setTimeout(function() {
            stopAlarmSound();
            displayFineMessage();
        }, 30000);
    }

    // Function to stop the alarm sound
    function stopAlarmSound() {
        notificationSound.pause();
        notificationSound.currentTime = 0;
        alarmPlaying = false;
        clearTimeout(alarmTimeout);
    }

    // Function to display the fine message
    function displayFineMessage() {
        fineMessageTimeout = setTimeout(function() {
            notification.textContent = "The fine has been detected from your Fasttag ID #00512";
        }, 1000);
    }

    // Function to accelerate
    function accelerate() {
        if (speed < 180) {  // Adjust the maximum speed as needed
            speed += 5; // Increase the speed by 10 km/h
            updateSpeedIndicator();
            updateSpeedometer();
        }
    }

    // Function to decelerate
    function decelerate() {
        if (speed > 0) {
            speed -= 5; // Decrease the speed gradually
            updateSpeedIndicator();
            updateSpeedometer();
        }
    }

    // Start accelerating when the button is pressed
    acceleratorButton.addEventListener("mousedown", function() {
        accelerating = true;
        decelerating = false;
        accelerate();
        accelerateLoop();
    });

    // Stop accelerating when the button is released
    acceleratorButton.addEventListener("mouseup", function() {
        accelerating = false;
        decelerateLoop();
    });

    // Start decelerating when the button is released
    brakeButton.addEventListener("click", function() {
        accelerating = false;
        decelerating = true;
        decelerate();
        decelerateLoop();
    });

    // Stop decelerating when the button is pressed again
    brakeButton.addEventListener("mousedown", function() {
        decelerating = false;
        accelerateLoop();
    });

    // Function to continuously accelerate
    function accelerateLoop() {
        if (accelerating) {
            setTimeout(function() {
                accelerate();
                accelerateLoop();
            }, 100);
        }
    }

    // Function to continuously decelerate
    function decelerateLoop() {
        if (decelerating) {
            setTimeout(function() {
                decelerate();
                decelerateLoop();
            }, 100);
        }
    }

    // Update the speedometer needle's rotation
    function updateSpeedometer() {
        const rotation = -90 + (speed / 180) * 180; // Adjust as needed
        needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
    }

    // Initial speedometer and speed indicator update
    updateSpeedometer();
    updateSpeedIndicator();
});
// Function to send an alert message to the phone number


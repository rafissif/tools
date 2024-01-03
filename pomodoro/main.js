let timerInterval;
    let timerRunning = false;

    function startTimer(duration, display) {
        let timer = duration * 60;
        let minutes, seconds;

        function updateTimer() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                document.title = "Pomodoro Timer";
                display.textContent = "00:00";
                notifyUser();
            } else {
                document.title = `(${minutes}:${seconds}) Pomodoro Timer`;
            }
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
    }

    function startPomodoro(minutes) {
        if (!timerRunning) {
            stopTimer();
            document.title = `Pomodoro - ${minutes}:00`;
            startTimer(minutes, document.getElementById('timer'));
        }
    }

    function startBreak(minutes) {
        if (!timerRunning) {
            stopTimer();
            document.title = `Break - ${minutes}:00`;
            startTimer(minutes, document.getElementById('timer'));
        }
    }

    function startCustomTimer() {
        if (!timerRunning) {
            stopTimer();
            const customMinutes = document.getElementById('customTimer').value;
            if (customMinutes) {
                document.title = `Custom - ${customMinutes}:00`;
                startTimer(customMinutes, document.getElementById('timer'));
            } else {
                alert('Please enter a valid time.');
            }
        }
    }

    function stopTimer() {
        if (timerRunning && confirm("Are you sure you want to stop the timer?")) {
            clearInterval(timerInterval);
            timerRunning = false;
            document.title = "Pomodoro Timer";
            document.getElementById('timer').textContent = "00:00";
        }
    }

    function notifyUser() {
        if (Notification.permission === "granted") {
            const notification = new Notification("Pomodoro Timer", {
                body: "Timer has finished!",
                icon: "https://example.com/notification-icon.png" // Replace with your own icon URL
            });

            notification.onclick = function () {
                window.focus();
            };
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    notifyUser();
                }
            });
        }
    }
let timerInterval;
let timerRunning = false;

function isPageVisible() {
  return !document.hidden;
}

function startTimer(duration, display) {
  let timer = duration * 60;
  let minutes, seconds;

  function updateTimer() {
    if (!isPageVisible()) {
      return; // Don't update the timer if the page is not visible
    }

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
    const customMinutes = parseInt(document.getElementById('customTimer').value, 10);

    if (!isNaN(customMinutes) && customMinutes > 0) {
      document.title = `Custom - ${customMinutes}:00`;
      startTimer(customMinutes, document.getElementById('timer'));
    } else {
      alert('Please enter a valid positive number for the custom timer.');
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
      icon: "./icon.png" // Replace with your own icon URL
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

document.addEventListener('visibilitychange', () => {
  if (isPageVisible() && timerRunning) {
    // If the page becomes visible and the timer is running, restart the timer
    startTimer(minutes, document.getElementById('timer'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const currentDateElement = document.getElementById('current-date');
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const alarmList = document.getElementById('alarm-list');
    const alarmSound = document.getElementById('alarm-sound');

    let alarms = [];

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const date = now.toISOString().split('T')[0];
        currentTimeElement.textContent = `${hours}:${minutes}`;
        currentDateElement.textContent = date;
    }

    function checkAlarms() {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        alarms.forEach((alarm, index) => {
            if (alarm.time === currentTime) {
                alarmSound.play();
                setTimeout(() => alarmSound.pause(), 5000); // Play sound for 5 seconds
            }
        });
    }

    function setAlarm() {
        const time = alarmTimeInput.value;
        if (time) {
            const alarm = { time };
            alarms.push(alarm);
            displayAlarms();
        }
    }

    function displayAlarms() {
        alarmList.innerHTML = '';
        alarms.forEach((alarm, index) => {
            const li = document.createElement('li');
            li.textContent = alarm.time;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                alarms.splice(index, 1);
                displayAlarms();
            };
            li.appendChild(deleteButton);
            alarmList.appendChild(li);
        });
    }

    setAlarmButton.addEventListener('click', setAlarm);

    // Update time every second
    setInterval(updateTime, 1000);

    // Check alarms every minute
    setInterval(checkAlarms, 60000);
});

const date = new Date();

/**
 * Returns the current hour in 24-hour time.
 */
const getCurrentHour = () => {
    return date.getHours();
}

/**
 * Returns the month as a string.
 * @returns {string}
 */
const getMonthOfYear = () => {
    let monthName;
    switch (date.getMonth()) {
        case 0:
            monthName = 'January';
            break;
        case 1:
            monthName = 'February';
            break;
        case 2:
            monthName = 'March';
            break;
        case 3:
            monthName = 'April';
            break;
        case 4:
            monthName = 'May';
            break;
        case 5:
            monthName = 'June';
            break;
        case 6:
            monthName = 'July';
            break;
        case 7:
            monthName = 'August';
            break;
        case 8:
            monthName = 'September';
            break;
        case 9:
            monthName = 'October';
            break;
        case 10:
            monthName = 'November';
            break;
        case 11:
            monthName = 'December';
            break;
        default:
            monthName = 'Invalid month';
            break;
    }

    return monthName;

}

/**
 * Returns the day of the week as a string.
 * @type {function(): string}
 */
const getDayOfWeek = () => {
    let dayOfWeek;
    const dayNumber = date.getDay();
    switch (dayNumber) {
        case 0:
            dayOfWeek = 'Sunday';
            break;
        case 1:
            dayOfWeek = 'Monday';
            break;
        case 2:
            dayOfWeek = 'Tuesday';
            break;
        case 3:
            dayOfWeek = 'Wednesday';
            break;
        case 4:
            dayOfWeek = 'Thursday';
            break;
        case 5:
            dayOfWeek = 'Friday';
            break;
        default:
            6
            dayOfWeek = 'Saturday';
            break;
    }
    return dayOfWeek;
}


const dayOfWeek = getDayOfWeek();
const monthOfYear = getMonthOfYear();
const dateOfMonth = date.getDate();
const currentYear = date.getFullYear();

const todayDate = document.getElementById('currentDay');
todayDate.textContent = `${dayOfWeek}, ${monthOfYear} ${dateOfMonth}, ${currentYear}`;

let dailyTasks = {
    hour9: "",
    hour10: "",
    hour11: "",
    hour12: "",
    hour13: "",
    hour14: "",
    hour15: "",
    hour16: "",
    hour17: "",
    hour18: "",
    hour19: "",
    hour20: "",
    hour21: ""
};
const timeBlocks = document.querySelectorAll('.time-block');

const saveTask = () => {
    // assign the task to the corresponding hour in the dailyTasks object.
    timeBlocks.forEach(function (timeBlock) {
        const hourNumber = timeBlock.id.split('-')[1];
        const hour = `hour${hourNumber}`;
        dailyTasks[hour] = timeBlock.querySelector('.task').textContent;
    });

    if (!localStorage.getItem('dailyTasks')) {
        localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
    }

    localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
};

const getTask = () => {
    if (!localStorage.getItem('dailyTasks')) {
        return dailyTasks;
    }
    return JSON.parse(localStorage.getItem('dailyTasks'));
};

const saveButtons = document.querySelectorAll('button');

saveButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        saveTask();
    });
});

const getSavedTasks = () => {
    const tasks = getTask();
    timeBlocks.forEach(function (timeBlock) {
        const hourNumber = timeBlock.id.split('-')[1];
        const hour = `hour${hourNumber}`;
        timeBlock.querySelector('.task').textContent = tasks[hour];
    });
}

const createNewEvent = () => {};

window.onload = function () {
    dailyTasks = getTask();
    getSavedTasks();
    setInterval(function () {
        const currentHour = getCurrentHour();
        // const currentHour = 9;
        timeBlocks.forEach(function (timeBlock) {
            const timeBlockHour = parseInt(timeBlock.id.split('-')[1]);
            const hour = timeBlock.querySelector('.hour');
            const task = timeBlock.querySelector('.task');
            const button = timeBlock.querySelector('button');
            if (timeBlockHour < currentHour) {
                // add the past class to the time block
                timeBlock.classList.add('past');

                // style the hour block to show that it is in the past.
                hour.style.color = 'darkgrey';

                // style the task to show that it is in the past.
                task.style.textDecoration = 'line-through';
                task.style.outline = 'none';
                task.style.color = 'grey';
                task.contentEditable = false;
                task.style.cursor = 'default';
                task.style.backgroundColor = '#F4F4F4';

                // style the button to show that it is disabled
                button.disabled = true;
            } else if (timeBlockHour === currentHour) {
                timeBlock.classList.add('present');
                hour.style.backgroundColor = 'lightgreen';
                hour.style.fontWeight = '700';
            } else {
                timeBlock.classList.add('future');
            }
        });
    }, 1000);
}

timeBlocks.forEach(function (timeBlock) {
    const hoverBlock = timeBlock.querySelector('.task');
    hoverBlock.addEventListener('mouseover', function () {
        hoverBlock.style.cursor = 'pointer';
        hoverBlock.appendChild(document.createElement('span'));
        hoverBlock.querySelector('span').textContent = 'Click to edit';
    });

    hoverBlock.addEventListener('mouseout', function () {
        hoverBlock.querySelector('span').style.display = 'none';
    });

    hoverBlock.addEventListener('click', function () {
        hoverBlock.querySelector('span').textContent = '';
        hoverBlock.querySelector('span').style.display = 'none';
    });
});


function getElementText(element) {
    if (!element) {
        return undefined;
    }
    if (element.tagName === 'INPUT') {
        return element.value;
    } else if (element.tagName === 'TEXTAREA') {
        return element.textContent;
    }
}

let is12hourFormat = false

function updateTime() {
    let date = new Date()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let ampm = ""

    if(is12hourFormat) {
        ampm = hour >= 12 ? 'PM' : 'AM';
        hour %= 12;
        hour = hour ? hour : 12
    }

    const clock = document.getElementById('digital-clock')
    clock.innerText = toDoubleDigit(hour) + " : " + toDoubleDigit(minutes) + " : " + toDoubleDigit(seconds) + " " + ampm
}

function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

function toDoubleDigit(n){ 
    n = String(n)
    if(n.length == 1) {
        n = '0' + n
    }
    return n
}

updateTime()

setInterval(function() {
    updateTime()
}, 1000)

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

const button = document.getElementById('format-changer-button')
button.addEventListener('click', function() {
    button.classList.add('animate');
    is12hourFormat = !is12hourFormat
    setTimeout(function() {
        button.classList.remove('animate');
    }, 300);
})
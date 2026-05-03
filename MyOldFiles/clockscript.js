
setInterval(setClock,1000)


const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {

    const currentDate = new Date() //Getting the date, const: always same

    const secondsRatio = currentDate.getSeconds()/60 // getting seconds and finding its ratio to 60

    const minutesRatio = (secondsRatio + currentDate.getMinutes())/60 // same thing for mins, seconds for incraments between mins

    const hoursRatio = (minutesRatio + currentDate.getHours())/12 // same thing for hours, mins for incraments between hours

    setRotation(secondHand,secondsRatio)
    setRotation(minuteHand,minutesRatio)
    setRotation(hourHand,hoursRatio)


    const audio = document.getElementById('scream')

    audio.play()
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio*360)
}

function scream() {
   
}

setClock()
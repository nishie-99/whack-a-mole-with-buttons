let mole_num = 0
let lights_on = false
let button = false
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    button = true
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == mole_num) {
        lights_on = true
    } else if (receivedNumber == -1) {
        lights_on = false
        basic.showIcon(IconNames.SmallDiamond)
    }
})
radio.setGroup(138)
if (input.buttonIsPressed(Button.A)) {
    mole_num = 2
} else if (input.buttonIsPressed(Button.B)) {
    mole_num = 3
} else {
    mole_num = 1
}
basic.showNumber(mole_num)
basic.forever(function () {
    if (lights_on) {
        basic.showIcon(IconNames.Chessboard)
        if (button) {
            lights_on = false
            button = false
            radio.sendNumber(100)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
    }
})

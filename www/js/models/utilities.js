const utilities = {
  calculateTime: (startTime, endTime = new Date()) => {
    const difference = endTime - startTime

    const ms2s = 1000
    const s2m = 60
    const m2h = 60

    let hours = difference / ms2s / s2m / m2h
    let minutes = (hours - Math.floor(hours)) * m2h
    let seconds = (minutes - Math.floor(minutes)) * s2m

    hours = Math.floor(hours)
    minutes = Math.floor(minutes)
    seconds = Math.floor(seconds)

    hours = (hours < 10) ? `0${hours}` : `${hours}`
    minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`
    seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`

    return `${hours}:${minutes}:${seconds}`
  },
  batteryPercentage: (currentBatteryPercentage) => {
    const className = (currentBatteryPercentage > 90)
      ? 'max'
      : (currentBatteryPercentage > 70)
          ? 'high'
          : (currentBatteryPercentage > 40)
              ? 'middle'
              : (currentBatteryPercentage > 20)
                  ? 'low'
                  : (currentBatteryPercentage > 5) ? 'critical' : 'min'

    return className
  },
  calculatePrice: (data) => {
    let totalPrice = 0
    const ms2s = 1000
    const s2m = 60

    totalPrice += data.startingfee

    const startTime = new Date(parseInt(data.startTime))
    const endTime = new Date(parseInt(data.endTime))

    const duration = Math.ceil((endTime - startTime) / ms2s / s2m)

    totalPrice += duration * data.fee

    if (data.startPosition === 'unparked' && data.endPosition === 'parked') {
      totalPrice -= data.discount
    }

    if (data.endPosition === 'unparked') {
      totalPrice += data.penaltyfee
    }

    return totalPrice
  }
}

module.exports = utilities

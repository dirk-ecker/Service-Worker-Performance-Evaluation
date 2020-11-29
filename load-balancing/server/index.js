import os from 'os-utils' // https://github.com/oscmejia/os-utils

const PLATFORM = os.platform()
const NUMBER_OF_PROCESSORS = os.cpuCount()
const TOTAL_MEMORY = os.totalmem()

console.log(PLATFORM, NUMBER_OF_PROCESSORS, TOTAL_MEMORY)

const currentFreeMemory = os.freemem()

console.log(currentFreeMemory)

// calculate CPU usage for the next second
os.cpuUsage(v => {
  console.log( 'CPU Usage (%): ' + v );
})

// calculate free CPU for the next second
os.cpuFree(v => {
  console.log( 'CPU Free:' + v );
})

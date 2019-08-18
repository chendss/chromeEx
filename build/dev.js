const { execSync } = require('child_process')
const path = require('path')

while (true) {
  try {
    execSync('npm run dev', {
      cwd: path.join(process.cwd(), '/'),
    })
  } catch (error) {
    if (!error.message.includes('Unhandled stream error')) {
      console.error('发生一个错误', error)
    }
  }
}

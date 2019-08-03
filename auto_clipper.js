const clipInfo = require('./clip_info.json')
const spawn = require("child_process").spawn;

let debug = false
const commands = []

function cmd(commands) {
        const results = []
        const child = spawn("powershell.exe", ["-Command", "-"]);
        commands.forEach( cmd => {
            child.stdin.write(cmd+ '\n')
        })
        child.stdin.end()
}

function mkdir(name) {
    return `mkdir -Force .\\sources\\${name}`
}

function ffmpeg(source, start, duration, folder, name, format) {
    let encoding = ''
    if (format === 'wav') {
        encoding = '-vn -acodec pcm_s16le -ar 44100 -ac 2'
    } else if (format === 'mp3') {
        encoding = '-vn -acodec libmp3lame'
    }
    return `ffmpeg -y -ss ${start} -i .\\sources\\${source} -t ${duration} ${encoding} .\\sources\\${folder}\\${name}.${format}`
}

function escStr(str) {
    return str.trim().replace(/\s+/g, '_')
}

clipInfo.forEach(info => {
    const originFileName = info.movieFileName
    const originalFormat = info.movieFileName.split('.').pop()
    const folder = escStr(info.movieFileName.replace(/\.\w+$/, ''))
    const format = info.outputFormat;
    
    if (format.match(/mp3|wav/g).length === 0) {
        if (format !== originalFormat) {
            throw Error(`Incorrect format used for outputFormat. Correct formats are "mp3", "wav" or "${originalFormat}".\nYou provided "${format}".`)
        }
    }
    if (info.debug === true) {
        debug = true
    }

    commands.push(mkdir(folder))

    info.clips.forEach((clip, idx, arr) => {
        const name = escStr(`${idx + 1}. ${clip[0]}`)
        const start = clip[1]
        const duration = clip[2]
        commands.push(ffmpeg(originFileName, start, duration, folder, name, format))
    })
})

const results = cmd(commands)

if (debug === true) {
    console.log(commands)
}
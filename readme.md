## install Chocolatey: in PowerShell.exe as admin:
Copy and paste the next line. (paste by right clicking on the blinking cursor)
	`Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`

## install ffmpeg: in admin powershell enter
	`choco install -y ffmpeg`

## install nodejs: in admin powershell enter
	`choco install -y nodejs`

## install visual studio code: in admin powershell enter
	`choco install -y VisualStudioCode`


## Put your video file(s) in the sources folder
Open the folder containing the code you downloaded (it should be the same folder this file is in)

In order to the script to run you must put your video file in the "sources" directory of the project folder. If it doesn't exist, create it.

## Open the clip info file and add your clip info
right click the below file and open with visual studio code
	`clip_info.json`

Important, the brackets in this file are important, if you don't know what they mean, watch a video on youtube about json.

The outher brackets can contain multiple or one object enclosed in curly brackets

Each object inside the curly brackets must have these properties:
    - movieFileName: The exact name of the video file placed in the sources folder, including the file format.
    - outputFormat: can either by wav, mp3, or the same format as the original file
    - clips: a list containing clip data
        - 1: name of the clip, try not to use any special characters.
        - 2: The start time code for the clip in the format of HH:MM:SS. All characters must be present, even if they are zeros. Example: 00:05:02, 5 minutes 2 seconds.
        - 3: The duration the clip should be in the format of HH:MM:SS. Example: 00:00:10, clip will be 10 seconds long.

## run the program: in powershell
    `node auto_clipper.js`
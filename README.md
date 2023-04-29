# Electron-JS
electron-js-web-app Swipe-Billing

how to create electron js web app ?
*first create a folder name, then open with vs code, or "mkdir my-electron-app && cd my-electron-app"
*and then "npm init" after that "npm install electron --save-dev" it will ask queestions in terminal linke name,description, version, keyword, liscence, author and in the place of index.js-main.js etc... After entering everyting it will create a file package.json where everything you entered is visisble.

{
  "name": "swipe-billing",    ----------------------->it wont take capital letters even though just type capitals so that our app name after bundle visible with same name
  "version": "1.0.0",        ------------->app version which we want to make, remember dont give random number it must be in sequence now 1.0.0 after this 1.0.1 like this
  "description": "Hello World!",       ------------>descriptioin which is visible in info of our app
  "main": "main.js",                      ------------------------> main file
  "scripts": {
    "start": "electron .",                            ---------------------->to start electron app just type this or copy this line
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",              -------------------->author name 
  "license": "MIT",                 -----------------deafault ISC you can change based on security purposes MIT ,ISC 
  "devDependencies": {
    "electron": "23.1.3"
  }
}

!!! note in package.json main.js must be replace with index.js you can change the name in package.json after craeting the package.json or while entering the details also you can change. if you don`t change file name you have to create index.js file, if you change main.js !!!
*In main.js file you can refer electron js docs there is a code for main js in which they explains the code with every line.
*if it is loadFile method you can create -index.html file or any  file which you want to disply or render.
*if it is a loadURL method no need but if you want it create a boiler plate of html file and changes whihc you want based on your requirements.
*In loadURL method we can give our URL which we want to render
*then run "npm start"
*make necessary changes by working in main.js file even in html file 


after this we need to bundle the file to create a installable file

default mode electron-forge but we are using electron-builder which is best to bundle with smaller file size
"npm install electron-bilder -D" we are install as dev dependency.

*In package.json in start " "package": "electron-builder"," if wont wont come make it paste or prefer electron-builder docs or watch this youtube video "https://youtu.be/yDOTkD8D_5o" ~ link.
in package json file we must give our target files to make it installable.

 "build": {
    "appId": "com.example.app",
    "win": {
      "target": [
        "msi",
        "zip",
        "nsis"
      ]
    }
  },
  
  
  *final command "npm run package"
  
  

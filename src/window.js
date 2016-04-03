'use strict';

const electron = require('electron');
const Hapi = require('hapi');
const Path = require('path');

const PuzzleService= require('./services/puzzle');

const {
  app,
  BrowserWindow
} = electron;

var mainWindow = null;

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-finish-launching', () => {
  const server = new Hapi.Server({
    connections: {
      routes: {
        files: {
          relativeTo: Path.join(__dirname, '')
        }
      }
    }
  });

  server.connection({ port: 3333 });

  server.register(require('inert'), (err) => {
    if(err) {
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/',
      handler(request, reply) {
        reply.file('index.html');
      }
    });

    server.route({
      method: 'GET',
      path: '/game',
      handler(request, reply) {
        reply.file('index.html');
      }
    });

    server.route({
      method: 'GET',
      path: '/puzzle',
      handler(request, reply) {
        reply(PuzzleService.getPuzzle());
      }
    });

    server.route({
      method: 'GET',
      path: '/game/generator',
      handler(request, reply) {
        reply.file('index.html');
      }
    });

    server.route({
      method: 'GET',
      path: '/game/help',
      handler(request, reply) {
        reply.file('index.html');
      }
    });

    server.route({
      method: 'GET',
      path: '/assets/{filename}',
      handler(request, reply) {
        reply.file(`assets/${request.params.filename}`)
      }
    });

    server.start((err) => {
      if(err) {
        throw err;
      }

      console.log(`Hapi server running at: ${server.info.uri}`);
    });
  });
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL('http://localhost:3333/game');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

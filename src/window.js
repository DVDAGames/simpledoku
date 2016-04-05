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

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-finish-launching', () => {
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
      path: '/game/{route}',
      handler(request, reply) {
        reply.file('index.html');
      }
    });

    server.route({
      method: 'GET',
      path: '/puzzle',
      handler(request, reply) {
        reply(PuzzleService.getPuzzle(request.query.solved));
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
    width: 530,
    height: 600
  });

  mainWindow.loadURL('http://localhost:3333/');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('will-quit', () => {
  server.stop({ timeout: 60 * 1000 }, (err) => {
    console.log('Server stopped');
  });
})

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
import type { PluginListenerHandle } from '@capacitor/core';
import type { BrowserWindowConstructorOptions, NotificationConstructorOptions } from 'electron';
import { BrowserWindow, app, Notification, clipboard } from 'electron';

import type { CapacitorElectronMetacodiPlugin } from '../../src/definitions';


export class CapacitorElectronMetacodi implements CapacitorElectronMetacodiPlugin {

  win: BrowserWindow;
  isClosed = true;
  soundPlay: any;
  isPlay = false;

  constructor() { }
  addListener(
    eventName: 'ping',
    listenerFunc: () => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    console.log(eventName, listenerFunc);
    // return;
    throw new Error('Method not implemented.');
  }

  async exitApp(): Promise<void> { app.quit(); };


  async getTextClipboard(): Promise<string> {
    return clipboard.readText();
  }


  async openWindow(options: { url: string, optionsWindow: BrowserWindowConstructorOptions }): Promise<any> {
    this.isClosed = false;
    this.win = new BrowserWindow(options.optionsWindow)
    await this.win.loadURL(options.url);
    this.win.on('close', () => { this.isClosed = true; });

    this.win.on('focus', () => {
      const windows = BrowserWindow.getAllWindows();
      const myCapacitorApp = windows[0];
      myCapacitorApp.webContents.send('ping');
    })
    this.win.on('blur', () => {
      const windows = BrowserWindow.getAllWindows();
      const myCapacitorApp = windows[0];
      myCapacitorApp.webContents.send('ping');
    })

    return null;
  }

  async closeWindow(): Promise<void> {
    if (!this.isClosed) { this.win.close(); }
    return;
  }

  async getUrl(): Promise<{ url: string, isClosed: boolean }> {
    if (this.isClosed) { return { url: '', isClosed: true }; }
    const contents = this.win.webContents;
    return { url: contents.getURL(), isClosed: false };
  }

  async setBadge(options: { value: number | null }): Promise<void> {
    if (process.platform === 'win32') {
      const windows = BrowserWindow.getAllWindows();
      const myCapacitorApp = windows[0];
      const contructorBadge = require('electron-windows-badge');
      const badge = new contructorBadge(myCapacitorApp);
      badge.update(options.value);
    } else {
      app.setBadgeCount(options.value);
    }
    return;
  }

  async showNotification(options: { package: string, title: string, message: string }): Promise<void> {

    const path = require('path');
    if (process.platform === 'win32') { app.setAppUserModelId(options.package); }
    const appPath = app.getAppPath().replace('/app.asar', '');
    const notificationOptions: NotificationConstructorOptions = {
      title: options.title,
      body: String(options.message),
      icon: path.join(appPath, '../assets/appIcon.png'),
      urgency: 'critical'
    };
    const notification = new Notification(notificationOptions);
    // notification.on('click', () => {
    //   this.resolveNotificationResponse(nu, true);
    // });
    notification.show();

    return;
  };

  async playSound(options: { src: string, loop?: boolean, volume?: number }): Promise<any> {
    const path = require('path');
    let urlMp3 = '';
    if (process.platform === 'darwin') {
      const pathApp = app.getPath('exe');
      urlMp3 = path.join(pathApp, '../../assets/', options.src);
    } else if (process.platform === 'win32') {
      const pathApp = app.getAppPath().replace('/app.asar', '');
      urlMp3 = path.join(pathApp, '../assets/', options.src);
    }
    console.log(urlMp3);
    const optionsSoundplayer = {
      filename: urlMp3,
      gain: options.volume ? options.volume : 50,
      debug: false,
    };

    const soundplayer = require('sound-player');
    this.soundPlay = new soundplayer(optionsSoundplayer);
    this.soundPlay.play();
    const self = this;
    this.soundPlay.on('complete', () => self.isPlay = false);
    this.isPlay = true;
    return urlMp3;

  }

  async stopSound(): Promise<void> {
    this.isPlay = false;
    this.soundPlay.stop();
    return;
  };
}

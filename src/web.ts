import { WebPlugin } from '@capacitor/core';

import type { CapacitorElectronMetacodiPlugin } from './definitions';

export class CapacitorElectronMetacodiWeb extends WebPlugin implements CapacitorElectronMetacodiPlugin {

  constructor() {
    super();
  }
  
  async exitApp(): Promise<void> { return; };

  async getTextClipboard(): Promise<string> { return ''; };

  async openWindow(options: { url: string, optionsWindow: any }): Promise<any> {
    return options;
  }

  async closeWindow(): Promise<void> { return; };


  async getUrl(): Promise<{ url: string, isClosed: boolean }> { return { url: 'not implemented', isClosed: true }; }

  async setBadge(options: { value: number | null }): Promise<void> {
    console.log('not implemented on web', options);
    return;
  };

  async showNotification(options: { package: string, title: string, message: string, nu: any }): Promise<any> {
    console.log('not implemented on web', options);
    return;
  };

  async playSound(options: { src: string, loop?: boolean, volume?: number }): Promise<any> {
    console.log('not implemented on web', options);
    return;
  }

  async stopSound(): Promise<void> { return; };

  async execute(options: { command: string, args?: string }): Promise<any> { 
    console.log('not implemented on web', options);
    return;
  }

}

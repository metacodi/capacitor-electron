// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { BrowserWindowConstructorOptions } from 'electron';

export interface CapacitorElectronMetacodiPlugin {
  
  /**
   * Exit electron app
   */
  exitApp(): Promise<void>;

  /**
   * get Text from Clipboard
   */
  getTextClipboard(): Promise<string>;

  /**
   * Create and control browser windows.
   * 
   * Window customization
   * (BrowserWindow) <https://www.electronjs.org/docs/latest/api/browser-window>
   */
  openWindow(options: { url: string, optionsWindow: BrowserWindowConstructorOptions | any }): Promise<any>;

  /**
   * Close window if opened
   */
  closeWindow(): Promise<void>;

  /**
   * Get url and if window closed
   */
  getUrl(): Promise<{ url: string, isClosed: boolean }>;

  /** 
   * Set Badge of application 
   * */
  setBadge(options: { value: number | null }): Promise<void>;

  /**
   * Show system notification
   */
  showNotification(options: { package: string, title: string, message: string, nu: any }): Promise<any>;

  /**
   * Play Sound
   */
  playSound(options: { src: string, loop?: boolean, volume?: number }): Promise<any>;

  /**
   * Stop Sound
   */
  stopSound(): Promise<void>;

}

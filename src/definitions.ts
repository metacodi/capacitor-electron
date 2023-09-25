import type { PermissionState, PluginListenerHandle } from '@capacitor/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { BrowserWindowConstructorOptions } from 'electron';

export interface PermissionStatus {
  status: PermissionState;
}


export interface CalendarCreateOpts {
  name: string;
}

export interface EventCreateOpts {
  calendar: string;
  title: string;
  start: Date;
  end: Date;
  location?: {
    name: string;
    lat: number;
    lon: number;
  };
}

export interface EventUpdateOpts {
  event: string;
  title?: string;
  start?: Date;
  end?: Date;
  location?: {
    name: string;
    lat: number;
    lon: number;
  };
}

export interface EventDeleteOpts {
  event: string;
}

export interface EventListOpts {
  start: Date;
  end: Date;
  calendars: string[];
}

export interface ICalendar {
  id: string;
  name: string;
  color: string;
}

export interface IEvent {
  uniqueId: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  location: {
    name: string;
    lat: number;
    lon: number;
  };
}

export interface Results<T> {
  results: T[];
}

export interface CapacitorElectronMetacodiPlugin {
  addListener(
    eventName: 'ping',
    listenerFunc: () => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

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

  checkPermissionCalendar(): Promise<PermissionStatus>;

  requestPermissionsCalendar(): Promise<PermissionStatus>;

  listCalendars(): Promise<Results<ICalendar>>;
  createCalendar(options: CalendarCreateOpts): Promise<ICalendar>;
  createEvent(options: EventCreateOpts): Promise<IEvent>;
  updateEvent(options: EventUpdateOpts): Promise<IEvent>;
  deleteEvent(options: EventDeleteOpts): Promise<any>;
  listEvents(options: EventListOpts): Promise<Results<IEvent>>;

}

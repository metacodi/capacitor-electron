import { WebPlugin } from '@capacitor/core';

import type { CapacitorElectronMetacodiPlugin, PermissionStatus, ICalendar,
  CalendarCreateOpts,
  IEvent,
  EventCreateOpts,
  EventUpdateOpts,
  EventDeleteOpts,
  Results,
  EventListOpts, } from './definitions';

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

  async checkPermissionCalendar(): Promise<PermissionStatus> {
    console.log('calendar plugin not available on web');
    return { status: 'denied'} ;
  }

  async requestPermissionsCalendar(): Promise<PermissionStatus> {
    console.log('calendar plugin not available on web');
    return { status: 'denied'} ;
  }

  async createCalendar(options: CalendarCreateOpts): Promise<ICalendar> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async createEvent(options: EventCreateOpts): Promise<IEvent> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async updateEvent(options: EventUpdateOpts): Promise<IEvent> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  async deleteEvent(options: EventDeleteOpts): Promise<any> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  listCalendars(): Promise<Results<ICalendar>> {
    throw this.unimplemented('calendar plugin not available on web');
  }

  listEvents(options: EventListOpts): Promise<Results<IEvent>> {
    throw this.unimplemented('calendar plugin not available on web');
  }

}

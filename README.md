# @metacodi/capacitor-electron

Capacitor electron plugin for Capacitor v.3

## Install

```bash
npm install @metacodi/capacitor-electron
npx cap sync
```

## API

<docgen-index>

* [`addListener('ping', ...)`](#addlistenerping)
* [`exitApp()`](#exitapp)
* [`getTextClipboard()`](#gettextclipboard)
* [`openWindow(...)`](#openwindow)
* [`closeWindow()`](#closewindow)
* [`getUrl()`](#geturl)
* [`setBadge(...)`](#setbadge)
* [`showNotification(...)`](#shownotification)
* [`playSound(...)`](#playsound)
* [`stopSound()`](#stopsound)
* [`checkCalendarPermission()`](#checkcalendarpermission)
* [`requestCalendarPermissions()`](#requestcalendarpermissions)
* [`listCalendars()`](#listcalendars)
* [`createCalendar(...)`](#createcalendar)
* [`createCalendarEvent(...)`](#createcalendarevent)
* [`updateCalendarEvent(...)`](#updatecalendarevent)
* [`deleteCalendarEvent(...)`](#deletecalendarevent)
* [`listCalendarEvents(...)`](#listcalendarevents)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### addListener('ping', ...)

```typescript
addListener(eventName: 'ping', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'ping'</code>        |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### exitApp()

```typescript
exitApp() => Promise<void>
```

Exit electron app

--------------------


### getTextClipboard()

```typescript
getTextClipboard() => Promise<string>
```

get Text from Clipboard

**Returns:** <code>Promise&lt;string&gt;</code>

--------------------


### openWindow(...)

```typescript
openWindow(options: { url: string; optionsWindow: BrowserWindowConstructorOptions | any; }) => Promise<any>
```

Create and control browser windows.

Window customization
(BrowserWindow) &lt;https://www.electronjs.org/docs/latest/api/browser-window&gt;

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code>{ url: string; optionsWindow: any; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### closeWindow()

```typescript
closeWindow() => Promise<void>
```

Close window if opened

--------------------


### getUrl()

```typescript
getUrl() => Promise<{ url: string; isClosed: boolean; }>
```

Get url and if window closed

**Returns:** <code>Promise&lt;{ url: string; isClosed: boolean; }&gt;</code>

--------------------


### setBadge(...)

```typescript
setBadge(options: { value: number | null; }) => Promise<void>
```

Set Badge of application

| Param         | Type                                    |
| ------------- | --------------------------------------- |
| **`options`** | <code>{ value: number \| null; }</code> |

--------------------


### showNotification(...)

```typescript
showNotification(options: { package: string; title: string; message: string; nu: any; }) => Promise<any>
```

Show system notification

| Param         | Type                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| **`options`** | <code>{ package: string; title: string; message: string; nu: any; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### playSound(...)

```typescript
playSound(options: { src: string; loop?: boolean; volume?: number; }) => Promise<any>
```

Play Sound

| Param         | Type                                                           |
| ------------- | -------------------------------------------------------------- |
| **`options`** | <code>{ src: string; loop?: boolean; volume?: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### stopSound()

```typescript
stopSound() => Promise<void>
```

Stop Sound

--------------------


### checkCalendarPermission()

```typescript
checkCalendarPermission() => Promise<PermissionStatus>
```

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

--------------------


### requestCalendarPermissions()

```typescript
requestCalendarPermissions() => Promise<PermissionStatus>
```

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

--------------------


### listCalendars()

```typescript
listCalendars() => Promise<Results<ICalendar>>
```

**Returns:** <code>Promise&lt;<a href="#results">Results</a>&lt;<a href="#icalendar">ICalendar</a>&gt;&gt;</code>

--------------------


### createCalendar(...)

```typescript
createCalendar(options: CalendarCreateOpts) => Promise<ICalendar>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#calendarcreateopts">CalendarCreateOpts</a></code> |

**Returns:** <code>Promise&lt;<a href="#icalendar">ICalendar</a>&gt;</code>

--------------------


### createCalendarEvent(...)

```typescript
createCalendarEvent(options: EventCreateOpts) => Promise<IEvent>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#eventcreateopts">EventCreateOpts</a></code> |

**Returns:** <code>Promise&lt;<a href="#ievent">IEvent</a>&gt;</code>

--------------------


### updateCalendarEvent(...)

```typescript
updateCalendarEvent(options: EventUpdateOpts) => Promise<IEvent>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#eventupdateopts">EventUpdateOpts</a></code> |

**Returns:** <code>Promise&lt;<a href="#ievent">IEvent</a>&gt;</code>

--------------------


### deleteCalendarEvent(...)

```typescript
deleteCalendarEvent(options: EventDeleteOpts) => Promise<any>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#eventdeleteopts">EventDeleteOpts</a></code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### listCalendarEvents(...)

```typescript
listCalendarEvents(options: EventListOpts) => Promise<Results<IEvent>>
```

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#eventlistopts">EventListOpts</a></code> |

**Returns:** <code>Promise&lt;<a href="#results">Results</a>&lt;<a href="#ievent">IEvent</a>&gt;&gt;</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### PermissionStatus

| Prop         | Type                                                        |
| ------------ | ----------------------------------------------------------- |
| **`status`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### Results

| Prop          | Type             |
| ------------- | ---------------- |
| **`results`** | <code>T[]</code> |


#### ICalendar

| Prop        | Type                |
| ----------- | ------------------- |
| **`id`**    | <code>string</code> |
| **`name`**  | <code>string</code> |
| **`color`** | <code>string</code> |


#### CalendarCreateOpts

| Prop       | Type                |
| ---------- | ------------------- |
| **`name`** | <code>string</code> |


#### IEvent

| Prop           | Type                                                     |
| -------------- | -------------------------------------------------------- |
| **`uniqueId`** | <code>string</code>                                      |
| **`id`**       | <code>string</code>                                      |
| **`title`**    | <code>string</code>                                      |
| **`start`**    | <code>string</code>                                      |
| **`end`**      | <code>string</code>                                      |
| **`location`** | <code>{ name: string; lat: number; lon: number; }</code> |
| **`notes`**    | <code>string</code>                                      |


#### EventCreateOpts

| Prop                        | Type                                                     |
| --------------------------- | -------------------------------------------------------- |
| **`calendar`**              | <code>string</code>                                      |
| **`title`**                 | <code>string</code>                                      |
| **`start`**                 | <code><a href="#date">Date</a></code>                    |
| **`end`**                   | <code><a href="#date">Date</a></code>                    |
| **`location`**              | <code>{ name: string; lat: number; lon: number; }</code> |
| **`notes`**                 | <code>string</code>                                      |
| **`firstReminderMinutes`**  | <code>number</code>                                      |
| **`secondReminderMinutes`** | <code>number</code>                                      |


#### Date

Enables basic storage and retrieval of dates and times.

| Method                 | Signature                                                                                                    | Description                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | Returns a string representation of a date. The format of the string depends on the locale.                                              |
| **toDateString**       | () =&gt; string                                                                                              | Returns a date as a string value.                                                                                                       |
| **toTimeString**       | () =&gt; string                                                                                              | Returns a time as a string value.                                                                                                       |
| **toLocaleString**     | () =&gt; string                                                                                              | Returns a value as a string value appropriate to the host environment's current locale.                                                 |
| **toLocaleDateString** | () =&gt; string                                                                                              | Returns a date as a string value appropriate to the host environment's current locale.                                                  |
| **toLocaleTimeString** | () =&gt; string                                                                                              | Returns a time as a string value appropriate to the host environment's current locale.                                                  |
| **valueOf**            | () =&gt; number                                                                                              | Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.                                                      |
| **getTime**            | () =&gt; number                                                                                              | Gets the time value in milliseconds.                                                                                                    |
| **getFullYear**        | () =&gt; number                                                                                              | Gets the year, using local time.                                                                                                        |
| **getUTCFullYear**     | () =&gt; number                                                                                              | Gets the year using Universal Coordinated Time (UTC).                                                                                   |
| **getMonth**           | () =&gt; number                                                                                              | Gets the month, using local time.                                                                                                       |
| **getUTCMonth**        | () =&gt; number                                                                                              | Gets the month of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                             |
| **getDate**            | () =&gt; number                                                                                              | Gets the day-of-the-month, using local time.                                                                                            |
| **getUTCDate**         | () =&gt; number                                                                                              | Gets the day-of-the-month, using Universal Coordinated Time (UTC).                                                                      |
| **getDay**             | () =&gt; number                                                                                              | Gets the day of the week, using local time.                                                                                             |
| **getUTCDay**          | () =&gt; number                                                                                              | Gets the day of the week using Universal Coordinated Time (UTC).                                                                        |
| **getHours**           | () =&gt; number                                                                                              | Gets the hours in a date, using local time.                                                                                             |
| **getUTCHours**        | () =&gt; number                                                                                              | Gets the hours value in a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                       |
| **getMinutes**         | () =&gt; number                                                                                              | Gets the minutes of a <a href="#date">Date</a> object, using local time.                                                                |
| **getUTCMinutes**      | () =&gt; number                                                                                              | Gets the minutes of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                           |
| **getSeconds**         | () =&gt; number                                                                                              | Gets the seconds of a <a href="#date">Date</a> object, using local time.                                                                |
| **getUTCSeconds**      | () =&gt; number                                                                                              | Gets the seconds of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                           |
| **getMilliseconds**    | () =&gt; number                                                                                              | Gets the milliseconds of a <a href="#date">Date</a>, using local time.                                                                  |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | Gets the milliseconds of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                      |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC).                             |
| **setTime**            | (time: number) =&gt; number                                                                                  | Sets the date and time value in the <a href="#date">Date</a> object.                                                                    |
| **setMilliseconds**    | (ms: number) =&gt; number                                                                                    | Sets the milliseconds value in the <a href="#date">Date</a> object using local time.                                                    |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                                                                    | Sets the milliseconds value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) =&gt; number                                                         | Sets the seconds value in the <a href="#date">Date</a> object using local time.                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) =&gt; number                                                         | Sets the seconds value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | Sets the minutes value in the <a href="#date">Date</a> object using local time.                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | Sets the minutes value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | Sets the hour value in the <a href="#date">Date</a> object using local time.                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | Sets the hours value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                     |
| **setDate**            | (date: number) =&gt; number                                                                                  | Sets the numeric day-of-the-month value of the <a href="#date">Date</a> object using local time.                                        |
| **setUTCDate**         | (date: number) =&gt; number                                                                                  | Sets the numeric day of the month in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                        |
| **setMonth**           | (month: number, date?: number \| undefined) =&gt; number                                                     | Sets the month value in the <a href="#date">Date</a> object using local time.                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) =&gt; number                                                     | Sets the month value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | Sets the year of the <a href="#date">Date</a> object using local time.                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | Sets the year value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                      |
| **toUTCString**        | () =&gt; string                                                                                              | Returns a date converted to a string using Universal Coordinated Time (UTC).                                                            |
| **toISOString**        | () =&gt; string                                                                                              | Returns a date as a string value in ISO format.                                                                                         |
| **toJSON**             | (key?: any) =&gt; string                                                                                     | Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. |


#### EventUpdateOpts

| Prop           | Type                                                     |
| -------------- | -------------------------------------------------------- |
| **`event`**    | <code>string</code>                                      |
| **`title`**    | <code>string</code>                                      |
| **`start`**    | <code><a href="#date">Date</a></code>                    |
| **`end`**      | <code><a href="#date">Date</a></code>                    |
| **`location`** | <code>{ name: string; lat: number; lon: number; }</code> |
| **`notes`**    | <code>string</code>                                      |


#### EventDeleteOpts

| Prop        | Type                |
| ----------- | ------------------- |
| **`event`** | <code>string</code> |


#### EventListOpts

| Prop            | Type                                  |
| --------------- | ------------------------------------- |
| **`start`**     | <code><a href="#date">Date</a></code> |
| **`end`**       | <code><a href="#date">Date</a></code> |
| **`calendars`** | <code>string[]</code>                 |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>

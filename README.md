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
* [Interfaces](#interfaces)

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


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>

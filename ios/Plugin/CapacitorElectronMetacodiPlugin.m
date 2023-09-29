#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CapacitorElectronMetacodiPlugin, "CapacitorElectronMetacodi",
           CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestCalendarPermissions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(checkCalendarPermission, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createCalendar, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createCalendarEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateCalendarEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteCalendarEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(listCalendars, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(listCalendarEvents, CAPPluginReturnPromise);
)

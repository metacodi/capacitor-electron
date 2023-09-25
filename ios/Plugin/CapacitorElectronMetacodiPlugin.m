#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CapacitorElectronMetacodiPlugin, "CapacitorElectronMetacodi",
           CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestPermissionsCalendar, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(checkPermissionCalendar, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createCalendar, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(listCalendars, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(listEvents, CAPPluginReturnPromise);
)

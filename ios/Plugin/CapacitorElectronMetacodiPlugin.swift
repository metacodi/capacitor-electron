import Foundation
import Capacitor
import EventKit

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorElectronMetacodiPlugin)
public class CapacitorElectronMetacodiPlugin: CAPPlugin {
    private var implementation: CapacitorElectronMetacodi!
    private var eventStore: EKEventStore!
    private var transformer: Transformer!

    override public func load() { 
        eventStore = EKEventStore()
        implementation = CapacitorElectronMetacodi(store: eventStore!.self)
        transformer = Transformer()
        super.load()
    }

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }

   @objc func checkCalendarPermission(_ call: CAPPluginCall) {
        let state: String
        
        switch EKEventStore.authorizationStatus(for: EKEntityType.event) {
        case .notDetermined:
            state = "prompt"
        case .restricted, .denied:
            state = "denied"
        case .authorized:
            state = "granted"
        case .fullAccess:
            state = "granted"
        case .writeOnly:
            state = "granted"
        @unknown default:
            state = "prompt"
        }
        call.resolve(["status": state])
    
    }

    @objc func requestCalendarPermissions(_ call: CAPPluginCall) {
        if #available(iOS 17.0, *) {
            eventStore?.requestFullAccessToEvents { granted, error in
                if let error = error {
                    call.reject(error.localizedDescription)
                    return
                }
                if !granted {
                    call.reject("Access to events was denied")
                    return
                }
            }
            checkCalendarPermission(call);
        } else {
            eventStore?.requestAccess(to: EKEntityType.event) { [weak self] granted, error in
                if let error = error {
                    call.reject(error.localizedDescription)
                    return
                }
                if !granted {
                    call.reject("Access to events was denied")
                    return
                }
                self?.checkPermissions(call)
            }
        }
    }

    @objc func createCalendar(_ call: CAPPluginCall) {
        guard let name = call.getString("name") else {
            call.reject("Must provide a name for the calendar")
            return
        }
        do {
            let calendar = try self.implementation.createCalendar(name: name)
            call.resolve(self.transformer!.transformEKCalendar(calendar) as PluginCallResultData)
        } catch CapacitorElectronMetacodiError.NoCalendarSource {
            call.reject("Failed to create calendar: No source found")
        } catch {
            call.reject("Failed to create calendar: \(error)")
        }
    }

    @objc func createCalendarEvent(_ call: CAPPluginCall) {
        guard let calendar = call.getString("calendar") else {
            call.reject("Must provide a calendar name to associate the event")
            return
        }
        guard let start = call.getDate("start") else {
            call.reject("Must provide a start date for the event")
            return
        }
        guard let end = call.getDate("end") else {
            call.reject("Must provide an end date for the event")
            return
        }
        guard let title = call.getString("title") else {
            call.reject("Must provide a title for the event")
            return
        }
        var structuredLocation: EKStructuredLocation?
        if let location = call.getObject("location") {
            structuredLocation = EKStructuredLocation(title: location["name", default: "no location"] as! String)

            let location = CLLocation(
                latitude: location["lat", default: 0.0] as! CLLocationDegrees,
                longitude: location["lon", default: 0.0] as! CLLocationDegrees
            )

            structuredLocation?.geoLocation = location
        }
        guard let notes = call.getString("notes") else {
            call.reject("Must provide a notes for the event")
            return
        }
        guard let firstReminderMinutes = call.getDouble("firstReminderMinutes") else {
            call.reject("Must provide a firstReminderMinutes for the event")
            return
        }
        guard let secondReminderMinutes = call.getDouble("secondReminderMinutes") else {
            call.reject("Must provide a secondReminderMinutes for the event")
            return
        }
        do {
            let event = try self.implementation.createCalendarEvent(
                calendar: calendar, title: title, start: start, end: end, location: structuredLocation, notes: notes, firstReminderMinutes: firstReminderMinutes, secondReminderMinutes: secondReminderMinutes)
            call.resolve(self.transformer!.transformEKEvent(event) as PluginCallResultData)
        } catch {
            call.reject("Failed to create event: \(error)")
        }
    }

    @objc func updateCalendarEvent(_ call: CAPPluginCall) {
        guard let event = call.getString("event") else {
            call.reject("Must provide a event id")
            return
        }
        let start = call.getDate("start")
        let end = call.getDate("end")
        let title = call.getString("title")
        var structuredLocation: EKStructuredLocation?
        if let location = call.getObject("location") {
            structuredLocation = EKStructuredLocation(title: location["name", default: "no location"] as! String)
            let location = CLLocation(
                latitude: location["lat", default: 0.0] as! CLLocationDegrees,
                longitude: location["lon", default: 0.0] as! CLLocationDegrees
            )
            structuredLocation?.geoLocation = location
        }
        guard let notes = call.getString("notes") else {
            call.reject("Must provide a notes for the event")
            return
        }
        do {
            let event = try self.implementation.updateCalendarEvent(
                eventId: event, title: title, start: start, end: end, location: structuredLocation, notes: notes)
            call.resolve(self.transformer!.transformEKEvent(event) as PluginCallResultData)
        } catch {
            call.reject("Failed to update event: \(error)")
        }
    }

    @objc func deleteCalendarEvent(_ call: CAPPluginCall) {
        guard let event = call.getString("event") else {
            call.reject("Must provide a event id")
            return
        }
        do {
            try self.implementation.deleteCalendarEvent(eventId: event)
            call.resolve()
        } catch {
            call.reject("Failed to delete event: \(error)")
        }
    }

    @objc func listCalendars(_ call: CAPPluginCall) {
        let calendars = self.implementation.listCalendars().map {
            (calendar) -> [String: Any?] in self.transformer!.transformEKCalendar(calendar)
        }
        call.resolve(self.transformer!.transformList(calendars))
    }

    @objc func listCalendarEvents(_ call: CAPPluginCall) {
        guard let start = call.getDate("start") else {
            call.reject("Must provide a start date")
            return
        }
        guard let end = call.getDate("end") else {
            call.reject("Must provide an end date")
            return
        }
        guard let calendars = call.getArray("calendars") as? [String] else {
            call.reject("calendars must be an Array of string")
            return
        }

        let events = self.implementation.listCalendarEvents(start: start, end: end, calendars: calendars).map {
            (event) -> [String: Any?] in self.transformer!.transformEKEvent(event)
        }
        call.resolve(self.transformer!.transformList(events))
    }
}

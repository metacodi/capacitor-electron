import Foundation
import EventKit

enum CapacitorElectronMetacodiError: Error {
    case NoCalendarSource
    case NoCalendarForName(name: String)
    case NoEventFound(id: String)
}

@objc public class CapacitorElectronMetacodi: NSObject {

    private let store: EKEventStore!

    public init(store: EKEventStore) {
        self.store = store
    }

    @objc public func createCalendar(
        name: String
    ) throws -> EKCalendar {
        let source = try self.getCalendarSource()

        // Skip creation if calendar already exists
        let existingCalendar: EKCalendar? = self.getCalendarByName(name, source: source)
        if  existingCalendar != nil {
            print("calendar already exists. returning")
            return existingCalendar!
        }

        let calendar = EKCalendar(for: EKEntityType.event, eventStore: self.store)
        calendar.title = name
        calendar.source = source
        try self.store.saveCalendar(calendar, commit: true)
        return calendar
    }

    @objc public func createCalendarEvent(
        calendar: String,
        title: String,
        start: Date,
        end: Date,
        location: EKStructuredLocation?,
        notes: String?
    ) throws -> EKEvent {
        let source = try self.getCalendarSource()

        guard let calendar = self.getCalendarById(calendar, source: source) else {
            throw CapacitorElectronMetacodiError.NoCalendarForName(name: calendar)
        }

        // guard let calendar = self.getCalendarByName(calendar, source: source) else {
        //     throw CapacitorElectronMetacodiError.NoCalendarForName(name: calendar)
        // }

        let event = EKEvent(eventStore: self.store)
        event.calendar = calendar
        event.title = title
        event.startDate = start
        event.endDate = end
        event.structuredLocation = location
        event.notes = notes

        try self.store.save(event, span: EKSpan.thisEvent)
        return event
    }

    @objc public func updateCalendarEvent(
        eventId: String,
        title: String?,
        start: Date?,
        end: Date?,
        location: EKStructuredLocation?,
        notes: String?
    ) throws -> EKEvent {
        guard let event = self.store.event(withIdentifier: eventId) else {
            throw CalendarError.NoEventFound(id: eventId)
        }

        if title != nil {
            event.title = title
        }
        if start != nil {
            event.startDate = start
        }
        if end != nil {
            event.endDate = end
        }
        if location != nil {
            event.structuredLocation = location
        }
        if notes != nil {
            event.notes = notes
        }

        try self.store.save(event, span: EKSpan.thisEvent)
        return event
    }

    @objc public func deleteCalendarEvent(
        eventId: String
    ) throws {
        guard let event = self.store.event(withIdentifier: eventId) else {
            throw CapacitorElectronMetacodiError.NoEventFound(id: eventId)
        }
        try self.store.remove(event, span: EKSpan.thisEvent)
    }

    @objc public func listCalendars() -> [EKCalendar] {
        return self.store.calendars(for: EKEntityType.event)
    }

    @objc public func listCalendarEvents(
        start: Date,
        end: Date,
        calendars: [String]
    ) -> [EKEvent] {
        var calendarList = [EKCalendar]()
        for cal in self.listCalendars() {
            if calendars.contains(cal.calendarIdentifier) || calendars.contains(cal.title) {
                calendarList.append(cal)
            }
        }

        let predicate = self.store.predicateForEvents(
            withStart: start,
            end: end,
            calendars: calendarList.isEmpty ? nil : calendarList
        )

        return self.store.events(matching: predicate)
    }

    private func getCalendarByName(_ name: String, source: EKSource?) -> EKCalendar? {
        for cal in self.listCalendars() {
            if cal.title == name && cal.source == source {
                return cal
            }
        }
        return nil
    }

    private func getCalendarById(_ id: String, source: EKSource?) -> EKCalendar? {
        for cal in self.listCalendars() {
            if cal.calendarIdentifier == id && cal.source == source {
                return cal
            }
        }
        return nil
    }

    private func getCalendarSource() throws -> EKSource? {
        let defaultSource = self.store.defaultCalendarForNewEvents?.source
        let iCloud = self.store.sources.first(where: { $0.title == "iCloud" }) // this is fragile, user can rename the source
        let local = self.store.sources.first(where: { $0.sourceType == .local })
        if defaultSource == nil && local == nil && iCloud == nil {
            throw CapacitorElectronMetacodiError.NoCalendarSource
        }
        return defaultSource ?? iCloud ?? local
    }

    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}

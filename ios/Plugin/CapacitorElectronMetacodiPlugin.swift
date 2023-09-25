import Foundation
import Capacitor
import EventKit

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorElectronMetacodiPlugin)
public class CapacitorElectronMetacodiPlugin: CAPPlugin {
    private let implementation = CapacitorElectronMetacodi()
    private let eventStore: EKEventStore!

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }

    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        let state: String
        switch EKEventStore.authorizationStatus(for: EKEntityType.event) {
        case .notDetermined:
            state = "prompt"
        case .restricted, .denied:
            state = "denied"
        case .authorized:
            state = "granted"
        @unknown default:
            state = "prompt"
        }
        call.resolve(["status": state])
    }

    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        self.eventStore.requestAccess(to: EKEntityType.event) { [weak self] granted, error in
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

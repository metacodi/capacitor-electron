import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorElectronMetacodiPlugin)
public class CapacitorElectronMetacodiPlugin: CAPPlugin {
    private var implementation: CapacitorElectronMetacodi!

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }

   
}

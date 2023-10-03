package com.metacodi.plugin.capacitor.electron;

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.CalendarContract;
import android.provider.CalendarContract.Events;
import android.provider.CalendarContract.Instances;
import android.provider.CalendarContract.Calendars;
import android.text.TextUtils;
import android.text.format.DateUtils;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import com.google.gson.Gson;

@CapacitorPlugin(
    name = "CapacitorElectronMetacodi",
    permissions = {
        @Permission(strings = { Manifest.permission.READ_CALENDAR, Manifest.permission.WRITE_CALENDAR }, alias = "calendar")
    }
)
public class CapacitorElectronMetacodiPlugin extends Plugin {

    private CapacitorElectronMetacodi implementation = new CapacitorElectronMetacodi();

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }

    @PluginMethod
    public void checkCalendarPermission(PluginCall call) {
        String status = "";
        switch (getPermissionState("calendar")) {
          case GRANTED:
            status = "granted";
            break;
          case DENIED:
            status = "denied";
            break;
          case PROMPT:
            status = "prompt";
            break;
        }
        JSObject ret = new JSObject();
        ret.put("status", status);
        call.resolve(ret);
    }

    protected void requestPermissionsCalendar(PluginCall call) {
        requestPermissionForAlias("calendar", call, "calendarPermsCallback");
    }

    @PermissionCallback
    private void calendarPermsCallback(PluginCall call) {
        if (!(getPermissionState("calendar") == PermissionState.GRANTED)) {
            call.reject("Permission is required");
        }
    }

    @PluginMethod
    public void requestCalendarPermissions(PluginCall call) {
        requestPermissionsCalendar(call);
        
        checkCalendarPermission(call);
    }
}

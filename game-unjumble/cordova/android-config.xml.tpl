<?xml version='1.0' encoding='utf-8'?>
<widget id="{{app.id}}" version="{{app.version}}" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>{{app.name}}</name>
    <description>
        {{app.description}}
    </description>
    <author email="{{author.email}}" href="{{author.website}}">
        {{author.name}}
    </author>
    <content src="index.html" />
    <plugin name="cordova-plugin-whitelist" spec="1" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
    <preference name="Orientation" value="{{app.orientation}}" />
    <preference name="Fullscreen" value="true" />
    <preference name="xwalkVersion" value="14+" />
    <preference name="xwalkCommandLine" value="--disable-pull-to-refresh-effect" />
    <preference name="xwalkMode" value="embedded" />
    <preference name="xwalkMultipleApk" value="true" />
    <plugin name="dispatch-cordova-plugin-crosswalk-webview" spec="~1.4.1" />
</widget>


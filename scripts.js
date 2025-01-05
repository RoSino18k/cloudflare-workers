const keys = `["shopee.vn","tiktokv.com", "byteoversea.com", "tik-tokapi.com"]`;

addEventListener('fetch', function (event) {
    const { request } = event
    const response = handleRequest(request)
    event.respondWith(response)
})

async function handleRequest(request) {
    const ua = request.headers.get('user-agent')
    const profile = `<?xml version="1.0" encoding="utf-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
      <dict>
          <key>HasRemovalPasscode</key>
          <true />
          <key>PayloadContent</key>
          <array>
              <dict>
                  <key>PayloadDisplayName</key>
                  <string>Local Proxy</string>
                  <key>PayloadIdentifier</key>
                  <string>com.apple.proxy.http.global.76b20d80-4f32-4884-b606-c30bc8d376f6</string>
                  <key>PayloadType</key>
                  <string>com.apple.proxy.http.global</string>
                  <key>PayloadUUID</key>
                  <string>06b39a34-322c-4da0-80a0-0948688586bc</string>
                  <key>PayloadVersion</key>
                  <integer>1</integer>
                  <key>ProxyCaptiveLoginAllowed</key>
                  <true />
                  <key>ProxyPACURL</key>
                  <string>https://138.3.209.195:8001</string>
                  <key>ProxyType</key>
                  <string>Auto</string>
              </dict>
          </array>
          <key>PayloadDisplayName</key>
          <string>Proxy Profile</string>
          <key>PayloadIdentifier</key>
          <string>SINO.proxy</string>
          <key>PayloadOrganization</key>
          <string>RoSino18k</string>
          <key>PayloadRemovalDisallowed</key>
          <false />
          <key>PayloadType</key>
          <string>Configuration</string>
          <key>PayloadUUID</key>
          <string>a81803a5-c938-4929-b667-9aa61899cc88</string>
          <key>PayloadVersion</key>
          <integer>1</integer>
          <key>TargetDeviceType</key>
          <integer>1</integer>
      </dict>
  </plist>`
    let wpad = `var DIRECT = "DIRECT"; 
var PROXY = "PROXY 138.3.209.195:8001"; 
var keys = ${keys}; 
function FindProxyForURL(url, host) { 
  host = host.toLowerCase(); 
  for(var i = 0; i < keys.length; i++){ 
    var copyright = keys[i]; 
    if(shExpMatch(host, "*" + copyright + "*")){ 
      return "PROXY 138.3.209.195:8001; DIRECT";
    } 
  } 
  return DIRECT; 
}`
const homepage = "https://us.pacproxy.workers.dev/"
const url = request.url

    if ( url === `${homepage}profile`) {
        return new Response(profile, {
            headers: {
                "Content-Disposition": "attachment; filename=\"LK-Proxying.mobileconfig\"; filename*=UTF-8''LK-Proxying.mobileconfig",
                "Content-Type": "text/plain; charset=utf-8"
            }
        })
    } else if (url === homepage) {
        if (ua.startsWith("CFNetwork")) {
            return new Response(wpad, { status: 200 })
        } else {
            return new Response("404 Not Found", {
            status: 404
        })
        }
    } else {
        return new Response("404 Not Found", {
            status: 404
        })
    }

		}

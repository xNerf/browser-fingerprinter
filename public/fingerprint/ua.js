const getUserDetails = async () => {
    let clientHints = {};
    try { clientHints = await navigator.userAgentData?.getHighEntropyValues(["architecture","model","platformVersion","fullVersionList","bitness","wow64"]) || {}; } catch(e) {}
    const conn = navigator.connection||navigator.mozConnection||navigator.webkitConnection;
    let storage = {}; try { storage = await navigator.storage?.estimate()||{}; } catch(e) {}
    let battery = null; try { battery = await navigator.getBattery?.(); } catch(e) {}
    let devices = []; try { devices = await navigator.mediaDevices?.enumerateDevices()||[]; } catch(e) {}
    let canvasHash = ''; try { const c=document.createElement('canvas'),ctx=c.getContext('2d'); ctx.textBaseline='top'; ctx.font='14px Arial'; ctx.fillText('FP🖥️',2,2); canvasHash=c.toDataURL().slice(0,64); } catch(e) {}
    let webglVendor='',webglRenderer='',webglVersion='',glslVersion=''; try { const c=document.createElement('canvas'),gl=c.getContext('webgl')||c.getContext('experimental-webgl'); webglVendor=gl?.getParameter(gl.VENDOR)||''; webglRenderer=gl?.getParameter(gl.RENDERER)||''; webglVersion=gl?.getParameter(gl.VERSION)||''; glslVersion=gl?.getParameter(gl.SHADING_LANGUAGE_VERSION)||''; } catch(e) {}

    const lines = [
        `UA: ${navigator.userAgent}`,
        `App Name: ${navigator.appName}`,
        `App Version: ${navigator.appVersion}`,
        `App Code Name: ${navigator.appCodeName}`,
        `Platform: ${navigator.platform}`,
        `Vendor: ${navigator.vendor}`,
        `Vendor Sub: ${navigator.vendorSub}`,
        `Product: ${navigator.product}`,
        `Product Sub: ${navigator.productSub}`,
        `Language: ${navigator.language}`,
        `Languages: ${navigator.languages?.join(', ')}`,
        `Cookies Enabled: ${navigator.cookieEnabled}`,
        `Java Enabled: ${navigator.javaEnabled?.()}`,
        `Online: ${navigator.onLine}`,
        `Do Not Track: ${navigator.doNotTrack}`,
        `Hardware Concurrency: ${navigator.hardwareConcurrency}`,
        `Max Touch Points: ${navigator.maxTouchPoints}`,
        `PDF Viewer Enabled: ${navigator.pdfViewerEnabled}`,
        `WebDriver: ${navigator.webdriver}`,
        `Device Memory: ${navigator.deviceMemory} GB`,
        `Connection Type: ${conn?.type}`,
        `Effective Type: ${conn?.effectiveType}`,
        `Downlink: ${conn?.downlink} Mbps`,
        `RTT: ${conn?.rtt} ms`,
        `Save Data: ${conn?.saveData}`,
        `Screen Width: ${screen.width}`,
        `Screen Height: ${screen.height}`,
        `Available Width: ${screen.availWidth}`,
        `Available Height: ${screen.availHeight}`,
        `Color Depth: ${screen.colorDepth}`,
        `Pixel Depth: ${screen.pixelDepth}`,
        `Pixel Ratio: ${devicePixelRatio}`,
        `Orientation: ${screen.orientation?.type}`,
        `Orientation Angle: ${screen.orientation?.angle}`,
        `Inner Width: ${innerWidth}`,
        `Inner Height: ${innerHeight}`,
        `Outer Width: ${outerWidth}`,
        `Outer Height: ${outerHeight}`,
        `Screen X: ${screenX}`,
        `Screen Y: ${screenY}`,
        `CH Architecture: ${clientHints.architecture}`,
        `CH Model: ${clientHints.model}`,
        `CH Platform Version: ${clientHints.platformVersion}`,
        `CH Bitness: ${clientHints.bitness}`,
        `CH WoW64: ${clientHints.wow64}`,
        `CH Mobile: ${navigator.userAgentData?.mobile}`,
        `CH Platform: ${navigator.userAgentData?.platform}`,
        `CH Full Version List: ${JSON.stringify(clientHints.fullVersionList)}`,
        `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        `UTC Offset (min): ${new Date().getTimezoneOffset()}`,
        `Locale: ${Intl.DateTimeFormat().resolvedOptions().locale}`,
        `Calendar: ${Intl.DateTimeFormat().resolvedOptions().calendar}`,
        `Plugins: ${Array.from(navigator.plugins).map(p=>p.name).join(', ')}`,
        `MIME Types: ${Array.from(navigator.mimeTypes).map(m=>m.type).join(', ')}`,
        `Storage Quota: ${((storage.quota||0)/1024/1024).toFixed(2)} MB`,
        `Storage Usage: ${((storage.usage||0)/1024/1024).toFixed(2)} MB`,
        `Cameras: ${devices.filter(d=>d.kind==='videoinput').length}`,
        `Microphones: ${devices.filter(d=>d.kind==='audioinput').length}`,
        `Speakers: ${devices.filter(d=>d.kind==='audiooutput').length}`,
        `Battery Level: ${battery ? (battery.level*100).toFixed(0)+'%' : 'N/A'}`,
        `Battery Charging: ${battery?.charging ?? 'N/A'}`,
        `Charging Time: ${battery?.chargingTime ?? 'N/A'}`,
        `Discharging Time: ${battery?.dischargingTime ?? 'N/A'}`,
        `URL: ${location.href}`,
        `Referrer: ${document.referrer}`,
        `Canvas Hash: ${canvasHash}`,
        `WebGL Vendor: ${webglVendor}`,
        `WebGL Renderer: ${webglRenderer}`,
        `WebGL Version: ${webglVersion}`,
        `GLSL Version: ${glslVersion}`,
    ];

    const result = lines.join('\n');
    console.log(result);
    return result;
};

getUserDetails();
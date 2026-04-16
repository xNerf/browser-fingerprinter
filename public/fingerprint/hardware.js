const getHardwareDetails = async () => {
    const lines = [];

    lines.push(`Hardware Concurrency: ${navigator.hardwareConcurrency}`);
    lines.push(`Device Memory: ${navigator.deviceMemory} GB`);

    const conn = navigator.connection||navigator.mozConnection||navigator.webkitConnection;
    lines.push(`Connection Type: ${conn?.type}`);
    lines.push(`Effective Type: ${conn?.effectiveType}`);
    lines.push(`Downlink: ${conn?.downlink} Mbps`);
    lines.push(`Downlink Max: ${conn?.downlinkMax} Mbps`);
    lines.push(`RTT: ${conn?.rtt} ms`);
    lines.push(`Save Data: ${conn?.saveData}`);

    let battery = null; try { battery = await navigator.getBattery?.(); } catch(e) {}
    lines.push(`Battery Level: ${battery ? (battery.level*100).toFixed(0)+'%' : 'N/A'}`);
    lines.push(`Battery Charging: ${battery?.charging ?? 'N/A'}`);
    lines.push(`Charging Time: ${battery?.chargingTime ?? 'N/A'}`);
    lines.push(`Discharging Time: ${battery?.dischargingTime ?? 'N/A'}`);

    lines.push(`Screen Width: ${screen.width}`);
    lines.push(`Screen Height: ${screen.height}`);
    lines.push(`Available Width: ${screen.availWidth}`);
    lines.push(`Available Height: ${screen.availHeight}`);
    lines.push(`Color Depth: ${screen.colorDepth}`);
    lines.push(`Pixel Depth: ${screen.pixelDepth}`);
    lines.push(`Pixel Ratio: ${devicePixelRatio}`);
    lines.push(`Orientation Type: ${screen.orientation?.type}`);
    lines.push(`Orientation Angle: ${screen.orientation?.angle}`);

    lines.push(`Max Touch Points: ${navigator.maxTouchPoints}`);
    lines.push(`Pointer Type Coarse: ${window.matchMedia('(pointer: coarse)').matches}`);
    lines.push(`Pointer Type Fine: ${window.matchMedia('(pointer: fine)').matches}`);
    lines.push(`Hover Supported: ${window.matchMedia('(hover: hover)').matches}`);
    lines.push(`Any Hover: ${window.matchMedia('(any-hover: hover)').matches}`);
    lines.push(`Any Pointer Coarse: ${window.matchMedia('(any-pointer: coarse)').matches}`);

    lines.push(`Prefers Color Scheme Dark: ${window.matchMedia('(prefers-color-scheme: dark)').matches}`);
    lines.push(`Prefers Reduced Motion: ${window.matchMedia('(prefers-reduced-motion: reduce)').matches}`);
    lines.push(`Prefers Contrast: ${window.matchMedia('(prefers-contrast: more)').matches}`);
    lines.push(`Forced Colors: ${window.matchMedia('(forced-colors: active)').matches}`);
    lines.push(`Inverted Colors: ${window.matchMedia('(inverted-colors: inverted)').matches}`);
    lines.push(`Display Mode Standalone: ${window.matchMedia('(display-mode: standalone)').matches}`);
    lines.push(`HDR Support: ${window.matchMedia('(dynamic-range: high)').matches}`);
    lines.push(`Color Gamut P3: ${window.matchMedia('(color-gamut: p3)').matches}`);
    lines.push(`Color Gamut Rec2020: ${window.matchMedia('(color-gamut: rec2020)').matches}`);

    let devices = []; try { devices = await navigator.mediaDevices?.enumerateDevices()||[]; } catch(e) {}
    lines.push(`Cameras: ${devices.filter(d=>d.kind==='videoinput').length}`);
    lines.push(`Microphones: ${devices.filter(d=>d.kind==='audioinput').length}`);
    lines.push(`Speakers: ${devices.filter(d=>d.kind==='audiooutput').length}`);

    try {
        const ctx = new (window.AudioContext||window.webkitAudioContext)();
        lines.push(`Audio Sample Rate: ${ctx.sampleRate} Hz`);
        lines.push(`Audio Base Latency: ${ctx.baseLatency}`);
        lines.push(`Audio Output Latency: ${ctx.outputLatency}`);
        lines.push(`Audio Max Channel Count: ${ctx.destination.maxChannelCount}`);
        lines.push(`Audio Channel Count: ${ctx.destination.channelCount}`);
        lines.push(`Audio Channel Count Mode: ${ctx.destination.channelCountMode}`);
        lines.push(`Audio Channel Interpretation: ${ctx.destination.channelInterpretation}`);
        const osc = ctx.createOscillator();
        const analyser = ctx.createAnalyser();
        lines.push(`Audio FFT Size: ${analyser.fftSize}`);
        lines.push(`Audio Frequency Bin Count: ${analyser.frequencyBinCount}`);
        lines.push(`Audio Min Decibels: ${analyser.minDecibels}`);
        lines.push(`Audio Max Decibels: ${analyser.maxDecibels}`);
        ctx.close();
    } catch(e) { lines.push(`Audio: Blocked`); }

    try {
        const storage = await navigator.storage?.estimate()||{};
        lines.push(`Storage Quota: ${((storage.quota||0)/1024/1024).toFixed(2)} MB`);
        lines.push(`Storage Usage: ${((storage.usage||0)/1024/1024).toFixed(2)} MB`);
        const persisted = await navigator.storage?.persisted?.();
        lines.push(`Storage Persisted: ${persisted}`);
    } catch(e) { lines.push(`Storage: Blocked`); }

    try {
        const gpus = await navigator.gpu?.requestAdapter();
        lines.push(`GPU Adapter: ${gpus ? 'Available' : 'N/A'}`);
        lines.push(`GPU Fallback Adapter: ${gpus?.isFallbackAdapter}`);
        const info = await gpus?.requestAdapterInfo?.();
        lines.push(`GPU Vendor: ${info?.vendor}`);
        lines.push(`GPU Architecture: ${info?.architecture}`);
        lines.push(`GPU Device: ${info?.device}`);
        lines.push(`GPU Description: ${info?.description}`);
    } catch(e) { lines.push(`WebGPU: Blocked/Unsupported`); }

    lines.push(`Gamepad Count: ${navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean).length : 'N/A'}`);

    lines.push(`Vibration API: ${!!navigator.vibrate}`);
    lines.push(`Bluetooth API: ${!!navigator.bluetooth}`);
    lines.push(`USB API: ${!!navigator.usb}`);
    lines.push(`Serial API: ${!!navigator.serial}`);
    lines.push(`HID API: ${!!navigator.hid}`);
    lines.push(`NFC API: ${!!navigator.nfc}`);
    lines.push(`Wake Lock API: ${!!navigator.wakeLock}`);
    lines.push(`Share API: ${!!navigator.share}`);
    lines.push(`Clipboard API: ${!!navigator.clipboard}`);
    lines.push(`Keyboard API: ${!!navigator.keyboard}`);
    lines.push(`XR (VR/AR) API: ${!!navigator.xr}`);

    try {
        const mem = performance.memory;
        lines.push(`JS Heap Size Limit: ${mem ? (mem.jsHeapSizeLimit/1024/1024).toFixed(2)+' MB' : 'N/A'}`);
        lines.push(`JS Total Heap Size: ${mem ? (mem.totalJSHeapSize/1024/1024).toFixed(2)+' MB' : 'N/A'}`);
        lines.push(`JS Used Heap Size: ${mem ? (mem.usedJSHeapSize/1024/1024).toFixed(2)+' MB' : 'N/A'}`);
    } catch(e) {}

    lines.push(`High Resolution Timer: ${!!performance.now}`);
    lines.push(`Timer Resolution (ms): ${(() => { const t1=performance.now(),t2=performance.now(); return (t2-t1).toFixed(6); })()}`);

    const result = lines.join('\n');
    console.log(result);
    return result;
};

getHardwareDetails();
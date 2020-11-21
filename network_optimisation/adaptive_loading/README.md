# Beschreibung
Adaptive Loading
https://web.dev/adaptive-loading-cds-2019/

# TODO
Tests: 
- First Request (First time User)
- Subsequent Requests (Returning User)
- Performance Metriken: Time To First Byte, First Meaningful Paint, Dom Content Loaded, Server Response Time - unter simulierten Netzwerk Bedingungen z.B Network Throtting in Chrome

# Ergebnisse

Es wird nur Network Information API als Main Use-Case für Adaptive Loading in Betracht gezogen, da Hardware Concurrency bzw. Device Memory APIs eine anders Emulationssetting benötigen.- Hardware Concurrency kann evtl. mit Emulation.setCPUThrottlingRate in puppeteer getestet werden


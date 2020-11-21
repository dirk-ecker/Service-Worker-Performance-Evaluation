# Beschreibung
Vergleich der Cache Effizienz zwischen SW Cache und HTTP (Browser) Cache

# TODO
Tests: 
- First Request (First time User)
- Subsequent Requests (Returning User)
- Performance Metriken: Time To First Byte, First Meaningful Paint, Dom Content Loaded, Server Response Time 
- Evtl. experimentieren mit Cache Headers.

# Probleme

- Memory Cache Layer Deaktivieren ? Bei "Disable Cache" Option eingeschaltet, werden die Bilder vom obersten Cache Layer abgerufen (Memory Cache für Chrome) und nicht von HTTP-Cache.
  https://web.dev/service-worker-caching-and-http-caching/ (siehe "Overview of caching flow")  
  

# Ergebnisse




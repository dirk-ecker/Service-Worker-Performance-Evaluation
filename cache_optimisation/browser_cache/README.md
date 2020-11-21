# Beschreibung
Browser Cache Test. Bilder werden über img-Tag geladen.
Die erste Anfrage dient dem Cache Warm-Up. Für weitere Requests müssen die Performance Parameter gemessen werden. 

# TODO
- Memory Cache Layer Deaktivieren ? Bei "Disable Cache" Option eingeschaltet, werden die Bilder vom obersten Cache Layer abgerufen (Memory Cache für Chrome) und nicht von HTTP-Cache.
  https://web.dev/service-worker-caching-and-http-caching/ (siehe "Overview of caching flow")  
- Performance Metriken: Time To First Byte, First Meaningful Paint, Dom Content Loaded, Server Response Time
# Ergebnisse

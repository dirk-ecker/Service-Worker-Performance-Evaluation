# Beschreibung
SW Cache Test. Der index.js Script generiert img-Tags mit src Parameter. Parallel erzeugt der SW die Cache-Storage und liefert die Bidler direkt vom Cache. 
Die erste Anfrage dient dem Cache Warm-Up. Für weitere Requests müssen die Performance Parameter gemessen werden. 

# TODO
- Memory Cache Layer Deaktivieren ? Wenn im Browser die Option "Disable Cache" ausgewählt ist, werden Bilder vom "memory cache" im Chrome abgerufen. 
  https://web.dev/service-worker-caching-and-http-caching/ (siehe "Overview of caching flow")  
- Performance Metriken: Time To First Byte, First Meaningful Paint, Dom Content Loaded, Server Response Time.
- Evtl. experimentieren mit Cache Headers. 

# Ergebnisse

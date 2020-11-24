# Beschreibung
SW Cache Test. Der index.js Script generiert img-Tags mit src Parameter. Parallel erzeugt der SW die Cache-Storage und liefert die Bidler direkt vom Cache. 
Die erste Anfrage dient dem Cache Warm-Up. Für weitere Requests müssen die Performance Parameter gemessen werden. 



# TODO

- Performance Metriken: Time To First Byte, First Meaningful Paint, Dom Content Loaded, Server Response Time.

- Warum ist es so langsam ? Kommunikation zwischen main thread und SW überpfüfen
- Cache Header Manipulation und Cache Versionierung
 
# Ergebnisse
SW lädt Ressourcen langsamer als Browser Cache.

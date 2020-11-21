# Beschreibung

# TODO
Test NavigationStart, TTFB, Server Response, Navigation End.  

# Ergebnisse

Die Server Response ist aus 3 Kompnenten konstruiert worden: Header, Footer und ein Content Request. Dabei wurde dieses Request durchs Transform Stream gepipet, damit Rendering so schnell wie möglich starten könnte. 
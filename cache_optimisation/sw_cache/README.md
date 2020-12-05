# Description
Images are served as blob and appended into an <img> Element through fetch(), simuntaniously the image gets precached by Service Worker. After the reload images are delivered from Service Worker cache.

# Test procedure
### Start the test
- Start the server: `http-server .`
- Run test file: `node runPerfTest.js`
- Test results are written to text files
---------------------------------------
### Set-up
- _1st Test: High Quality Images ( x = 10,30,50 )_ Cache TTL= 1y
- _2nd Test: Low Quality Images ( x = 10,30,50 )_  Cache TTL = 1y
-  Each test contains 2 cycles: Cache warm-up (First Time User) / Cached response (Returning User)
-  Each test is repeated N times (N=50)
---------------------------------------
### Metrics
- First Paint
- First Contentful Paint
- Resource Timing (Response End - Fetch Start)

### To do
- Min time, max time, total timing
- Justification for N,x
- Another metrics ?
# Results
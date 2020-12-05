# Description
Image is served through HTML select element. Select element is used after the DOM is fully loaded. The goal of this experiment is to measure the image resource timing under different network conditions.

# Test procedure
### Start the test
- Start the server: `http-server .`
- Run test file: `node runPerfTest.js`
- Test results are written to text files
---------------------------------------
### Set-up
- _1st Test: "Good" Network ( 4G )_ (`Regular4g` in Puppeteer)
- _2nd Test: "Average" Network ( 3G )_ (`Regular3g` in Puppeteer)
- _3d Test: "Bad" Network ( 2G and lower )_ (`Regular2g` in Puppeteer)

-  In case of SW regulating image loading, the images will be fetched from specified directory according to available network speed.
    - 2G: image size: 28,3KB
    - 3G: image size: 53,9KB
    - 4G: image size: 61,3KB

-  Each test is repeated N times (N=50)
---------------------------------------
### Metrics
- Resource Timing (Response End - Fetch Start)

### To do
- Max Time, Min Time, Average
- Resource Path
- SW Events in the console
- Another metrics ?
# Results

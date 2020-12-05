# Description
This an multi-page application (MPA) based on Nunjucks templating system. Usually an MPA employs servers-side rendering, where every time a navigation request is made, the HTML is rendered ready on the server and sent to the client.

The Service Worker does the precaching for static elements of the page and serves them from cache for the next request. Also the Service Worker puts together a request response by combining static and dynamic elements of the page. Additionally the response is put through the Transform Stream (represented as Readable and Writable in the code) to possibly accelerate the rendering times.

# Test procedure
### Start the test
- Start the server: `node app.js`
- Run test file: `node runPerfTest.js`
- Test results are written to text files
---------------------------------------
### Set-up
- User Profile: First Time User only
- Each time the app goes through the following cycle:
    - Initial request - Home Page (Cache warm-up)
    - Navigation request - Content1 (SW composite response)
- Ressource Timing for M number of ressources to possibly reveal the difference in DOM Complete or Document Load?
- Each test is repeated N times (N=50)
---------------------------------------
### Metrics
- First Paint
- First Contentful Paint
- DOM Content Loaded
- DOM Complete
- Document Load

### To do
- Ressource Timing ? 
- SW Events in the console
- Another metrics ?
# Results

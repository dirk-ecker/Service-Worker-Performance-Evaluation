# spa-v-sw

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
------------------------------------------------------------------------------

# Project Description
The traditional Single-Page-Application (SPA) architecture employs client side rendering, where dynamic content is updated asynchronously and JS modifies the UI on the client side. 

# Test procedure
### Start the test
- Start the server: `http-server -p 8080 -c-1 ./dist`
- Run test file: `node ../tests/runPerfTest.js`
- Test results are written to text files
---------------------------------------
### Set-up
- User Profile: First Time User and Returning User
- Each time the app goes through the following cycle:
    - Initial request - Home Page (Cache warm-up / First Time User)
    - Navigation request - Content1 (SW composite response)
    - Reload - App Shell gets reloaded
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
- Navigation Request timing ?
- SW Events in the console
- Another metrics ?
# Results

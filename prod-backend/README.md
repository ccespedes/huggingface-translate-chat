###### setup:
npm init -y
npm i express
npm i @huggingface/inference

run: 
node server.js


###### setup nodemon hot reload in dev backend:
npm i --save-dev nodemon

run: 
npx nodemon server.js


###### setup cPanel Node.js to recognize ES Module in prod backend:
1. Create loader.cjs in your root.

2. Import your main file dynamically into the loader.cjs:
async function loadApp() {
  await import('./server.js');
}
loadApp();

3. Go to your Node App in cPanel

4. In the "Application startup file", replace your main file with loader.cjs

5. Save and restart your app.


References
Getting Data from the Backend (Node.js/Express) to the Frontend (JavaScript)
https://www.youtube.com/watch?v=C_vv1D5oDZ0

React proxy
https://www.youtube.com/watch?v=N4yUiQiTvwU

Deploy a Node.js App on Shared Hosting via cPanel | Tutorial
https://www.youtube.com/watch?v=emDCYo5Rz0E

Fixing ES module problem on cPanel Node.js
https://www.reddit.com/r/node/comments/12ar8q1/why_is_my_app_breaking_after_being_deployed/

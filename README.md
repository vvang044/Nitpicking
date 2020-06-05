Title: Nitpicking
Automation tool that utilizes puppeteer and spelling API to catch any typos in the assets coded by Developers

Getting Started :
These instructions will get you started in using this tool. By running this tool puppeteer will take a screenshot of the element you are going to QA and scrape all the content of the asset. This asset can be Section A1,A2,A3 or the entire Section A, Section B or Section C. This tool will be running on your local machine.

Prerequisites:
Install node and puppeteer, express

Installation:
```
npm node
npm init
npm puppeteer
npm express
```
with latest "node udpate you don't need to type 'install'..... npm install node"

Running the tests:
Step 1: in the command line depending on the asset you are going to QA run that scraper file. For instance:
```
node aOneScraper.js or node aFullScraper.js
```
this will scrape the assets of Section A1 or entire Section A depends on the file you run

Step 2: The scrape result will be written to a "aOneResult.json" file(file name varies depending on which scrape file you are running). Check if that json file was generated. Check if you see any errors. If the file is not generated you should see error message in the command line.

Step 3: Start the server. 
```
node server.js
```
Step 4: go to localhost:8083

Step 5: If you see an "alert" on page load check command line for errors. If not you should see Asset Header and Asset Description with background color back and red text, if there are typos

Step 6: Grab asset provided by creative team. Drag and drop the asset in "Drag N Drop" section provided and compare both the assets. Coded By Dev Vs From Creative.

```
Asset Header:
Description:
Link:
Tracking:
Scene 7:
Aria Label:
Image Alt:
```
All these sections will be populated. 

Happy Nitpicking !!!


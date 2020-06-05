const puppeteer = require('puppeteer');
const fs = require('fs');

( async () => {
   // console.log("I'm inside async function")
   //start the brower and launch it 
   const browser = await puppeteer.launch({
        defaultViewport: {width: 1263, height: 780}
});

// const browser = await puppeteer.launch();

  const page = await browser.newPage();
  //access the page url 

  await page.goto('https://www.vitaminshoppe.com');

  const el = await page.$('.hp_section2');
    await el.screenshot({ path: './public/captureB1.png'});

 try{

 }catch(error){
     console.error("This is Bonkers!!!! Something went wrong");
 }


















})();
  //  console.log("I'm outside async function")
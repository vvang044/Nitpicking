const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  //start the brower and launch it 
  const browser = await puppeteer.launch();
  //open a new page
  const page = await browser.newPage();
  //access the page url 
  await page.goto('https://preview.vitaminshoppe.com');
//  await page.screenshot({path: 'aOneOne.png', clip:{x:10, y:175, width: 453, height: 304}});
//  await elementHandle.screenshot({path: 'aTwo.png', clip:{x:-290, y:-15, width: 343, height: 156}});
// const el = await page.$('hp_bb_right_a2'); //screenshot of A2
 //   const el = await page.$('.hp_bb_content_wrapper'); //class got changed
    const el = await page.$('.hp_bb_left_a1');
    await el.screenshot({ path: './public/captureA1.png'});
  try {
    // try to go to URL or catch the error
    await page.goto(pageURL);
    console.log("opened the page: VSI ");
  } catch (error) {
    console.error("%cFailed to open: VSI", 'color:red;');
  }

    const aOneHeader = await page.evaluate(()=>
    Array.from(document.querySelectorAll('div.hp_bb_left_a1_content h2'))
    .map(partner=>partner.innerText)
    )
  
  // console.log(aOneHeader); //gives header

    const aOnepara = await page.evaluate(()=>
      Array.from(document.querySelectorAll('div.hp_bb_left_a1_content p')).map(text=>text.innerText.replace(/[""]|\n/g,' '))
  )
 //   console.log(aOnepara); //gives paragraph
    
    const aOneLink = await page.evaluate(()=>
     Array.from(document.querySelector("section[class='hp_bb']>a").href).join().replace(/,/g,'')  
    )
 //   console.log(aOneLink); gives me the link

    const aOneTracking = await page.evaluate(()=>
       {
         let data = document.querySelector("section[class='hp_bb']>a").dataset
         let something = Object.values(data);
         return something;
       }
    )
  // console.log(aOneTracking); //an array with single object 

    const aOneImg = await page.evaluate(()=>
        document.querySelector('.hp_bb_left_a1 img').src
    )
     // console.log(aOneImg);

     const aOneAriaLabel = await page.evaluate(()=>
        document.querySelector('.hp_bb a').getAttribute('aria-label'))
    // console.log(aOneAriaLabel);

    const aOneImageAlt = await page.evaluate(()=>
    document.querySelector('.hp_bb_left_a1 img').alt   
 )
      // console.log(aOneImageAlt);
       
          const writeStream = fs.createWriteStream('./public/aOneResult.json', { flag : "a" });
                writeStream.write(`[
                  {
                      "header":"${aOneHeader}",
                      "paragraph": "${aOnepara}",
                      "link": "${aOneLink}",
                      "tracking": "${aOneTracking}",
                      "scene7": "${aOneImg}",
                      "arealabel": "${aOneAriaLabel}",
                      "imageAlt": "${aOneImageAlt}"
                      
                    }
                  ]`
                
                )


  writeStream.on('finish', () => {
    console.log("wrote all the array data to file results.js");
  });

  // handle the errors on the write process
  writeStream.on('error', () => {
    console.error("There is an error writing the file")
  });

  writeStream.end();

  await browser.close();
})();















//****************second attempt work
//this works gives an array of entire text inside A1 section
// const aOne = await page.evaluate(()=>
//     Array.from(document.querySelectorAll(".hp_bb_left"))
//         .map(partner=>partner.innerText.replace(/\n/g,' '))
// )
// console.log(aOne); // ['Celebrate #NationalChocolateChipDay with  20% OFF  guilt-free treats!  Shop Now']


// this works with out the text in that section
//  const aOne = await page.evaluate(
//       () => document.querySelector('.hp_bb_left_a1_content').textContent);
//  console.log(aOne);  //gives you the entire A1Section
 
//this works but with \n\n\
//   const aOne = await page.evaluate(
//       () => Array.from(document.querySelectorAll('.hp_bb_left_a1_content'))
//        .map((text)=>text.innerText));
// console.log(aOne);

//this works with lot of spacing
//   const textsArray = await page.evaluate(
//     () => [...document.querySelectorAll('.hp_bb_left_a1_content')].map(elem => elem.innerText).join('\n')
//   );
//   console.log(textsArray)
//***************second attempt ends here

//***************first attempt didnt work
// const puppeteer = require('puppeteer');

// async function scrapeWrappers(url){
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url)
//     //grab the xpath and do desctructuring
//     const [el] = await page.$x('//*[@id="site-body"]/div[2]/div/modular-page-component/div/div/div[1]/div/section/a/div');
//     const src = await el.getProperty('src');
//     const srcTxt = await src.jsonValue();    
//     console.log(srcTxt);
// }

// scrapeWrappers('https://preview.vitaminshoppe.com')
// const innerText = await page.evaluate(() => document.querySelector('.hp_bb_left p').textContent);

//******************first attempt ends here
const puppeteer = require('puppeteer');
const fs = require('fs');

(async ()=>{
   //    console.log("i'm inside async function")
const browser = await puppeteer.launch({
    defaultViewport: {width: 1920, height: 1080}
});
// open a new page
const page = await browser.newPage();
//access the page url
await page.goto('https://preview.vitaminshoppe.com');

//target the element with class or id
const el = await page.$('.hp_bb');
await el.screenshot({path: './public/captureAFullTest.png'}); //works takes the entire screenshot of A1A2A3
try{
    //try to go to URL or catch the error
    await page.goto(pageURL);
    console.log("Opened the page: VSI");
} catch(error){
    console.error('%c Failed to open: VSI', 'color:red;');
}

//Section A1 starts here
const aOneHeader = await page.evaluate(()=>
Array.from(document.querySelectorAll('div.hp_bb_left_a1_content h2'))
.map(partner=>partner.innerText)
)// console.log(aOneHeader); //gives header

const aOnepara = await page.evaluate(()=>
    Array.from(document.querySelectorAll('div.hp_bb_left_a1_content p')).map(text=>text.innerText.replace(/\n|[""]/g,' '))
)//   console.log(aOnepara); //gives paragraph

const aOneLink = await page.evaluate(()=>
 Array.from(document.querySelector("section[class='hp_bb']>a").href).join().replace(/,/g,'')  
) //console.log(aOneLink); gives me the link

const aOneTracking = await page.evaluate(()=>
   {
     let data = document.querySelector("section[class='hp_bb']>a").dataset
     let something = Object.values(data);
     return something;
   }
)//console.log(aOneTracking); //an array with single object 

const aOneImg = await page.evaluate(()=>
    document.querySelector('.hp_bb_left_a1 img').src
)// console.log(aOneImg);

 const aOneAriaLabel = await page.evaluate(()=>
    document.querySelector('.hp_bb a').getAttribute('aria-label')
    )

 const aOneImageAlt = await page.evaluate(()=>
    document.querySelector('.hp_bb_left_a1 img').alt   
 )
//section A1 ends here

//Section A2 starts here
//grab the h2 tag from a2
const aTwoHeader = await page.evaluate(()=>
    Array.from(document.querySelectorAll('div.hp_bb_right_a2 h2')).map(partner=>partner.innerText)
)// console.log(aTwoHeader); //output's the header a2 20% off or something

//grab the p tags from a2
const aTwopara = await page.evaluate(()=>
Array.from(document.querySelectorAll('div.hp_bb_right_a2 p'))
    .map(partner=>partner.innerText.replace(/\n|[""]/g,' '))
)//console.log(aTwopara); //outputs the para men's health favorites

const aTwoLink = await page.evaluate(()=>
     Array.from(document.querySelector(".hp_bb_right>a").href).join().replace(/,/g,'')  
    ) //console.log(aTwoLink);

const aTwoTracking = await page.evaluate(()=>{
    let data = document.querySelector('.hp_bb_right>a').dataset;
    let something = Object.values(data);
    return something
}
) //console.log(aTwoTracking); //gives tracking

const aTwoImg = await page.evaluate(()=>
    document.querySelector('.hp_bb_right_a2 img').src
)//console.log(aTwoImg)

const aTwoImageAlt = await page.evaluate(()=>
    document.querySelector('.hp_bb_right_a2 img').alt    
)

const aTwoAriaLabel = await page.evaluate(()=>
    document.querySelector('.hp_bb_right a').getAttribute('aria-label')
) // console.log(aTwoAriaLabel);

//Section A2 ends here




//Section A3 starts here
const aThreeHeader = await page.evaluate(()=>
    Array.from(document.querySelectorAll('div.hp_bb_right_a3 h2')).map(partner=>partner.innerText)
) //console.log(aThreeHeader);

const aThreepara = await page.evaluate(()=>
    Array.from(document.querySelectorAll('div.hp_bb_right_a3 p')).map(text=>text.innerText.replace(/\n|[""]/g,' '))
) //console.log(aThreepara);

const aThreeLink = await page.evaluate(()=>
    Array.from(document.querySelectorAll('.hp_bb_right a')).pop().href
) //console.log(aThreeLink);

const aThreeTracking = await page.evaluate(()=>{
    let aThreeData = Array.from(document.querySelectorAll('.hp_bb_right a')).pop().dataset
    let aThreeSomething = Object.values(aThreeData);
    return aThreeSomething;
}) // console.log(aThreeTracking);

const aThreeImg = await page.evaluate(()=>
    document.querySelector('.hp_bb_right_a3 img').src
) //console.log(aThreeImg);

const aThreeImageAlt = await page.evaluate(()=>
    document.querySelector('.hp_bb_right_a3 img').alt
)
const aThreeAriaLabel = await page.evaluate(()=>{
    let ariaLabel = Array.from(document.querySelectorAll('.hp_bb_right a')).pop()
    return ariaLabel.getAttribute('aria-label')
}) //console.log(aThreeAriaLabel);

//Section A3 ends here

//write all the variables to json file

const writeStream = fs.createWriteStream('./public/aFullResult.json', {flag: "a"});
      writeStream.write(`[
        {
            "header":"${aOneHeader}",
            "paragraph": "${aOnepara}",
            "link":"${aOneLink}",
            "tracking":"${aOneTracking}",
            "scene7":"${aOneImg}",
            "arealabel":"${aOneAriaLabel}",
            "imageAlt":"${aOneImageAlt}"
            
          },
          {
            "header":"${aTwoHeader}",
            "paragraph": "${aTwopara}",
            "link":"${aTwoLink}",
            "tracking":"${aTwoTracking}",
            "scene7":"${aTwoImg}",
            "arealabel":"${aTwoAriaLabel}",
            "imageAlt":"${aTwoImageAlt}"
            
          },
          {
            "header":"${aThreeHeader}",
            "paragraph": "${aThreepara}",
            "link":"${aThreeLink}",
            "tracking":"${aThreeTracking}",
            "scene7":"${aThreeImg}",
            "arealabel":"${aThreeAriaLabel}",
            "imageAlt":"${aThreeImageAlt}"
           
          }
      ]`
      )

      writeStream.on('finish', ()=>{
          console.log("wrote all the data to the file aFullResult.js");
      })

      //handle the erros on the write process
      writeStream.on('error', ()=>{
          console.error("There is an error writing the file")
      })








await browser.close();
})();
  //     console.log("i'm outside async function ")
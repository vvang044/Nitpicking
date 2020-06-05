async function run(){
    //console.log("I'm inside async function")

    try{
        //frist fetch call to grab all the data from the json file
        const webScrapeResponse =  await fetch('./aFullResult.json')
        const webScrapeJson = await webScrapeResponse.json();
        document.getElementById("aOneheader").innerHTML = webScrapeJson[0].header;
        document.getElementById("aOnedescription").innerHTML = webScrapeJson[0].paragraph.replace(/,/g, ' ')
        document.getElementById("aOnelink").innerHTML = webScrapeJson[0].link;
        document.getElementById("aOnearialabel").innerHTML = webScrapeJson[0].arealabel;
        document.getElementById("aOneimageAlt").innerHTML = webScrapeJson[0].imageAlt;
        document.getElementById("aOnetracking").innerHTML = webScrapeJson[0].tracking;
        document.getElementById("aOneseceneSeven").innerHTML = webScrapeJson[0].scene7;

        document.getElementById("aTwoheader").innerHTML = webScrapeJson[1].header;
        document.getElementById("aTwodescription").innerHTML = webScrapeJson[1].paragraph.replace(/,/g, ' ')
        document.getElementById("aTwolink").innerHTML = webScrapeJson[1].link;
        document.getElementById("aTwoarialabel").innerHTML = webScrapeJson[1].arealabel;
        document.getElementById("aTwoimageAlt").innerHTML = webScrapeJson[1].imageAlt;
        document.getElementById("aTwotracking").innerHTML = webScrapeJson[1].tracking;
        document.getElementById("aTwoseceneSeven").innerHTML = webScrapeJson[1].scene7;

        document.getElementById("aThreeheader").innerHTML = webScrapeJson[2].header;
        document.getElementById("aThreedescription").innerHTML = webScrapeJson[2].paragraph.replace(/,/g, ' ')
        document.getElementById("aThreelink").innerHTML = webScrapeJson[2].link;
        document.getElementById("aThreearialabel").innerHTML = webScrapeJson[2].arealabel;
        document.getElementById("aThreeimageAlt").innerHTML = webScrapeJson[2].imageAlt;
        document.getElementById("aThreetracking").innerHTML = webScrapeJson[2].tracking;
        document.getElementById("aThreeseceneSeven").innerHTML = webScrapeJson[2].scene7;

        let aOneheader = document.getElementById("aOneheader").textContent.replace(/,|\n|&/g,' ').split(' ').filter(Boolean)
        let aTwoheader = document.getElementById("aTwoheader").textContent.replace(/,|\n|&/g,' ').split(' ').filter(Boolean)
        let aThreeheader = document.getElementById("aThreeheader").textContent.replace(/,|\n|&/g,' ').split(' ').filter(Boolean)
        // console.log(aThreeheader);

        let myConcatHeaders = (aOneheader.concat(aTwoheader,aThreeheader)).join(' ');
      //  console.log(myConcatHeaders)

        const apiHeadersResp = await fetch("https://montanaflynn-spellcheck.p.rapidapi.com/check/?text="+myConcatHeaders,{
                "method": "GET",
                "headers": {
                "x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
                "x-rapidapi-key": "8f2483fc8amshbd2f8b5dcd9b53dp12023fjsn7bbcab608cd4"
                  }
                });

        const apiHeadersData = await apiHeadersResp.json();
        const apiHeadersArray = apiHeadersData.suggestion.split(' ')
    //    // console.log(apiHeadersArray)
        
        let matchMakerOne = aOneheader.map(function(word ){
            // console.log(word,index)
            if(!apiHeadersArray.includes(word)){
                return `
                  <span style="background-color:black; color:red"> 
                      ${word} 
                  </span>
                `
              } else {
                return word
              }
        })
        document.getElementById("aOneheader").innerHTML = matchMakerOne.join('&nbsp;');

        
        let matchMakerTwo = aTwoheader.map(function(word ){
            // console.log(word,index)
            if( !apiHeadersArray.includes(word) ){
                return `
                  <span style="background-color:black; color:red"> 
                      ${word} 
                  </span>
                `
              } else {
                return word
              }
        })
        document.getElementById("aTwoheader").innerHTML = matchMakerTwo.join('&nbsp;');

        let matchMakerThree = aThreeheader.map(function(word){
            // console.log(word,index)
            if( !apiHeadersArray.includes(word )){
                return `
                  <span style="background-color:black; color:red"> 
                      ${word} 
                  </span>
                `
              } else {
                return word;
              }
        })
        document.getElementById("aThreeheader").innerHTML = matchMakerThree.join('&nbsp;');

    } catch(error){
        alert("This is Bonkers!!! Something went wrong")

    }

    try{

        let aOnedescription = document.getElementById("aOnedescription").textContent.replace(/,|\n|&/g,'').split(' ').filter(Boolean)
        let aTwodescription = document.getElementById("aTwodescription").textContent.replace(/,|\n|&/g,'').split(' ').filter(Boolean)
        let aThreedescription = document.getElementById("aThreedescription").textContent.replace(/,|\n|&/g,'').split(' ').filter(Boolean)
    //    console.log(aTwodescription)
    //    console.log(aThreedescription)
        let myConcatDesc = (aOnedescription.concat(aTwodescription,aThreedescription)).join(' ');
     //    console.log(myConcatDesc)

        const apiRespDesc = await fetch("https://montanaflynn-spellcheck.p.rapidapi.com/check/?text="+myConcatDesc,{
                "method": "GET",
                "headers": {
                "x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
                "x-rapidapi-key": "8f2483fc8amshbd2f8b5dcd9b53dp12023fjsn7bbcab608cd4"
                  }
                });

        const apiDataDesc = await apiRespDesc.json();
        const apiDataArrayDesc = apiDataDesc.suggestion.replace(/\,/g, ' ').split(' ')
      //  console.log(apiDataArrayDesc)
        
        let matchMakerFour = aOnedescription.map(function(word){
            // console.log(word,index)
            if( apiDataArrayDesc.indexOf(word) === -1 ){
                return `
                  <span style="background-color:black; color:red"> 
                      ${word} 
                  </span>
                `
              } else {
                return word
              }
        })
        document.getElementById("aOnedescription").innerHTML = matchMakerFour.join('&nbsp;');


        let matchMakerFive = aTwodescription.map(function(word){
            // console.log(word,index)
            if( apiDataArrayDesc.indexOf(word) === -1 ){
                return `
                  <span style="background-color:black; color:red"> 
                      ${word} 
                  </span>
                `
              } else {
                return word
              }
        })
        document.getElementById("aTwodescription").innerHTML = matchMakerFive.join('&nbsp;');

        
        let matchMakerSix = aThreedescription.map(function(word){
            // console.log(word,index)
            if( apiDataArrayDesc.indexOf(word) === -1 ){
                return `
                  <span style="background-color:black; color:red"> 
                      ${word} 
                  </span>
                `
              } else {
                return word
              }
        })
        document.getElementById("aThreedescription").innerHTML = matchMakerSix.join('&nbsp;');



    }catch(error){
        alert("This is Bonkers!! Something went wrong in the second half")
    }


        


    
} run();
    //console.log("I'm outside async function")
    
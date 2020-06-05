async function run(){
    //console.log("I'm inside async")

    try{
      //first fetch call to grab all the data from the json file
      const webScrapeResponse =  await fetch('./aOneResult.json')
      const webScrapeJson = await webScrapeResponse.json();
      //assign all the data to their id's
      document.getElementById("header").innerHTML = webScrapeJson[0].header
      document.getElementById("description").innerHTML = webScrapeJson[0].paragraph.replace(/,/g, ' ')
      document.getElementById("link").innerHTML = webScrapeJson[0].link
      document.getElementById("tracking").innerHTML = webScrapeJson[0].tracking
      document.getElementById("sceneSeven").innerHTML =  webScrapeJson[0].scene7
      document.getElementById("arialabel").innerHTML = webScrapeJson[0].arealabel
      document.getElementById("aOneimageAlt").innerHTML = webScrapeJson[0].imageAlt;


      //the second fetch call to the api for the Asset Header
      const apiheaderResp =  await fetch("https://montanaflynn-spellcheck.p.rapidapi.com/check/?text="+webScrapeJson[0].header,{
       "method": "GET",
        "headers": {
          "x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
          "x-rapidapi-key": "8f2483fc8amshbd2f8b5dcd9b53dp12023fjsn7bbcab608cd4"
                  }
                });
      const apiheaderData = await apiheaderResp.json();
    //  console.log(apiheaderData.suggestion)
      let initial = document.getElementById("header").textContent.toLowerCase().split(' ');
    //  console.log(initial); //gives you an array
      let apiheaderSuggestion = apiheaderData.suggestion.split(' ');
    //  console.log(apiheaderSuggestion); //gives you proper string
      let matchMaker = initial.map(function(word, index){
        //console.log(word, index)
            if( word !== apiheaderSuggestion[index]){
               return `
                  <span style="background-color:black; color:red; padding:2px; border-radius:2px;">
                     ${word}
                  </span>
               `
            } else {
               return word
            }
     })
         document.getElementById("header").innerHTML = matchMaker.join('&nbsp;')
   // //    //the second fetch call to the api for the Asset Header end here ********
  

   //the third fetch call to the api for asset paragraph starts here
      const paragraphJson = webScrapeJson[0].paragraph.replace(/,/g, ' ')
   // console.log(paragraphJson);
      const apiParagraphResp =  await fetch("https://montanaflynn-spellcheck.p.rapidapi.com/check/?text="+paragraphJson,{
       "method": "GET",
        "headers": {
          "x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
          "x-rapidapi-key": "8f2483fc8amshbd2f8b5dcd9b53dp12023fjsn7bbcab608cd4"
                  }
                });
                const apiParagraphData = await apiParagraphResp.json();
             //   console.log(apiParagraphData.suggestion)

             let initialParagraph = document.getElementById("description").textContent.split(' ');
             //     console.log(initialParagraph);
             let apiParagraphSuggestion = apiParagraphData.suggestion.split(' ');
             //     console.log(apiParagraphSuggestion);
             let paragraphMatchMaker = initialParagraph.map(function(para, index){
               //     console.log(para, index)
                        if( para !== apiParagraphSuggestion[index]){
                           return `
                              <span style="background-color:black; color:red; padding:2px; border-radius:2px;">
                                 ${para}
                              </span>
                           `
                        } else {
                           return para
                        }
                 })
                    document.getElementById("description").innerHTML = paragraphMatchMaker.join('&nbsp;')
            





  //the third fetch call to the api for asset paragraph ends here

         //catch errors if the scrape or fetch calls faile
               } catch{
                 // alert("This is Bonkers!!! Something went wrong")
                  `
                  <div class="alert alert-danger" role="alert">
                        This is Bonkers!!! Something went wrong
                  </div>
                  `


               }


      //drag and drop starts here
      const dropZone = document.querySelector('#drop-zone');
      const dropInput = document.querySelector('#drop-zone input');
      const resultContainer = document.querySelector('#result-container');
      let imagePreview = "";
      
      function renderPreview(file) {
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        imagePreview =  URL.createObjectURL(file);
        const img = document.createElement('img');
    //    const title = document.createElement('p');
        img.src = imagePreview;
     //   title.textContent = file.name;
        resultContainer.innerHTML = "";
     //   resultContainer.append(title);
        resultContainer.append(img);
      }
      
      document.addEventListener('dragover', function(e) {
        e.preventDefault();
      });
      
      document.addEventListener('drop', function(e) {
        e.preventDefault();
      });
      
      dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
          renderPreview(e.dataTransfer.files[0]);
        }
      });
      
      dropInput.addEventListener('change', function(e) {
        if (e.target.files[0]) {
           renderPreview(e.target.files[0]);
        }
      });
      
   //    //drag and drop ends here











}
run();
   //console.log("I'm outside async")







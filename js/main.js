// Creating the main container
const container = document.createElement('div');
container.classList.add('container');

const fetchData = async () => {
    const url= "https://dog.ceo/api/breed/hound/images/random" 
    const promise = await fetch(url)
    const data = await promise.json()

    console.log(data.message)

    return data.message
}

// Function to generate a wiki item template
async function createWikiItemTemplate() {
    const imageUrl = await fetchData()
    const paths = imageUrl.split('/');

// getting the breed name from the path and it is the second to last repository
    const breed = paths[paths.length - 2].split('-');
    const breedName = breed[1]+"_"+breed[0]
    

    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${breedName}`;

    // Create the wiki item
    const wikiItem = document.createElement('div');
    wikiItem.classList.add('wiki-item');

    // Create the header
    const header = document.createElement('h1');
    header.classList.add('wiki-header');
    header.textContent = breedName;

    // Create the content container
    const content = document.createElement('div');
    content.classList.add('wiki-content');

    // Create the text paragraph
    const wikiText = document.createElement('p');
    wikiText.classList.add('wiki-text');
    const promise = await fetch(apiUrl);
    let text = ""
    if (promise.ok) {
        const data = await promise.json();
        text = data.extract || "Summary not available";
        
      } else {
        console.error("Failed to fetch Wikipedia summary:");
        text = "not found"
      }
    wikiText.textContent = text;

    // Create the image container
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    // Create the image
    const wikiImg = document.createElement('img');
    
    wikiImg.classList.add('wiki-img');
    
    //const imageUrl = ""
    wikiImg.src = imageUrl;

    // Append elements to construct the template
    imgContainer.appendChild(wikiImg);
    
    content.appendChild(imgContainer);
    content.appendChild(wikiText);
    wikiItem.appendChild(header);
    wikiItem.appendChild(content);

    return wikiItem;
}

// esentilly the main porgram that runs once the document is loaded 
document.addEventListener("DOMContentLoaded", async function() {
  
     // building five wiki items
    for (let i = 1; i <= 5; i++) {
        const title = `Breed ${i}`;
        const text = "Some text about this breed.";
     
    
        const wikiItem = await createWikiItemTemplate();
        container.appendChild(wikiItem);
    }

    //fetchData()
});

// Append the container to the document body
document.body.appendChild(container);




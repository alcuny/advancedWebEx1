// Create the main container
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
async function createWikiItemTemplate(text) {
    const imageUrl = await fetchData()
    const paths = imageUrl.split('/');

// The breed name is the second-to-last segment in the path (index -2)
    const breedName = paths[paths.length - 2];

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
    content.appendChild(wikiText);
    content.appendChild(imgContainer);
    wikiItem.appendChild(header);
    wikiItem.appendChild(content);

    return wikiItem;
}

// Generate and append the wiki items to the container
document.addEventListener("DOMContentLoaded", async function() {
  // Your code here
  // This function will be executed as soon as the HTML document is fully parsed, even if external resources like images are still loading.

    for (let i = 1; i <= 5; i++) {
        const title = `Breed ${i}`;
        const text = "Some text about this breed.";
     
    
        const wikiItem = await createWikiItemTemplate(text);
        container.appendChild(wikiItem);
    }

    fetchData()
});

// Append the container to the document body
document.body.appendChild(container);


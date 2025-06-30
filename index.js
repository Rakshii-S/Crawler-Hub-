
const API = CONFIG.API_KEY;

if(window.innerWidth <= 570)
{
  banner.src = "banner.mp4";
}else{
  banner.src = "bannerr.mp4";
}

window.addEventListener('resize', ()=>{
    const banner = document.getElementById("banner");
    if(window.innerWidth <= 570)
    {
        banner.src = "banner.mp4";
    }else{
        banner.src = "bannerr.mp4";
    }
})
//from search iput box
function searchQuery()
{
    const search = document.getElementById("searchBox").value;
    if(search === "")
    {
        document.getElementById("displayText").innerHTML = "PLEASE DO TYPE SOMETHING!!!"
    }else{
        //css manipulation
        document.getElementById("image-content").innerHTML = "";
        document.getElementById("video-content").innerHTML = "";
        document.getElementById("displayContent").style.display ="flex";
        document.getElementById("footer").style.display = "flex";
        document.getElementById("BeforeSearch").style.display ="none";
        document.getElementById("displayText").style.display ="none";
        document.getElementById("image").style.backgroundColor = "rgb(49, 25, 55)";
        document.getElementById("video").style.backgroundColor = "black";

        //fetching from Pixabay
        const URL = `https://pixabay.com/api/?key=${API}&q=${search}`
        fetchContentImage("photo", URL)
    }
}

function VideoDisplay(){
    const search = document.getElementById("searchBox").value;
    document.getElementById("image-content").innerHTML = "";
    document.getElementById("video-content").innerHTML = "";
    document.getElementById("displayContent").style.display ="flex";
    document.getElementById("BeforeSearch").style.display ="none";
    document.getElementById("displayText").style.display ="none";
    document.getElementById("video").style.backgroundColor = "rgb(49, 25, 55)";
    document.getElementById("image").style.backgroundColor = "black";

        //fetching from Pixabay
        const URL = `https://pixabay.com/api/videos/?key=${API}&q=${search}`
        fetchContentVideo("film", URL)
}

function PhotoDisplay(){
    const search = document.getElementById("searchBox").value;
    document.getElementById("image-content").innerHTML = "";
    document.getElementById("video-content").innerHTML = "";
    document.getElementById("displayContent").style.display ="flex";
    document.getElementById("BeforeSearch").style.display ="none";
    document.getElementById("displayText").style.display ="none";
    document.getElementById("image").style.backgroundColor = "rgb(49, 25, 55)";
    document.getElementById("video").style.backgroundColor = "black";

        //fetching from Pixabay
        const URL = `https://pixabay.com/api/?key=${API}&q=${search}`
        fetchContentImage("photo", URL)
}

//fetch from pixabay
async function fetchContentImage(contentType, URL)
{
    try{
        const response = await fetch(URL);
        if(!response.ok)
        {
            document.getElementById("displayContent").style.display ="none";
            document.getElementById("BeforeSearch").style.display = "flex";
            document.getElementById("displayText").style.display ="flex";
            document.getElementById("displayText").innerHTML =`Status ${response.status}`;
        }

        const data = await response.json()
        if(data.totalHits > 0){
            data.hits.forEach(hit => {
            if(hit.type === contentType)
            {
                //CARD MAIN ELEMENT CREATION AND STYLING
                const card = document.createElement('div')
                card.style.backgroundColor = "rgb(49, 25, 55)";
                card.style.display ="flex";
                card.style.flexDirection = "column";
                card.style.justifyItems = "center";
                card.style.borderRadius = "20px";
                card.style.margin = "20px";
                card.style.padding = "20px";
                card.style.height = "400px";

                //CARD TOP ELEMENTS CREATION AND STYLING
                cardTop = CardTop(hit.userImageURL, hit.user, hit.pageURL)

                //CARD MIDDLE ELEMENTS CREATION AND STYLING
                const img = document.createElement('img');
                img.src = hit.largeImageURL;
                img.alt = hit.tags;
                img.style.width = '250px';
                img.style.height = '250px';
                img.addEventListener("click",()=>{
                  window.open(hit.largeImageURL, "_blank");
                })

                //CARD BOTTOM ELEMENTS CREATION AND STYLING
                cardBottom = CardBotom(hit.likes, hit.downloads) 

                card.appendChild(cardTop);
                card.appendChild(img);
                card.appendChild(cardBottom);
                document.getElementById('image-content').appendChild(card);
            }
          });
        } else {
            document.getElementById("BeforeSearch").style.display = "flex";
            document.getElementById("displayText").style.display ="flex";
            document.getElementById("displayText").innerHTML = "Content Not Found!!!";
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

async function fetchContentVideo(contentType, URL)
{
    try{
        const response = await fetch(URL);
        if(!response.ok)
        {
            document.getElementById("displayContent").style.display ="none";
            document.getElementById("BeforeSearch").style.display = "flex";
            document.getElementById("displayText").style.display ="flex";
            document.getElementById("displayText").innerHTML =`Status ${response.status}`;
        }

        const data = await response.json()
        if(data.totalHits > 0){
            data.hits.forEach(hit => {
            if (hit.type === contentType) 
            {
              //CARD MAIN ELEMENT CREATION AND STYLING
              const card = document.createElement('div')
              card.style.backgroundColor = "rgb(49, 25, 55)";
              card.style.display ="flex";
              card.style.flexDirection = "column";
              card.style.justifyItems = "center";
              card.style.borderRadius = "20px";
              card.style.margin = "20px";
              card.style.padding = "20px";
              card.style.height = "400px";

              //CARD TOP ELEMENTS CREATION AND STYLING
              cardTop = CardTop(hit.userImageURL, hit.user, hit.pageURL)

              //CARD MIDDLE ELEMENTS CREATION AND STYLING
              const v = document.createElement('video');
              v.src = hit.videos.medium.url; // fixed path
              v.autoplay = true;    // Enables autoplay
              v.load();
              v.play();
              v.style.width = '250px'
              v.style.height = '250px'
              v.addEventListener('click', function() {
                // Open the video source in a new tab
                window.open(hit.videos.medium.url, '_blank');
              });

              //CARD BOTTOM ELEMENTS CREATION AND STYLING
              cardBottom = CardBotom(hit.likes, hit.downloads) 

              card.appendChild(cardTop);
              card.appendChild(v);
              card.appendChild(cardBottom);
              document.getElementById('video-content').appendChild(card);
            }
          });
        } else {
            document.getElementById("BeforeSearch").style.display = "flex";
            document.getElementById("displayText").style.display ="flex";
            document.getElementById("displayText").innerHTML = "Content Not Found!!!";
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

//CARD TOP 
function CardTop(userImageURL, user, pageURL)
{
        const cardTop = document.createElement('div')
                cardTop.style.backgroundColor = "rgb(49, 25, 55)";
                cardTop.style.marginBottom = "30px";
                const user_profile = document.createElement('img')
                const user_name = document.createElement('div')
                
                user_profile.src = userImageURL;
                user_profile.style.borderRadius = "100px";
                user_profile.style.width = "50px";
                user_profile.style.height = "50px";
                user_name.innerHTML = user;
                user_name.style.color = "white";
                user_name.style.backgroundColor = "rgb(49, 25, 55)";
                user_name.style.marginTop = "16px";
                user_name.style.fontSize = "16px";

                user_name.addEventListener("click", ()=>{
                  window.open(pageURL, "_blank");
                })

                cardTop.appendChild(user_profile)
                cardTop.appendChild(user_name)
                cardTop.style.display = "flex";
                cardTop.style.justifyContent ="space-between"
                return cardTop
}

function CardBotom(likess, downloadss)
{

                //CARD BOTTOM ELEMENTS CREATION AND STYLING
                const cardBottom = document.createElement('div')
                cardBottom.style.display ="flex";
                cardBottom.style.flexDirection = "row";
                cardBottom.style.justifyContent = "space-between"
                cardBottom.style.backgroundColor = "rgb(49, 25, 55)";

                const likes = document.createElement('div')
                const downloads = document.createElement('div')
                const likes_img = document.createElement('img')
                const downloads_img = document.createElement('img')
                const likes_count = document.createElement('div')
                const download_count = document.createElement('div')

                likes_img.src = "heart.png";
                likes_img.style.borderRadius = "100px";
                likes_img.style.width = "30px";
                likes_img.style.height = "30px";
                likes_img.style.margin = "15px";
                likes_count.innerHTML = likess;
                likes_count.style.color = "white";
                likes_count.style.backgroundColor = "rgb(49, 25, 55)";
                likes_count.style.marginTop = "18px";
                likes_count.style.fontSize = "16px";
                likes.append(likes_img);
                likes.append(likes_count);
                likes.style.display = "flex";
                likes.style.flexDirection = "row";
                likes.style.backgroundColor = "rgb(49, 25, 55)";

                downloads_img.src = "download.png";
                downloads_img.style.borderRadius = "100px";
                downloads_img.style.width = "30px";
                downloads_img.style.height = "30px";
                downloads_img.style.margin = "15px";
                download_count.innerHTML = downloadss;
                download_count.style.color = "white";
                download_count.style.backgroundColor = "rgb(49, 25, 55)";
                download_count.style.marginTop = "18px";
                download_count.style.fontSize = "16px";
                downloads.append(downloads_img);
                downloads.append(download_count);
                downloads.style.display = "flex";
                downloads.style.flexDirection = "row";
                downloads.style.backgroundColor = "rgb(49, 25, 55)";

                cardBottom.append(likes);
                cardBottom.append(downloads);
                return cardBottom;
}

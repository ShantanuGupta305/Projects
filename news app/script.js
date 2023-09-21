const API_KEY="a6040c80c1e6468b92397940e9e48452";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",() => fetchNews("India"));
async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');
    cardsContainer.innerHTML=``;
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;
    newsDesc.innerHTML=article.description;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}
const searchbtn=document.getElementById('search-button');
const searchtxt=document.getElementById('news-input');
let curselnav=null;
function onNavItemClick(query){
    searchtxt.value="";
    fetchNews(query);
    const navitem=document.getElementById(query);
    curselnav?.classList.remove('active');
    curselnav=navitem;
    curselnav.classList.add('active');
}
searchtxt.addEventListener('click',()=>{
    searchtxt.value="";
});
searchbtn.addEventListener('click',()=>{
    curselnav?.classList.remove('active');
    curselnav=null;
    const query=searchtxt.value;
    if(!query) return;
    fetchNews(query);
});
const nav=document.getElementById('nav');
const ham=document.getElementById('ham');
ham.addEventListener('click',()=>{
    // nav.style.display='none';
    // console.log(nav.style);
    // if(nav.style.display)
    if(nav.style.display!="none") nav.style.display="none";
    else nav.style.display="inline";
});
function myFunction(x) {
    if (x.matches) { // If media query matches
        nav.style.display="none";
    } else {
        nav.style.display="inline";
    }
  }
  
  let x = window.matchMedia("(max-width: 751.5px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes
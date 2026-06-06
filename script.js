let images = document.querySelectorAll(".gallery-images img");
let imageCards = document.querySelectorAll(".image-card");
let search = document.querySelector(".search-bar");
let buttons = document.querySelectorAll(".buttons");


let lightbox = document.querySelector(".lightbox");
let lightBoxImg = document.querySelector(".lightbox-image");
let prevButtn = document.querySelector(".prev-button");
let nxtButtn= document.querySelector(".next-button");
let close_button = document.querySelector(".close-btn");
let lightBoxLike= document.querySelector(".lightbox-like");
let lightBoxDownload = document.querySelector(".lightbox-download");


let likeButtns = document.querySelectorAll(".like");
let imgDownloads = document.querySelectorAll(".download");

let activityMenuItems = document.querySelectorAll(".activity-menu");
let ActivityStore = document.querySelector("#activity");
let likedImagesbyMe = document.querySelector("#liked-images");
let downloadedImagesbyMe =document.querySelector("#downloaded-images");
let homePage = document.querySelector("#home");

let currentIndex;
let likedImages = new Set();
let downloadedImg = new Set();


search.addEventListener("input", () => {
    let substring = search.value.trim().toLowerCase();
    images.forEach((img, index) => {
        let text1 = img.alt.toLowerCase();
        let text2 = img.dataset.item.toLowerCase();
        if (text1.includes(substring) ||
            text2.includes(substring)
        ) {
            imageCards[index].style.display = "block";
        }
        else {
            imageCards[index].style.display = "none";
        }
    });
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let substring = button.innerText.trim().toLowerCase();
        images.forEach((img, index) => {
            let text1 = img.alt.toLowerCase();
            let text2 = img.dataset.item.toLowerCase();
            if (substring === "all" ||
                text1.includes(substring) ||
                text2.includes(substring)
            ) {
                imageCards[index].style.display = "block";
            }
            else {
                imageCards[index].style.display = "none";
            }
        });
    });
});

images.forEach((image,index) => {
    image.addEventListener("click", () => {
        currentIndex=index;
        lightBoxImg.src = image.src;
        lightbox.style.display="flex";
        if(likedImages.has(currentIndex)) {
            lightBoxLike.innerText = "❤️";
        }
        else {
            lightBoxLike.innerText = "🤍";
        }
        if(downloadedImg.has(currentIndex)) {
            lightBoxDownload.innerText="✓";
        }
        else {
            lightBoxDownload.innerText="⤓";
        }
    });
});


close_button.addEventListener("click", () => {
    lightBoxImg.src="";
    lightbox.style.display="none";
})

lightbox.addEventListener("click", (event) => {
    // console.log(event.target);
    if(event.target===lightbox) {
        lightBoxImg.src="";
    lightbox.style.display="none";
    }
});


prevButtn.addEventListener("click",() => {
    if(currentIndex===0) {
        alert("This is the First Image");
        return;
    }
    currentIndex--;
    lightBoxImg.src = images[currentIndex].src;
    if(likedImages.has(currentIndex)) {
            lightBoxLike.innerText = "❤️";
        }
        else {
            lightBoxLike.innerText = "🤍";
        }
        if(downloadedImg.has(currentIndex)) {
            lightBoxDownload.innerText="✓";
        }
        else {
            lightBoxDownload.innerText="⤓";
        }
});


nxtButtn.addEventListener("click",() => {
    if(currentIndex===images.length-1) {
        alert("This is the Last Image");
        return;
    }
    currentIndex++;
    lightBoxImg.src = images[currentIndex].src;
    if(likedImages.has(currentIndex)) {
            lightBoxLike.innerText = "❤️";
        }
        else {
            lightBoxLike.innerText = "🤍";
        }
        if(downloadedImg.has(currentIndex)) {
            lightBoxDownload.innerText="✓";
        }
        else {
            lightBoxDownload.innerText="⤓";
        }
});


likeButtns.forEach((likeButtn,index) => {
    likeButtn.addEventListener("click", () => {
    if (likeButtn.innerText === "🤍" ) {
        likeButtn.innerText = "❤️"; // Fill it
        likedImages.add(index);
        if(index === currentIndex) {
        lightBoxLike.innerText = "❤️";
        }
    } else {
        likeButtn.innerText = "🤍"; // Outline it again
        // likeButtn.style.color="white";
        likedImages.delete(index);
        if(index === currentIndex) {
        lightBoxLike.innerText = "🤍";
        }
    }
});
});



lightBoxLike.addEventListener("click", () => {
if (lightBoxLike.innerText === "🤍") {
    likedImages.add(currentIndex);
    lightBoxLike.innerText = "❤️";
    likeButtns[currentIndex].innerText = "❤️";
}
else {
    lightBoxLike.innerText = "🤍";
    likedImages.delete(currentIndex);
    likeButtns[currentIndex].innerText = "🤍";
}
});


lightBoxDownload.addEventListener("click", () => {
    if(lightBoxDownload.innerText==="⤓") {
        downloadedImg.add(currentIndex);
        lightBoxDownload.innerText ="✓";
        imgDownloads[currentIndex].innerText="✓";
    }
    else {
        lightBoxDownload.innerText="⤓";
        downloadedImg.delete(currentIndex);
        imgDownloads[currentIndex].innerText="⤓";
    }
});


imgDownloads.forEach((imgDownload,index) => {
    imgDownload.addEventListener("click",() => {
    if(imgDownload.innerText==="⤓") {
        imgDownload.innerText = "✓";
        downloadedImg.add(index);
        if(index===currentIndex) {
            lightBoxDownload.innerText = "✓";
        }
    }
    else {
        imgDownload.innerText="⤓";
        downloadedImg.delete(index);
        if(index===currentIndex) {
            lightBoxDownload.innerText="⤓";
        }
    }
});
});

ActivityStore.addEventListener("click", () => {
    activityMenuItems.forEach((activityMenuItem) => {
        if(activityMenuItem.style.display==="flex") {
            activityMenuItem.style.display="none";
        }
        else {
            activityMenuItem.style.display="flex";
        }
    });
});

likedImagesbyMe.addEventListener("click", () => {
    // console.log("Img");
    images.forEach((image, index) => {
        if (likedImages.has(index)) {
            console.log(imageCards[index]);
            imageCards[index].style.display="block";
        } 
        else {
            console.log(imageCards[index]);
            imageCards[index].style.display="none";
        }
    });
});


 
downloadedImagesbyMe.addEventListener("click",() => {
    // console.log("Dow");
    images.forEach((image,index) => {
        if(downloadedImg.has(index)) {
            console.log(index, imageCards[index]);
            imageCards[index].style.display="block"
        }
        else {
            imageCards[index].style.display="none";
        }
    });
});

homePage.addEventListener("click",() => {
    imageCards.forEach((card) => {
        card.style.display="block";
    });
});

console.log(imageCards.length);
console.log(images.length);
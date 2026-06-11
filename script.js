//DOM SELECTORS
let images = document.querySelectorAll(".gallery-images img");
let imageCards = document.querySelectorAll(".image-card");
let search = document.querySelector(".search-bar");
let buttons = document.querySelectorAll(".buttons");
let category_buttons = document.querySelector(".category-buttons");


let lightbox = document.querySelector(".lightbox");
let lightBoxImg = document.querySelector(".lightbox-image");
let prevButtn = document.querySelector(".prev-button");
let nxtButtn= document.querySelector(".next-button");
let close_button = document.querySelector(".close-btn");
let lightBoxLike= document.querySelector(".lightbox-like");
let lightBoxDownload = document.querySelector(".lightbox-download");


let likeButtns = document.querySelectorAll(".like");
let imgDownloads = document.querySelectorAll(".download");

// let activityMenuItems = document.querySelectorAll(".activity-menu");
let activityMenu = document.querySelector(".activity-menu");
let ActivityStore = document.querySelector("#activity");
let likedImagesbyMe = document.querySelector("#liked-images");
let downloadedImagesbyMe =document.querySelector("#downloaded-images");
let homePage = document.querySelector("#home");

//GLOBAL VARIABLES

let currentIndex;
// let likedImages = new Set();
// let downloadedImg = new Set();
let likedImages = new Set(JSON.parse(localStorage.getItem("likedImages")) || []);
let downloadedImg = new Set(JSON.parse(localStorage.getItem("downloadedImg")) || []);

//LOCAL STORAGE

function saveLikes() {
    localStorage.setItem(
        "likedImages",
        JSON.stringify([...likedImages])
    );
}

function saveDownloads() {
    localStorage.setItem(
        "downloadedImg",
        JSON.stringify([...downloadedImg])
    );
}

//UI UPDATE FUNCTIONS
function updateLightboxIcons() {
    lightBoxLike.innerText =
        likedImages.has(currentIndex) ? "❤️" : "🤍";

    lightBoxDownload.innerText =
        downloadedImg.has(currentIndex) ? "✓" : "⤓";
}

//RESTORE SAVED LIKES AND DOWNLOADS FROM LOCAL STORAGE
likedImages.forEach((index) => {
    likeButtns[index].innerText = "❤️";
});

downloadedImg.forEach((index) => {
    imgDownloads[index].innerText = "✓";
});

//SEARCH BAR

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

//CATEGORY-BUTTONS

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

//LIGHTBOX OPEN FUNCTIONALITY
images.forEach((image,index) => {
    image.addEventListener("click", () => {
        currentIndex=index;
        lightBoxImg.src = image.src;
        lightbox.style.display="flex";
        updateLightboxIcons();
    });
});

//CLOSE FUNCTIONALITY OF LIGHT BOX USING X MARK
close_button.addEventListener("click", () => {
    lightBoxImg.src="";
    lightbox.style.display="none";
})

//CLOSE FUNC OF LIGHT BOX BY CLICKING AREA NOT OCCUPIED BY IMAGE IN LIGHTBOX
lightbox.addEventListener("click", (event) => {
    if(event.target===lightbox) {
        lightBoxImg.src="";
        lightbox.style.display="none";
    }
});

//PREVIOUS IMAGE FUNCTIONALITY(LIGHT BOX)
prevButtn.addEventListener("click",() => {
    if(currentIndex===0) {
        alert("This is the First Image");
        return;
    }
    currentIndex--;
    lightBoxImg.src = images[currentIndex].src;
    updateLightboxIcons();
});

//NEXT IMAGE FUNCTIONALITY(LIGHT BOX)
nxtButtn.addEventListener("click",() => {
    if(currentIndex===images.length-1) {
        alert("This is the Last Image");
        return;
    }
    currentIndex++;
    lightBoxImg.src = images[currentIndex].src;
    updateLightboxIcons();
});

//LIKE FUNCTIONALITY IN IMAGE CARDS
likeButtns.forEach((likeButtn,index) => {
    likeButtn.addEventListener("click", () => {
    if (likeButtn.innerText === "🤍" ) {
        likeButtn.innerText = "❤️"; // Fill it
        likedImages.add(index);
        saveLikes();
        if(index === currentIndex) {
        lightBoxLike.innerText = "❤️";
        }
    } else {
        likeButtn.innerText = "🤍"; // Outline it again
        // likeButtn.style.color="white";
        likedImages.delete(index);
        saveLikes();
        if(index === currentIndex) {
        lightBoxLike.innerText = "🤍";
        }
    }
});
});

//LIKE FUNCTIONALITY IN LIGHTBOX
lightBoxLike.addEventListener("click", () => {
if (lightBoxLike.innerText === "🤍") {
    likedImages.add(currentIndex);
    saveLikes();
    lightBoxLike.innerText = "❤️";
    likeButtns[currentIndex].innerText = "❤️";
}
else {
    lightBoxLike.innerText = "🤍";
    likedImages.delete(currentIndex);
    saveLikes();
    likeButtns[currentIndex].innerText = "🤍";
}
});

//DOWNLOAD FUNCTIONALITY IN LIGHTBOX
lightBoxDownload.addEventListener("click", () => {
    if(lightBoxDownload.innerText==="⤓") {
        downloadedImg.add(currentIndex);
        saveDownloads();
        lightBoxDownload.innerText ="✓";
        imgDownloads[currentIndex].innerText="✓";
    }
    else {
        lightBoxDownload.innerText="⤓";
        downloadedImg.delete(currentIndex);
        saveDownloads();
        imgDownloads[currentIndex].innerText="⤓";
    }
});

//DOWNLOAD FUNCTIONALITY IN IMAGE CARDS
imgDownloads.forEach((imgDownload,index) => {
    imgDownload.addEventListener("click",() => {
    if(imgDownload.innerText==="⤓") {
        imgDownload.innerText = "✓";
        downloadedImg.add(index);
        saveDownloads();
        if(index===currentIndex) {
            lightBoxDownload.innerText = "✓";
        }
    }
    else {
        imgDownload.innerText="⤓";
        downloadedImg.delete(index);
        saveDownloads();
        if(index===currentIndex) {
            lightBoxDownload.innerText="⤓";
        }
    }
});
});

//TO DISPLAY HOME,DOWNLOADS,FAVOURITES OPTIONS AS WE CLICK MY ACTIVITY
ActivityStore.addEventListener("click", () => {
    if (activityMenu.style.display === "flex") {
        activityMenu.style.display = "none";
        category_buttons.style.display = "flex";
    }
    else {
        activityMenu.style.display = "flex";
        category_buttons.style.display = "none";
    }
});


//TO SHOW LIKED IMAGES IN MY FAVOURITES(MY ACTIVITY)
likedImagesbyMe.addEventListener("click", () => {
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


//TO SHOW DOWNLOADED IMAGES IN MY DOWNLOADS(MY ACTIVITY)
downloadedImagesbyMe.addEventListener("click",() => {
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

//To reach to Home Page from MY ACTIVITY Page
homePage.addEventListener("click",() => {
    imageCards.forEach((card) => {
        card.style.display="block";
    });
    category_buttons.style.display="flex";
    // activityMenuItems.forEach((activityMenuItem) => {
    activityMenu.style.display = "none";
    // });
});


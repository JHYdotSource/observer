let previousY = 0;

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(entry);
        }
        /**
         * Show ratio
         */
        const entryRatio = entry.target.querySelector(".intersection__ratio");
        if (entryRatio) {
            entryRatio.innerHTML = (entry.intersectionRatio * 100).toFixed(0) + "%";
        }
        /**
         * Animation example
         */
        if (entry.target.id === "animation") {
            if (entry.intersectionRatio > 0.75) {
                entry.target.classList.add("run__animation");
            } else {
                entry.target.classList.remove("run__animation");
            }
        }
        if (entry.target.id === "lazyloading") {
            const imageContainer = entry.target.querySelector(".lazy__image");
                if (imageContainer) {
                    if (entry.intersectionRatio > 0.8) {
                        imageContainer.src = imageContainer.getAttribute("data-src");
                    } else {
                        imageContainer.src = "";
                    }
                }
        }
        if (entry.target.id === "adtracking") {
            const adDisplay = entry.target.querySelector(".visible__ad");
            if (adDisplay) {
                if (entry.intersectionRatio >= 0.8) {
                    adDisplay.innerHTML = 'Visible ✔';
                    adDisplay.classList.add("visible");
                } else {
                    adDisplay.innerHTML = 'Not visible ✘';
                    adDisplay.classList.remove("visible");
                }
            }
        }
        if (entry.target.id === "textreading") {
            if (entry.intersectionRatio >= 1) {
                const textControls = entry.target.querySelector(".text__controls");
                if (textControls) {
                    const textControls__button = textControls.querySelector("button");
                    const textControls__input = textControls.querySelector("input");
                    const textControls__text = textControls.querySelector("label");
                    if (textControls__button &&
                        textControls__input &&
                        textControls__text) {
                            textControls__button.disabled = false;
                            textControls__input.disabled = false;
                            textControls__text.style.opacity = "1";
                        }
                }
            }
        }
        if (entry.target.id === "videocontrols") {
            const video = entry.target.querySelector("video");
            if (video) {
                if (entry.intersectionRatio >= 0.8) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
        if (entry.target.id === "scrolldetection") {
            if (entry.isIntersecting) {
                const currentY = entry.boundingClientRect.y
                const directionDisplay = entry.target.querySelector(".direction__output");

                if (currentY < previousY) {
                    directionDisplay.innerHTML = 'scrolling down';
                    directionDisplay.classList.remove("up");
                } else if (currentY > previousY) {
                    directionDisplay.innerHTML = 'scrolling up';
                    directionDisplay.classList.add("up");
                }
              
                previousY = currentY
            }
        }
        if (entry.target.id === "colorchange") {
            if (entry.isIntersecting) {
                const colorField = entry.target.querySelector(".color__display");
                if (colorField) {
                    // colorField.style.backgroundColor = `rgb(${(Math.floor(Math.random() * (100 - 1 + 1) + 1)) + "%"}, ${(entry.intersectionRatio * 100 / 5).toFixed(0) + "%"}, ${(entry.intersectionRatio * 100).toFixed(0) + "%"})`;
                    colorField.style.backgroundColor = `rgba(${(Math.floor(Math.random() * (100 - 1 + 1) + 1)) + "%"}, ${(Math.floor(Math.random() * (100 - 1 + 1) + 1)) + "%"}, ${(Math.floor(Math.random() * (100 - 1 + 1) + 1)) + "%"}, ${(entry.intersectionRatio * 100).toFixed(0) + "%"})`;
                }
            }
        }
        if (entry.target.id === "calculations") {
            if (entry.isIntersecting) {
                console.log(entry)
                const calculationsOutput = entry.target.querySelector(".calculations__output");
                calculationsOutput.innerHTML = `
                <pre>boundingClientRect: ${JSON.stringify(entry.boundingClientRect, undefined, 2)}</pre>
                <pre>intersectionRatio: ${JSON.stringify(entry.intersectionRatio, undefined, 2)}</pre>
                <pre>isIntersecting: ${JSON.stringify(entry.isIntersecting, undefined, 2)}</pre>
                <pre>time: ${JSON.stringify(entry.time, undefined, 2)}</pre>
                `;
            }
        }
        if (entry.target.id === "timetracking") {
            if (entry.isIntersecting) {
                
            }
        }
    })
}

const buildThresholdList = () => {
    let thresholds = [];
    let numSteps = 25;
   
    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }
   
    thresholds.push(0);
    return thresholds;
}

const options = {
    root: null,
    rootMargin: "0px 0px",
    threshold: buildThresholdList()
}

const observer = new IntersectionObserver(callback, options);

const entryList = document.querySelectorAll(".entry");

if (entryList) {
    entryList.forEach(entry => {
        observer.observe(entry);
    });
}

const infiniteCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(entry);
            if (entry.intersectionRatio >= 0.1) {
                if (entry.target.classList.contains("scroll__container--box__loader")) {

                    const newElem = document.createElement("div");
                    newElem.classList.add("scroll__container--box");
                    newElem.innerHTML = `<h3>Content</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Sapiente quo adipisci quasi exercitationem quia quas omnis laboriosam inventore dignissimos beatae.</p>`;

                    const newElemImage = document.createElement("img");
                    newElemImage.src = "https://picsum.photos/100?random=" + random++;
                    newElemImage.alt = "Random";
                    newElem.appendChild(newElemImage); 

                    document.querySelector(".scroll__container--list").appendChild(newElem);
                }  
            }
        }
    })
}

const infiniteOptions = {
    root: document.querySelector(".scroll__container"),
    rootMargin: "0px 0px",
    threshold: buildThresholdList()
}

let random = 4;

const infiniteObserver = new IntersectionObserver(infiniteCallback, infiniteOptions);

const infiniteListLoader = document.querySelector(".scroll__container--box__loader");

if (infiniteListLoader) {
    infiniteObserver.observe(infiniteListLoader);
}


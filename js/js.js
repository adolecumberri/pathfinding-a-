let container = document.getElementById("container");

var defaultTiming = {
    duration: 10000,
    iterations: Infinity,
    fill: 'both',
    easing: 'ease-in-out'
};

// function createPath (screenX, screenY) {
//     let svgPath = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svgPath.style = `
// // width: auto;    
// border: 1px solid black;
// position: absolute;
// top: ${screenY};
// left: ${screenX};
// `;

//     svgPath.setAttribute("xmlns", "http://www.w3.org/2000/svg");
//     svgPath.setAttribute("viewBox", "0 0 431.7 422.6");

//     let elementPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     elementPath.setAttribute("d","M10.906,0.016c-2.483-0.114-4.694,0.352-5.7,2.799C4.731,3.97,5.892,5.399,6.802,5.861    c2.679,1.357,5.485,0.787,8.167,2.812c3.398,2.565-6.048,5.269-7.409,5.658c-1.413,0.404-2.937,0.86-4.189,1.642    c-2.819,1.759-3.985,4.196-3.057,7.495c1.896,6.734,13.793,8.387,19.338,9.38c9.12,1.634,18.447,1.689,27.527,3.492    c4.514,0.896,13.329,3.591,12.511,9.714c-0.692,5.185-11.817,6.951-15.875,7.625c-11.046,1.832-22.457-0.512-32.876,4.549    c-7.9,3.837-13.306,12.471-8.55,20.846c5.899,10.387,16.389,13.668,27.248,16.418c14.515,3.676,29.212,6.681,44.091,8.421    c15.833,1.852,31.802,1.709,47.715,1.752c29.841,0.081,59.566,2.271,88.679,9.131c11.792,2.778,26.486,7.313,33.845,17.71    c3.776,5.334,0.808,11.219,0.757,16.965c-0.041,4.696,5.013,8.609,8.525,10.882c10.104,6.535,23.849,8.897,35.613,9.364    c15.237,0.605,30.805-0.596,46.037-1.222c33.685-1.386,67.563-3.955,101.123,0.618c0.636,0.086,2.28-0.933,1.174-1.084    c-30.611-4.171-61.518-2.503-92.262-1.083c-16.089,0.742-32.205,1.301-48.308,1.663c-14.25,0.32-29.35-1.93-41.847-9.216    c-3.227-1.882-5.659-4.476-7.448-7.724c-1.474-2.677-0.207-5.966,0.303-8.717c0.896-4.834-0.199-9.305-3.295-13.072    c-7.081-8.616-19.685-12.619-30.031-15.41c-27.354-7.378-56.245-9.521-84.453-9.891c-16.031-0.21-32.062,0.17-48.061-1.096    c-16.014-1.267-31.808-4.417-47.401-8.188C22.121,92.328,7.273,88.834,2.923,75.122c-2.375-7.488,3.89-13.674,10.052-16.667    c6.57-3.191,14.62-2.763,21.726-2.976c7.642-0.229,17.835-0.973,24.138-5.998c7.513-5.99-2.13-11.888-7.943-13.609    c-8.972-2.656-18.778-2.363-27.998-3.766c-4.795-0.73-28.022-5.317-19.643-14.583c3.55-3.925,11.73-1.957,14.362-7.215    c0.64-1.278-0.994-2.668-1.896-3.182c-1.218-0.694-2.386-1.332-3.747-1.669c-0.381-0.049-0.763-0.087-1.146-0.114    c-0.588-0.063-1.175-0.126-1.763-0.189c-2.434-0.713-2.067-2.046,1.099-4C10.925,1.188,12.215,0.076,10.906,0.016L10.906,0.016z");
//     elementPath.setAttribute("fill","none");
//     elementPath.setAttribute("stroke" ,"#5e5e7d");
//     svgPath.appendChild(elementPath);

//     return svgPath;
// }


for (let i = 0; i < 50; i++) {

    let newDiv = document.createElement("div");
    newDiv.classList.add("sub-div");
    newDiv.addEventListener("click", (
        // { target, screenX, screenY }
    e
        ) => {

console.log(e);

        if (e.target.classList.contains("move2")) {
            e.target.classList.remove("move2");
        } else {
            // container.appendChild(createPath(e.x, e.y));
            e.target.classList.add("move2");
            e.target.animate([{
                offsetDistance: 0,
                // offsetRotation: 'auto' 
            },
            {
                offsetDistance: '100%',
                // offsetRotation: 'auto' 
            }
            ], defaultTiming);
        }


    });
    container.appendChild(newDiv);
}
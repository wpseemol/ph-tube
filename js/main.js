const getAllData = async () => {
  const respons = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await respons.json();
  havePost(data.status, data);
};

function havePost(postStatus, allPost) {
  if (postStatus) {
    showAllPost(allPost);
  } else {
    alert("No Poste Found This Page");
  }
}

const postSecton = document.getElementById("postContainer");
const showAllPost = (postes) => {
  postes.data.forEach((postData) => {
    const createdDiv = document.createElement("div");
    createdDiv.classList.add("card");
    let isverified = postData.authors[0]?.verified
      ? `<img src="./images/verified-bage.svg" alt="verified" />`
      : "";
    // time calc here
    const seconds = parseInt(postData.others.posted_date);
    const second = seconds % 60;
    const minutes = (seconds - second) / 60;
    const minute = minutes % 60;
    const hour = (minutes - minute) / 60;

    let haveTime = postData?.others?.posted_date ? "" : "hidden";
    let hourValue = postData?.others?.posted_date ? hour + "hrs " : "0hrs ";
    let minuteValue = postData?.others?.posted_date ? minute + " min" : "0 min";

    let postVewas = postData?.others?.views
      ? postData.others.views
      : "No Views";

    createdDiv.innerHTML = `<figure class="rounded-lg h-56 relative border border-borderColor">
            <img
              class="object-cover"
              src="${postData.thumbnail}"
              alt="${postData.title}"
            />
            <div id="updateTime" class="absolute bg-titleFontColor text-whaitColor
                 bottom-4 right-4 py-1 px-[5px] text-timerFont font-normal rounded-sm 
                 ${haveTime}">
      <p>
         <time>${hourValue}</time> 
         <time>${minuteValue}</time> ago
       </p>
              
            </div>
          </figure> 
          <div class="my-5">
            <div class="flex gap-3">
              <div class="avatar">
                <div class="w-10 h-10 rounded-full">
                  <img
                    src="${postData.authors[0].profile_picture}"
                    alt="${postData.authors[0].profile_name}"
                  />
                </div>
              </div>
              <div>
                <h2 class="text-base font-bold text-titleFontColor">
                  ${postData.title}
                </h2>
                <div class="my-2 flex items-center gap-2">
                  <p class="text-sm font-normal">${postData.authors[0].profile_name}</p>
                  <span>
                    ${isverified}
                  </span>
                </div>
                <p class="text-sm font-normal">${postVewas}</p>
              </div>
            </div>
          </div>`;
    postSecton.children[0].appendChild(createdDiv);

    console.log(postData.others.views);
  });
};

// nofound content function here
//  noFountContent();

function noFountContent() {
  const classList = postSecton.children[0].classList;
  for (const className of classList) {
    if (className === "lg:grid-cols-4") {
      classList.remove("lg:grid-cols-4");
      classList.add("lg:grid-cols-1");
      postSecton.children[0].innerHTML = `
<div class="flex flex-col items-center justify-center gap-8 mt-14">
          <img src="./images/Icon.png" alt="Empty Icon">
          <h2 class="text-noDataFont font-bold text-titleFontColor text-center">
            Oops!! Sorry, There is no
            <br> content here
          </h2>
        </div>
`;
    }
  }
}

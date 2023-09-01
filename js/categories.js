const getCategorData = async () => {
  const respons = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await respons.json();
  showCategori(data);
};

getCategorData();

function showCategori(dataObj) {
  if (!dataObj.status) {
    alert("Now Categories On Your Site");
  }
  const naveContainer = document.getElementById("naveContainer");
  naveContainer.classList.remove("hidden");
  naveContainer.classList.add("flex");

  dataObj.data.forEach((element) => {
    const li = document.createElement("li");

    li.setAttribute("onclick", `clickedBtn(this,${element.category_id})`);
    li.classList.add("btn", "btnCustom", "normalBtn");
    li.innerHTML = `
        <a href="#">${element.category}</a>`;
    naveContainer.appendChild(li);
  });

  const navFirstChild = naveContainer.children[0];
  navFirstChild.classList.remove("normalBtn");
  navFirstChild.classList.add("btnActive");
  getAllData();
}

function clickedBtn(btn, clickItemId) {
  const naveContainer = document.getElementById("naveContainer").children;
  for (const li of naveContainer) {
    for (const classes of li.classList) {
      if (classes === "btnActive") {
        li.classList.remove("btnActive");
        li.classList.add("normalBtn");
      }
    }
  }

  for (const className of btn.classList) {
    if (className === "normalBtn") {
      btn.classList.remove("normalBtn");
      btn.classList.add("btnActive");
    }
  }
  getClickItems(clickItemId);
}

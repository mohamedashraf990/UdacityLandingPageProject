
/**
 * Intialize Section Counter by value 3 because we already 
 * had 3 sections in the html file
 * and we want to create starting from section number 4
 */
let sectionsCounter = 3;

/** Call addSection method to add new section dynamically */
const addSection = () => {
  sectionsCounter++;
  const sectionContent = `<section id="section${sectionsCounter}" data-nav="Section ${sectionsCounter}">
    <div class="landing__container">
    <h2>Section ${sectionsCounter}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    </div>
    </section>`;
  document.querySelector("main").insertAdjacentHTML("beforeend", sectionContent);
};
/** 
* For each section we want to have a corresponding item in the 
navbar and add this item to be dynamically added on the screen
*/
const navList = document.getElementById("navbar__list");
const addNavItems = () => {
 // we clear innerHTML Every time in order not to display previous HTML And the updated one 
  navList.innerHTML = "";
  document.querySelectorAll("section").forEach((section) => {
    const navContent = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navList.insertAdjacentHTML("beforeend", navContent);
  });
};


//Setting the active link and active section when we reach the boundaries intialized
window.onscroll = function () {
  document.querySelectorAll("section").forEach((section) => {
    let activeLink = navList.querySelector(`[data-nav=${section.id}]`);
    if (section.getBoundingClientRect().top >= -400 && section.getBoundingClientRect().top <= 150) {
      section.classList.add("your-active-class");
      activeLink.classList.add("active-link");
    }
// when we move away from them we remove the active link and active class
    else {
      section.classList.remove("your-active-class");
      activeLink.classList.remove("active-link");
    }
  });
}

navList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.dataset.nav) {
    document
      .getElementById(`${event.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${event.target.dataset.nav}`;
    }, 200);
  }
});

//Adding NavItems for the first time
addNavItems();

// on Button click we add new sections and update out NavList
document.getElementById("btn").addEventListener("click", () => {
  addSection();
  addNavItems();
});


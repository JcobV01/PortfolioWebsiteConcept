const projectName = document.getElementById('project-name');
const projectDesc = document.getElementById('project-describe');
const projectTags = document.getElementById('tags');
const projectImg1 = document.getElementById('project-img-1');
const projectImg2 = document.getElementById('project-img-2');
const projectLink = document.getElementById('project-link-w');
let projectsTable = 0;

window.addEventListener('load', () => {
    fetch("./text/projects.xml")
    .then(x => x.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(y => projectsTable = y);
});

const changeProjectInfo = (number) => {
    const tagsToWrite = projectsTable.children[0].children[number].children[4];
    // console.log(tagsToWrite.children);

    //nazwa
    projectName.innerText = projectsTable.children[0].children[number].children[0].innerHTML;
    //opis
    projectDesc.innerText = projectsTable.children[0].children[number].children[1].innerHTML;
    //link
    projectLink.setAttribute('href', projectsTable.children[0].children[number].children[3].innerHTML);
    projectLink.innerText = projectsTable.children[0].children[number].children[3].innerHTML;
    //tagi

    projectTags.innerHTML = '';

    for(z of tagsToWrite.children){
        const div = document.createElement('div');
        const p = document.createElement('p');
        div.classList.add('tag');
        p.innerText = `#${z.innerHTML}`;
        div.appendChild(p);
        projectTags.appendChild(div);
    }

    //zdjęcia

    projectImg1.setAttribute('src', `media/images/${projectsTable.children[0].children[number].children[2].children[0].innerHTML}`);
    projectImg2.setAttribute('src', `media/images/${projectsTable.children[0].children[number].children[2].children[1].innerHTML}`);
}   

//------------------------------------------

const portfolioElements = document.querySelectorAll('.element');
const portfolioElementsContainer = document.getElementById('main-portfolio-container');
const portfolioElementDescribe = document.getElementById('portfolio-info');
const portfolioDarkBackground = document.getElementById('dark-background-portfolio');
const portfolioXMark = document.getElementById('xmark');


const showProjectDescribe = (event) => {
    if(portfolioElementsContainer.style.display == 'flex'){
        portfolioElementsContainer.style.display = 'none';
        portfolioElementDescribe.style.display = 'block';
        portfolioDarkBackground.style.display = 'block';
    }

    changeProjectInfo(event.target.classList[0].slice(-1));
}

portfolioXMark.addEventListener('click', () => {
    portfolioElementsContainer.style.display = 'flex';
    portfolioElementDescribe.style.display = 'none';
    portfolioDarkBackground.style.display = 'none';
});

for(let x of portfolioElements){
    x.setAttribute('onclick', 'showProjectDescribe(event)');
}




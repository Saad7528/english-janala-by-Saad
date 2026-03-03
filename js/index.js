const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(rec => rec.json())
    .then(json => display(json.data))
}

const display = (data) => {

    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    data.forEach(item => {
        console.log(item);
        const divLesson = document.createElement("div")
        divLesson.innerHTML = `
        <button class="btn btn-outline btn-primary" ><i class="fa-solid fa-book-open"></i></i>Lesson - ${item.level_no}</button>
        
        `
        levelContainer.append(divLesson)
    });
}

loadData();
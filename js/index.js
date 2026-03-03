const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(rec => rec.json())
    .then(json => display(json.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}` 
    fetch(url).then(res => res.json()).then(word => displayLoadLevelWord(word.data))
}


const displayLoadLevelWord = (words) =>{
    const wordSection = document.getElementById("word-container")
    wordSection.innerHTML = '';

    if (words.length ==0){
        wordSection.innerHTML = `
        <div class="bg-gray-200 text-center items-center col-span-3 space-y-5 ">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h1 class="text-3xl font-bold">নেক্সট Lesson এ যান।</h1>
        </div>
        `;

    }

    words.forEach(word => {
        console.log(word);

        const wordCart = document.createElement("div")
        wordCart.innerHTML = `
        <div class="bg-gray-50 py-10 px-5 rounded-lg shadow-sm space-y-6">
          <h2 class="text-3xl/6 font-bold">${word.word}</h2>
          <p class="text-sm/6 font-medium">Meaning /Pronounciation</p>
          <div class=" text-3xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
          <div class="flex justify-between ">
            <button class="btn hover:bg-[#1A91FF20] p-2 rounded-sm"><i class=" text-gray-600 fa-solid fa-circle-info"></i></button>

          <button class="btn hover:bg-[#1A91FF20] p-2 rounded-sm"><i class="text-gray-600 fa-solid fa-volume-high"></i></button>

        </div>
        `;

        wordSection.append(wordCart);
        
    });


}
const display = (data) => {

    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    data.forEach(item => {
        console.log(item);
        const divLesson = document.createElement("div")
        divLesson.innerHTML = `
        <button onclick="loadLevelWord(${item.level_no})" class="btn btn-outline btn-primary" ><i class="fa-solid fa-book-open"></i></i>Lesson - ${item.level_no}</button>
        
        `
        levelContainer.append(divLesson)
    });
}

loadData();
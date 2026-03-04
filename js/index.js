const creatElementForSynonyms = (arr) => {
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElement.join(" ")
    

}

const manageSpinner = (status) => {
    if(status == true) {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }else {
        document.getElementById("spinner").classList.add("hidden")
        document.getElementById("word-container").classList.remove("hidden")
    }
}
const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(rec => rec.json())
    .then(json => display(json.data))
}
// remove Lesson Btn css remove
const removeActive = (id) => {
const  lessonBtnCss = document.querySelectorAll(".lesson-btn")
lessonBtnCss.forEach(btn => btn.classList.remove("active"))
}


const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}` 
    fetch(url)
    .then(res => res.json())
    .then(word => {
        const lessonBtn = document.getElementById(`lesson-btn-${id}`)
        removeActive();
        lessonBtn.classList.add("active")
        displayLoadLevelWord(word.data)})
}

const loadWordDetail= async (id)=> {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDatails(details.data);
}


const displayWordDatails = (word) => {
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
    <div>
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>  :${word.pronunciation})</h2>
        </div>
        <div>
          <h2 class="font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h3 class="font-bold">সমার্থক শব্দ গুলো</h3>
          <div>${creatElementForSynonyms(word.synonyms)}</div>
      </div>
      `
    document.getElementById('word_modal').showModal()
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
        manageSpinner(false);
        return

    }

    words.forEach(word => {

        const wordCart = document.createElement("div")
        wordCart.innerHTML = `
        <div class="bg-gray-50 py-10 px-5 rounded-lg shadow-sm space-y-6">
          <h2 class="text-3xl/6 font-bold">${word.word? word.word : "শব্দ খুজে পাওয়া যায়নি"}</h2>
          <p class="text-sm/6 font-medium">Meaning /Pronounciation</p>
          <div class=" text-3xl font-semibold font-bangla">"${word.meaning? word.meaning : "অর্থ খুজে পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation : "উচ্চারণ খুজে পাওয়া যায়নি"}"</div>
          <div class="flex justify-between ">
            <button onclick="loadWordDetail(${word.id})" class="btn hover:bg-[#1A91FF20] p-2 rounded-sm"><i  class=" text-gray-600 fa-solid fa-circle-info"></i></button>

          <button class="btn hover:bg-[#1A91FF20] p-2 rounded-sm"><i class="text-gray-600 fa-solid fa-volume-high"></i></button>

        </div>
        `;

        wordSection.append(wordCart);
        
    });
manageSpinner(false);

}
const display = (data) => {

    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    data.forEach(item => {
        const divLesson = document.createElement("div")
        divLesson.innerHTML = `
        <button id="lesson-btn-${item.level_no}" onclick="loadLevelWord(${item.level_no})" class="lesson-btn btn btn-outline btn-primary" ><i class="fa-solid fa-book-open"></i></i>Lesson - ${item.level_no}</button>
        
        `
        levelContainer.append(divLesson)
    });
}

loadData();
const creatElement = (arr) => {
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    console.log(htmlElement.join(" "))
    

}

const syn = ["saad", "almi", "kaka"]

creatElement(syn)
const steps = ["one", "two", "three"];

function listTemplate(step) {
  return `<li>${step}</li>`;  //the html string made from step
}
const stepsHtml = steps.map(listTemplate);// use map to convert the list from strings to HTML
document.querySelector("#myList").innerHTML = stepsHtml.join(""); // set the innerHTML



let grades = ["A", "B", "C", "D", "F"];
let point;
let gpaPoints = grades.map(function(grade) {
    switch (grade) {
        case "A":
            point = 4;
            break;
        case "B":
            point = 3
            break;
        case "C":
            point = 2;
            break;
        case "D":
            point = 1;
            break;
        case "F":
            point = 0;
            break;
        default:
            alert("Not a valid grade");
    }
    return point;
})
console.log(gpaPoints);

let totalPoints = gpaPoints.reduce(totalPoint, 0)

function totalPoint(total, point) {
    return total + point;
}
let gpaAverage = totalPoints/gpaPoints.length;

console.log(gpaAverage);




let fruit = ['watermelon', 'peach', 'apple', 'tomato', 'grape']


let shortFruit = fruit.filter(function(item) {
    return item.length < 6;
})

console.log(shortFruit);



let numbers = [12, 34, 21, 54]
const luckyNumber = 21
let luckyIndex = numbers.indexOf(luckyNumber)
if (luckyIndex == 2){
    console.log(luckyNumber)
    console.log(luckyIndex)
}
else {
    console.log("21 is not in the list of numbers.")
}
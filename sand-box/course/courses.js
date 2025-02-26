import {aCourse} from "./js-objects.js";

aCourse.enrollStudent();

document.querySelector("#enroll").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNum").value;
    aCourse.enrollStudent(sectionNum);
});
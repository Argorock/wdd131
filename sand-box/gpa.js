document.addEventListener("DOMContentLoaded", function(){
    function getGrades(inputSelector) {
      // get grades from the input box
      const grades = document.querySelector(inputSelector).value;
      // split them into an array (String.split(','))
      const gradesArray = grades.split(",").map((grade) => grade.trim().toUpperCase());
      console.log(gradesArray);
      // return grades
      return gradesArray;
    }
  
    function calculateGpa(grades) {
      // gets a list of grades passed in
      // convert the letter grades to gpa points
      const gradePoints = grades.map((grade) => {
        let points = 0;
        if (grade === "A") {
          points = 4;
        } else if (grade === "B") {
          points = 3;
        } else if (grade === "C") {
          points = 2;
        } else if (grade === "D") {
          points = 1;
        }
        return points;
      });
      // calculates the GPA
      const gpa = gradePoints.reduce((total, num) => total + num, 0) / gradePoints.length;
      // return the GPA
      return gpa.toFixed(2);
    }
  
    function outputGpa(gpa, selector) {
      // takes a gpa value and displays it in the HTML in the element identified by the selector passed in
      const outputElement = document.createElement("p");
      outputElement.id = "output";
      outputElement.innerText = `Your GPA is: ${gpa}`;
      document.body.appendChild(outputElement);
    }
  
    function clickHandler() {
      // when the button in our html is clicked
      // get the grades entered into the input
      const grades = getGrades("#grades");
      // calculate the gpa from the grades entered
      const gpa = calculateGpa(grades);
      // display the gpa
      outputGpa(gpa, "#output");
    }
  
    document.querySelector("#submitButton").addEventListener("click", clickHandler);
  });
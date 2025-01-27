// const PI = 3.14; 
// defined as PI not pi, be careful how you name things as it must be the same later


// const radius = 3;
// let area = 0;

// area = radius * radius * PI; 
// is case sensitive pi will not work but PI will


// console.log(area);
// radius = 4;
// area = radius * radius * PI;
// console.log(area);

const PI = 3.14;
const radius = 3;
let area = 0;

function circleArea(radius)
{
    area = radius * radius * PI;
    return area;
}


area = circleArea(radius)
console.log(area);
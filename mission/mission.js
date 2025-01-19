const themeSelector = document.querySelector("select");
const img = document.querySelector("img");


function changeTheme() {
    const currentValue = themeSelector.value;
    console.log(currentValue);

    if (currentValue === "Dark") { 
        document.body.classList.add("dark"); 
        console.log("Dark class added"); 
        img.src = "byui-logo_white.png";
    } else { 
        document.body.classList.remove("dark"); 
        console.log("Dark class removed"); 
        img.src = "byui-logo_blue.webp";
    }
    console.log("After Condition Check");


}

// let selectElem = document.querySelector("select");
themeSelector.addEventListener("change", changeTheme);


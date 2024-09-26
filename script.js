function toggleOptions(optionsId) {
  
  const allOptions = document.querySelectorAll('[id$="Options"]');
 
  allOptions.forEach(function(option) {
      option.style.display = "none";
  });


  const selectedOption = document.getElementById(optionsId);
  if (selectedOption.style.display === "none" || selectedOption.style.display === "") {
      selectedOption.style.display = "block";

  }


}   

function toggleSyle(StyleId, type) {
  console.log(type)
  const allStyles = document.querySelectorAll(`[id$="${type}"]`);
  allStyles.forEach(function(option) {
      option.style.display = "none";
  });

  


  const selectedStyle = document.getElementById(StyleId);
  console.log(selectedStyle.style.display)
  if (selectedStyle.style.display === "none" || selectedStyle.style.display === "") {
    selectedStyle.style.display = "block";  
  } 
}


function randomizeStyles() {
 
  const categories = ['BackgroundStyle', 'ColorStyle', 'EyesStyles', 'BodyStyle', 'MouthStyle', 'HairStyle', 'AccessoriesStyle', 'HatStyle'];
  
  categories.forEach(function(category) {
  
      const elements = document.querySelectorAll(`[id$="${category}"]`);
      
      
      elements.forEach(function(element) {
          element.style.display = 'none';
      });
      
  
      const randomElement = elements[Math.floor(Math.random() * elements.length)];
      if (randomElement) {
          randomElement.style.display = 'block';
      }
  });
}

document.getElementById('DownloadImageButton').addEventListener('click', function() {
 
  const avatarContainer = document.querySelector('.images');


  const img = new Image();
  img.crossOrigin = "anonymous";

  
  html2canvas(avatarContainer, {
      useCORS: true, 
      onclone: function(cloneDoc) {
        
          const clonedImg = cloneDoc.createElement('img');
          clonedImg.crossOrigin = "anonymous";
          cloneDoc.body.appendChild(clonedImg);
      }
  }).then(canvas => {
     
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); 
      link.download = 'avatar.png'; 
      link.click(); 
  });
});

function Refresh() {
  location.reload();
}


const text = "Profile Picture Generator!";
const fonts = ['Courier New', 'Times New Roman', 'Verdana', 'Georgia', 'Arial']; // 'Arial' is the target
const weights = ['100', '300', '400', '600', '900'];
const textContainer = document.getElementById('animatedText');

const targetFont = getRandomFont();
const targetWeight = getRandomWeight();

function createLetterSpans(text) {
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
    span.classList.add('letter');
    span.style.fontFamily = FindRandomFont();
    span.style.fontWeight = FindRandomWeight();
    if (char === ' ') {
      span.classList.add('space'); // Add a class to spaces
    }
    textContainer.appendChild(span);
  });
}

function getRandomFont() {
  return fonts[Math.floor(Math.random() * fonts.length)];
}


function getRandomWeight(){
  return weights[Math.floor(Math.random() * weights.length)];
}

function FindRandomFont() {
  return fonts[Math.floor(Math.random() * fonts.length)];
}

// Function to get a random weight
function FindRandomWeight() {
  return weights[Math.floor(Math.random() * weights.length)];
}

// Function to animate the letters
function animateLetters() {
  const letters = document.querySelectorAll('.letter');
  let allSame = true;

  letters.forEach(letter => {
    // Skip spaces
    if (letter.classList.contains('space')) {
      return;
    }

    // If the letter's font or weight is not the target, continue changing
    if (letter.style.fontFamily !== targetFont || letter.style.fontWeight !== targetWeight) {
      allSame = false;
      letter.style.fontFamily = getRandomFont();
      letter.style.fontWeight = getRandomWeight();
    }
  });

  // Stop the interval if all letters have the target font and weight
  if (allSame) {
    clearInterval(animationInterval);
  }
}

// Create letter spans and start the animation
createLetterSpans(text);
const animationInterval = setInterval(animateLetters, 100); // Faster interval: 100ms
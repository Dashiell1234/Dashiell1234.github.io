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
  // Array of category types that you want to randomize
  const categories = ['BackgroundStyle', 'ColorStyle', 'EyesStyles', 'BodyStyle', 'MouthStyle', 'HairStyle', 'AccessoriesStyle', 'HatStyle'];
  
  categories.forEach(function(category) {
      // Get all elements of the current category, including the "None" option
      const elements = document.querySelectorAll(`[id$="${category}"]`);
      
      // Hide all elements of the current category
      elements.forEach(function(element) {
          element.style.display = 'none';
      });
      
      // Randomly select an element from the current category, including the "None" option
      const randomElement = elements[Math.floor(Math.random() * elements.length)];
      if (randomElement) {
          randomElement.style.display = 'block';
      }
  });
}

document.getElementById('DownloadImageButton').addEventListener('click', function() {
  // Select the avatar container you want to capture
  const avatarContainer = document.querySelector('.images');

  // Create an image object and set its crossOrigin property
  const img = new Image();
  img.crossOrigin = "anonymous";

  // Use html2canvas to capture the avatar container
  html2canvas(avatarContainer, {
      useCORS: true, // Enable CORS
      onclone: function(cloneDoc) {
          // Clone the document to handle cross-origin images
          const clonedImg = cloneDoc.createElement('img');
          clonedImg.crossOrigin = "anonymous";
          cloneDoc.body.appendChild(clonedImg);
      }
  }).then(canvas => {
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); // Convert canvas to PNG data URL
      link.download = 'avatar.png'; // Set the file name for the downloaded image
      link.click(); // Trigger the download
  });
});

function Refresh() {
  location.reload();
}

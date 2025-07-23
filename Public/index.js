window.onload = function () {
  const Namebox = document.getElementById('Nameboxid');
  const Messagebox = document.getElementById('Messageboxid');
  const sendButton = document.getElementById('SendButton');

  // Enable send button only when both inputs have text
  function updateSendButton() {
    const hasName = Namebox.value.trim() !== "";
    const hasMessage = Messagebox.value.trim() !== "";
    sendButton.disabled = !(hasName && hasMessage);
  }

  Namebox.addEventListener("input", updateSendButton);
  Messagebox.addEventListener("input", updateSendButton);
  updateSendButton();

  // Load comments from external JSON file
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load comments data');
      }
      return response.json();
    })
    .then(data => {
      renderComments(data.comments);
    })
    .catch(error => {
      console.error('Error loading comments:', error);
    });
};

let messageCount = 0; // Track number of comments rendered

function renderComments(comments) {
  const commentSection = document.querySelector('.CommentSection');
  const template = document.getElementById('MessageBox');

  comments.forEach((comment) => {
    messageCount++;

    const clone = template.cloneNode(true);
    clone.id = `Message${messageCount}`;
    clone.style.display = 'flex';
    clone.style.backgroundColor = '#ffffff';

    const commentName = clone.querySelector('.CommentName');
    const commentMessage = clone.querySelector('.CommentMessage');

    commentName.textContent = comment.user.username;
    commentMessage.textContent = comment.content;

    commentSection.appendChild(clone);
  });

  // Update counter text with number of loaded comments
  document.getElementById('Counter').textContent = "Reviews: " + messageCount;
}

// Called when user clicks Send button
function SendMessage() {
  const Namebox = document.getElementById('Nameboxid');
  const Messagebox = document.getElementById('Messageboxid');
  const sendButton = document.getElementById('SendButton');
  const counter = document.getElementById('Counter');

  const newComment = {
    user: { username: Namebox.value },
    content: Messagebox.value
  };

  fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  })
  .then(response => {
    if (!response.ok) throw new Error("Failed to post comment");
    // Add comment to DOM
    renderComments([newComment]);
    Namebox.value = "";
    Messagebox.value = "";
    sendButton.disabled = true;
  })
  .catch(error => console.error("Error posting comment:", error));
}

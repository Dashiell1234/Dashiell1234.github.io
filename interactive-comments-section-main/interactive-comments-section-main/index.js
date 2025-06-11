//opening page

function openWin() {
  window.open("file:///C:/Users/d.m.mcmillan/OneDrive%20-%20Saint%20Kentigern/Y13/COM/HTML/interactive-comments-section-main/interactive-comments-section-main/coment.html");
}


//Message button

window.onload = function() {
  var Namebox = document.getElementById('Nameboxid');
  var Messagebox = document.getElementById('Messageboxid');
  var sendButton = document.getElementById('SendButton');

  function updateSendButton() {
    const hasName = Namebox.value.trim() !== "";
    const hasMessage = Messagebox.value.trim() !== "";
    const enableButton = hasName && hasMessage;

    sendButton.disabled = !enableButton;
    sendButton.style.backgroundColor = enableButton ?  "#66a6ff" : "#cccccc";

  }

  Namebox.addEventListener("input", updateSendButton);
  Messagebox.addEventListener("input", updateSendButton);

  updateSendButton();
};


//sending message

var i = 0;


function SendMessage() {
  var MessageBox = document.getElementById('MessageBox');
  var clone = MessageBox.cloneNode(true);
  clone.id = "Message" + i;

  var commentName = clone.querySelector('.CommentName');
  var commentMessage = clone.querySelector('.CommentMessage');


  commentName.id = "CommentName" + i;
  commentName.textContent = document.getElementById('Nameboxid').value

  commentMessage.id = "CommentMessage" + i;
  commentMessage.textContent = document.getElementById('Messageboxid').value;

  var commentSection = document.querySelector('.CommentSection');
  commentSection.appendChild(clone);

  clone.style.backgroundColor = "#f0f0f0";
}

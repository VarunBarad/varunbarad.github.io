var config = {
  messageEndPoint: "https://vb-personal-website-backend.herokuapp.com/contact"
};

function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  sendMessageToServer(name, email, message);

  document.getElementById("submit").blur();
  document.getElementById('submit').innerHTML = '<i class=\"fas fa-circle-notch fa-spin\"></i>';
  return false;
}

function sendMessageToServer(name, email, message) {
  fetch(
      config.messageEndPoint,
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      }
  ).then(function (response) {
    return response.json();
  }).then(function (jsonResponse) {
    console.log(jsonResponse);
    // Display the message with a timeout of 2.5 seconds to dismiss it
    var successAlert = '<div><br /><div id="formMessage" class="alert alert-success text-center" role="alert">Your message is received. I will get back to you shortly.</div></div>';
    document.querySelector('#contactForm').innerHTML += successAlert;
    window.setTimeout(function () {
        var contactForm = document.querySelector('#contactForm');
        contactForm.removeChild(contactForm.lastChild);
    }, 2000);
    document.getElementById('submit').innerHTML = 'Submit';
  }).catch(function (error) {
    console.error(error);
    // Display the message with a timeout of 2.5 seconds to dismiss it
    var errorAlert = '<div><br /><div id="formMessage" class="alert alert-danger text-center" role="alert">Your message could not be sent. Can you please try again after some time?</div></div>';
    document.querySelector('#contactForm').innerHTML += errorAlert;
    window.setTimeout(function () {
        var contactForm = document.querySelector('#contactForm');
        contactForm.removeChild(contactForm.lastChild);
    }, 2000);
    document.getElementById('submit').innerHTML = 'Submit';
  });
}

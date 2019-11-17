var config = {
  messageEndPoint: "https://vb-personal-website-backend.herokuapp.com/contact"
};

function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  saveMessageToFirebase(name, email, message);

  document.getElementById("submit").blur();
  document.getElementById('submit').innerHTML = '<i class=\"fas fa-circle-notch fa-spin\"></i>';
  return false;
}

function saveMessageToFirebase(name, email, message) {
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
    document.getElementById('submit').innerHTML = 'Submit';
  }).catch(function (error) {
    console.error(error);
    document.getElementById('submit').innerHTML = 'Submit';
  });
}

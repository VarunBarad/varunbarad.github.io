var config = {
  messageEndPoint: "https://script.google.com/macros/s/AKfycbyLtwo2jHs-sw8h21tzjLiWS_b1IKkl_2s0i3NGC-dYbegzFiER/exec"
};

function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  saveMessageToFirebase(name, email, message);

  document.getElementById("submit").blur();
  return false;
}

function saveMessageToFirebase(name, email, message) {
  fetch(
      config.messageEndPoint + "?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&message=" + encodeURIComponent(message),
      { method: "get" }
  ).then(function (response) {
    return response.json();
  }).then(function (jsonResponse) {
    console.log(jsonResponse);
  }).catch(function (error) {
    console.error(error);
  });
}

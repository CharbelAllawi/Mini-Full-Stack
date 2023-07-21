document.addEventListener("DOMContentLoaded", function () {
  let first_name
  let last_name
  let email
  let password

  let loginemail
  let loginpass
  document.getElementById("signbtn").onclick = function (event) {
    loginemail = document.getElementById("email").value
    loginpass = document.getElementById("password").value
    var formdata = new FormData();
    formdata.append("email", loginemail);
    formdata.append("password", loginpass);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://localhost/Mini-Full-Stack/assets/php/signin.php", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.status)

        if (result.status == "user not found") {
          document.getElementById("paragsignin").style.visibility = 'visible';

          document.getElementById("paragsignin").innerText = "user not found";

        }

        if (result.status == "wrong password") {
          document.getElementById("paragsignin").style.visibility = 'visible';

          document.getElementById("paragsignin").innerText = "wrong password";

        }
        if (result.status != "wrong password" & result.status != "user not found") {
          {

            document.getElementById("paragsignin").style.visibility = 'hidden';

            document.getElementById("loginglob").style.visibility = 'hidden';
            document.getElementById("loginmain").style.marginTop = "40%"

            document.getElementById("loginmain").innerText = "Hello  !  " + result.status;

          }

        }
      })
      .catch(error => console.log('error', error));
  }
})

document.getElementById("registerbtn").onclick = function (event) {
  let first_name = document.getElementById("fname").value;
  let last_name = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;


  var formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("first_name", first_name);
  formdata.append("last_name", last_name);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://localhost/Mini-Full-Stack/assets/php/signup.php", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.status == "success") {
        document.getElementById("paragid").style.visibility = 'hidden';
        document.getElementById("glob").style.visibility = 'hidden';
        document.getElementById("register").style.marginTop = "40%"

        document.getElementById("register").innerText = "Hello  !  " + first_name;

      }
      else {
        document.getElementById("paragid").style.visibility = 'visible';

      }
    })
    .catch(error => console.log('error', error));
};




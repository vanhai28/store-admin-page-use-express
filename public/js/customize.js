// formInforBook.addEventListener("onsubmit", (e) => {
//   console.log("formdata fired");

//   // Get the form data from the event object
//   let data = formInforBook;

//   // submit the data via XHR
//   let xhttp = new XMLHttpRequest();

//   xhttp.onreadystatechange = function () {
//     let success = document.getElementsByClassName("addSucess")[0];
//     let fail = document.getElementsByClassName("addFail")[0];

//     if (this.readyState == 4 && this.status == 200) {
//       fail.ClassName += " d-none";
//       success.className = success.className.replace("d-none", "");
//       success.innerHTML = this.responseText;
//     } else {
//       success.ClassName += " d-none";
//       fail.className = fail.className.replace("d-none", "");
//       fail.innerHTML = this.responseText;
//     }
//   };

//   xhttp.open("POST", "/admin/book/add-book", true);
//   xhttp.send(data);
// });

// function addBookSubmit() {
//   console.log("formdata fired ", formInforBook.title.value);
//   // let formInforBook = document.getElementById("formInforBook");
//   // Get the form data from the event object
//   let data = formInforBook;
//   let newBook = {
//     title: formInforBook.title.value,
//     auther: formInforBook.auther.value,
//     price: formInforBook.price.value,
//     category: formInforBook.category.value,
//     detail: formInforBook.detail.value,
//     images: [
//       formInforBook.linkImage1.value,
//       formInforBook.linkImage2.value,
//       formInforBook.linkImage3.value,
//     ],
//   };
//   console.log(" new", JSON.stringify(newBook));
//   // submit the data via XHR
//   let xhttp = new XMLHttpRequest();

//   xhttp.onreadystatechange = function () {
//     let success = document.getElementsByClassName("addSucess")[0];
//     let fail = document.getElementsByClassName("addFail")[0];

//     if (this.readyState == 4 && this.status == 200) {
//       fail.ClassName += " d-none";
//       success.className = success.className.replace("d-none", "");
//       success.innerHTML = this.responseText;
//     } else {
//       success.ClassName += " d-none";
//       fail.className = fail.className.replace("d-none", "");
//       fail.innerHTML = this.responseText;
//     }
//   };

//   xhttp.open("POST", "/admin/book/add-book", true);
//   xhttp.send(JSON.stringify(newBook));
// }
function modifyStatusAccount() {
  let status = document.getElementsByClassName("status-account");

  for (let index = 0; index < status.length; index++) {
    const element = status[index];

    if (element.className.includes("active")) {
      element.className += " badge-success";
      element.innerHTML = "Hoạt động";
    } else {
      element.className += " badge-danger";
      element.innerHTML = "Đã khoá";
    }
  }
}
modifyStatusAccount();

function deleteBook(id) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    } else if (this.readyState == 4) {
      let mesg = document.getElementsByClassName("messageDelete")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/book/delete-book", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function deleteUserAcc(id) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    } else if (this.readyState == 4) {
      console.log("status ", this.status);
      let mesg = document.getElementsByClassName("messageDelete")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/user/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function blockAccount(id) {
  let xhttp = new XMLHttpRequest();
  console.log("id la ", id);

  let badge = document.getElementById(id);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      badge.innerHTML = "Đã khoá";
      badge.className = badge.className.replace(
        "badge-success",
        "badge-danger"
      );
    } else if (this.readyState == 4) {
      let mesg = document.getElementsByClassName("messageBlock")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/user/block", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function unBlockAccount(id) {
  let xhttp = new XMLHttpRequest();
  console.log("id la ", id);

  let badge = document.getElementById(id);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      badge.innerHTML = "Hoạt động";
      badge.className = badge.className.replace(
        "badge-danger",
        "badge-success"
      );
    } else if (this.readyState == 4) {
      let mesg = document.getElementsByClassName("messageBlock")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/user/un-block", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

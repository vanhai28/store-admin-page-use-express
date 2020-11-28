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

function addBookSubmit() {
  console.log("formdata fired ", formInforBook.title.value);
  // let formInforBook = document.getElementById("formInforBook");
  // Get the form data from the event object
  let data = formInforBook;
  let newBook = {
    title: formInforBook.title.value,
    auther: formInforBook.auther.value,
    price: formInforBook.price.value,
    category: formInforBook.category.value,
    detail: formInforBook.detail.value,
    images: [
      formInforBook.linkImage1.value,
      formInforBook.linkImage2.value,
      formInforBook.linkImage3.value,
    ],
  };
  console.log(" new", JSON.stringify(newBook));
  // submit the data via XHR
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    let success = document.getElementsByClassName("addSucess")[0];
    let fail = document.getElementsByClassName("addFail")[0];

    if (this.readyState == 4 && this.status == 200) {
      fail.ClassName += " d-none";
      success.className = success.className.replace("d-none", "");
      success.innerHTML = this.responseText;
    } else {
      success.ClassName += " d-none";
      fail.className = fail.className.replace("d-none", "");
      fail.innerHTML = this.responseText;
    }
  };

  xhttp.open("POST", "/admin/book/add-book", true);
  xhttp.send(JSON.stringify(newBook));
}

function deleteBook(id) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    } else {
      let mesg = document.getElementsByClassName("messageDelete")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/book/delete-book", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

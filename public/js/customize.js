function filterByCategory(value) {
  document.getElementById("dropdownCategory").innerText = value;
  let table = $("#dataTable").DataTable({
    paging: false,
    retrieve: true,
    searching: false,
  });

  if (value == "All") {
    table.column(2).search("").draw();
    return;
  }

  if (table.column(2).search() !== value) {
    table.column(2).search(value).draw();
  }
}

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
  let boxDelete = document.getElementsByClassName("box-delete-item")[0];
  boxDelete.className = boxDelete.className.replace("d-none", "");
  document
    .getElementsByClassName("btn__confirm-delete")[0]
    .addEventListener("click", () => {
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
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send("id=" + id);
    });

  document
    .getElementsByClassName("btn__back")[0]
    .addEventListener("click", () => {
      if (!boxDelete.className.includes("d-none"))
        boxDelete.className += "d-none";
    });
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

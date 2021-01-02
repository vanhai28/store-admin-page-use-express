// $(document).ready(function () {
//   var result;

//   Handlebars.registerHelper("uppercase", function (val) {
//     return val.toUpperCase();
//   });

//   $.ajax({
//     url: "http://107.109.98.48:8080/test.json",
//     jsonpCallback: "my_callback",
//     contentType: "application/json",
//     dataType: "s",
//     success: function (data) {
//       result = data;
//       console.log(result);
//       var currentTemplateHtml = $("#mytemplate").html();
//       var compliledTemplateHtml = Handlebars.compile(currentTemplateHtml);

//       var contextualHtml = compliledTemplateHtml(result);
//       $(".content-placeholder").html(contextualHtml);
//       console.log(result);
//     },
//     error: function (e) {
//       console.log(e.message);
//     },
//   });
// });

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

  xhttp.open("post", "/admin/book/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function deleteUserAcc(id) {
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

  xhttp.open("post", "/admin/user/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function blockAccount(id) {
  let xhttp = new XMLHttpRequest();

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

  xhttp.open("post", "/admin/user/unblock", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}
// function setOnclickPaginate() {
//   let pageLinkClass = document.getElementsByClassName("btn--pagination");
//   for (let index = 0; index < pageLinkClass.length; index++) {
//     let page = pageLinkClass[index].value;
//     pageLinkClass[index].onclick = function (event) {
//       event.preventDefault();
//       getAPIBooks(page);
//     };
//   }
// }

function getAPIBooks(page) {
  let id_category = document.getElementById("id_Current_category").value;
  let api_link = "/admin/book/api/list?page=" + page + "&idCat=" + id_category;
  console.log("gia tri : ", api_link);

  let xhttp = new XMLHttpRequest();

  let tableData = document.getElementsByClassName("table-responsive")[0];

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      replaceBook(this.responseText);
      replaceBook2(this.responseText);
    } else if (this.readyState == 4) {
      tableData.innerHTML = this.responseText;
    }
  };

  xhttp.open("GET", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function replaceBook(products) {
  // console.log("boo ", products);
  products = JSON.parse(products);

  var template = $("#handlebars-demo").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);
  products.books = products.book;

  var html = templateScript(products);
  //html = 'My name is Ritesh Kumar . I am a developer.'
  console.log("html pag : ", html);
  document.getElementById("pagination").innerHTML = html;
}

function replaceBook2(products) {
  Handlebars.registerHelper("join", function (arr) {
    let result = "";
    for (let i = 0; i < arr.length - 1; i++) {
      result += arr[i] + " ,";
    }
    result += arr[arr.length - 1];
    return result;
  });

  products = JSON.parse(products);
  products = products.book;

  var template = $("#table_data").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);

  var html = templateScript({ products: products });

  document.getElementById("tbody__data").innerHTML = html;
}

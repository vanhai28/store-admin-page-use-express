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
  let status = document.getElementsByClassName("status_account_active");
  console.log("modify status");
  for (let index = 0; index < status.length; index++) {
    const element = status[index];
    element.className += " badge badge-success";
    element.innerHTML = "Hoạt động";
  }

  status = document.getElementsByClassName("status_account_blocked");
  for (let index = 0; index < status.length; index++) {
    const element = status[index];

    element.className += " badge badge-danger";
    element.innerHTML = "Đã khoá";
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

  xhttp.open("post", "/admin/users/delete", true);
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

  xhttp.open("post", "/admin/users/block", true);
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

  xhttp.open("post", "/admin/users/unblock", true);
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

//-------------  USE ajax for list of BOOKS page

//-------------- FOR PAGINATION ----------------

// get data of books from server by page
// @param : page : the page number to get data
function getAPIBooks(page) {
  let id_category = document.getElementById("dropdownCategory").value;
  let api_link = "/admin/book/api/lists?page=" + page + "&idCat=" + id_category;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      replaceBook(this.responseText);
      replaceBook2(this.responseText);
    } else if (this.readyState == 4) {
      $("#message-from-sever").removeClass("d-none");
      $("#message-from-sever").html("error when get data category from server");
    }
  };

  xhttp.open("GET", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

// update new data got from server by using AJAX
// @param products : data got from server
function replaceBook(products) {
  products = JSON.parse(products);

  var template = $("#handlebars-demo").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);
  products.books = products.book;

  var html = templateScript(products);

  document.getElementById("pagination").innerHTML = html;
}

// FOR test , this will be added into function replaceBook
function replaceBook2(products) {
  Handlebars.registerHelper("join", function (arr) {
    let result = "";
    for (let i = 0; i < arr.length - 1; i++) {
      result += arr[i] + " ,";
    }
    result += arr[arr.length - 1];
    return result;
  });
  Handlebars.registerHelper("append", function (str1, str2) {
    return str1 + str2;
  });

  products = JSON.parse(products);
  products = products.book;

  var template = $("#table_data").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);

  var html = templateScript({ products: products });

  document.getElementById("tbody__data").innerHTML = html;
}

// use AJAX for category book -------------------------

// Get data of books by category from server
(function getAPIBooksByCategory(category) {
  const btnCategory = document.getElementsByClassName("btn--category");
  for (let index = 0; index < btnCategory.length; index++) {
    const element = btnCategory[index];
    element.onclick = function () {
      let api_link = "/admin/book/api/list?page=1&&idCat=" + element.value;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          replaceBook(this.responseText);
          replaceBook2(this.responseText);
          let data = JSON.parse(this.responseText);
          if (data.curentCategoryView) {
            $("#dropdownCategory").html(data.curentCategoryView.nameOfCategory);
            document.getElementById("dropdownCategory").value =
              data.curentCategoryView._id;
          } else {
            $("#dropdownCategory").html("All");
            document.getElementById("dropdownCategory").value = 0;
          }
        } else if (this.readyState == 4) {
          $("#message-from-sever").removeClass("d-none");
          $("#message-from-sever").html(
            "error when get data category from server"
          );
        }
      };

      xhttp.open("GET", api_link, true);
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send();
    };
  }
})();

function getAPI_Users(page) {
  let api_link = "/admin/users/api/list?page=" + page;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      replaceUser(this.responseText);
    } else if (this.readyState == 4) {
      $("#message-from-sever").removeClass("d-none");
      $("#message-from-sever").html("error when get data user from server");
    }
  };

  xhttp.open("GET", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function replaceUser(data) {
  data = JSON.parse(data);
  Handlebars.registerHelper("append", function (str1, str2) {
    return str1 + str2;
  });
  let template = $("#replaceDataUser").html();

  let templateScript = Handlebars.compile(template);
  data = data.data;
  console.log("data sâsassa ", data);
  let html = templateScript({ data: data });
  console.log("html : ", html);
  document.getElementById("cart__body").innerHTML = html;
  modifyStatusAccount();
}

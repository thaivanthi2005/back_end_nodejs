// Button-status

const button_Satus = document.querySelectorAll("[button-status]");
if (button_Satus.length > 0) {
  let url = new URL(window.location.href);

  button_Satus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

//End_bt_STATUS

//FORM SEARCH

const formsearch = document.querySelector("#form-search");
if (formsearch) {
  let url = new URL(window.location.href);
  formsearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url;
  });
}

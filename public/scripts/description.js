const sendButton = document.getElementById("send");
const commentField = document.getElementById("comment");

const getComments = async () =>
  fetch("/description", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

function capitalizeEachWord(str) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

const sendCommentToServer = (comment) => {
  const butterflyName = capitalizeEachWord(
    String(window.location).split("/").pop().replace("_", " ")
  );

  fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment, butterflyName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log("Comment sent to fetch:", data);
      // Add comment to the page
    }).then (data => {
        location.reload()
    })
    .catch((error) => {
      console.error("Error saving comment:", error);
      // Handle errors if the comment couldn't be saved
    });
};

commentField.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    const comment = commentField.value;
    // console.log(comment);
    sendCommentToServer(comment);
    commentField.value = "";
  }
});
sendButton.addEventListener("mouseover", function () {
  sendButton.style.cursor = "pointer";
});
sendButton.addEventListener("click", function () {
  sendButton.style.cursor = "pointer";
  const comment = commentField.value;
  console.log(comment);
  commentField.value = "";
  sendCommentToServer(comment);
});

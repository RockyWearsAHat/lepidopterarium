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
      if (!response.ok) throw new Error("Unable to post");
      response.json();
    })
    .then((data) => {
      // console.log(data.message);
      window.location.reload();
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

sendButton.addEventListener("click", function () {
  if (
    document.getElementById("send").getAttribute("disabled") == "true" ||
    document.getElementById("comment").getAttribute("disabled") == "true"
  )
    return;
  const comment = commentField.value;
  console.log(comment);
  commentField.value = "";
  sendCommentToServer(comment);
});

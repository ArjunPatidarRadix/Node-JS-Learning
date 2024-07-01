const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const message = event.target.elements.message.value;
  socket.emit("sendMessage", message);
});

// socket.on("countUpdated", (count) => {
//   console.log("count has been updated " + count);
// });

// document.querySelector("#inrement").addEventListener("click", () => {
//   console.log("inrement clicked");
//   socket.emit("increment");
// });

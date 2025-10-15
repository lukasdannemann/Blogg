const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");
const postsContainer = document.getElementById("posts-container");
const form = document.querySelector(".postForm");
//Deklarerar variabler för att hämta element från HTML

// Skapar en array för alla inlägg
let posts = [];

function renderPosts() {
  // Funktion för att visa alla inlägg på sidan
  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {
    // Skapar HTML-element för varje inlägg, lägger in dem i postsContainer och ger dem klassnamn
    // för CSS
    const postDiv = document.createElement("div");
    postDiv.className = "postDiv";

    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title;

    const postDate = new Date(post.date);

    const authorTextDiv = document.createElement("div");
    authorTextDiv.className = "authorTextDiv";

    const authorSpan = document.createElement("span");
    authorSpan.className = "authorSpan";
    authorSpan.innerHTML = `Av: <strong>${post.author}</strong>`;

    const dateSpan = document.createElement("span");
    dateSpan.className = "dateSpan";
    dateSpan.innerHTML = `<strong>${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}</strong> | <strong>${postDate.getHours()}:${postDate.getMinutes()}</strong>`;

    authorTextDiv.appendChild(authorSpan);
    authorTextDiv.appendChild(dateSpan);

    const postText = document.createElement("p");
    postText.textContent = post.content || "";

    const postButtons = document.createElement("div");
    postButtons.className = "postButtons";

    const likeButton = document.createElement("button");
    const likeIcon = document.createElement("i");
    likeIcon.className = "fa-regular fa-heart fa-lg";
    likeButton.appendChild(likeIcon);
    postButtons.appendChild(likeButton);

    let liked = false;
    likeButton.addEventListener("click", function() {

      if (!liked) {
        liked = true;

        likeIcon.classList.remove("fa-regular");
        likeIcon.classList.add("fa-solid");
        likeIcon.style.color = "red";
      }

      else {
        liked = false;

        likeIcon.classList.remove("fa-solid");
        likeIcon.classList.add("fa-regular");
        likeIcon.style.color = "";
      }
    });

    
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can fa-lg"; // Exempel med Font Awesome
    deleteButton.appendChild(deleteIcon);
    postButtons.appendChild(deleteButton);
    
    deleteButton.addEventListener("click", () =>{
      //Tar bort inlägget beroende på index
      posts.splice(index, 1);
      renderPosts();
    });

    postDiv.appendChild(postTitle);
    postDiv.appendChild(authorTextDiv);
    postDiv.appendChild(postText);
    postDiv.appendChild(postButtons);

    postsContainer.appendChild(postDiv);
  });
}

// Event listener för när man publicerar formuläret
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newPost = {
      title: titleInput.value.trim(),
      author: authorInput.value.trim(),
      content: contentInput.value.trim(),
      date: new Date()
    };

  // Felmeddelande om något fält inte är ifyllt
  if (!newPost.title || !newPost.author || !newPost.content) {
    alert("Alla fält måste fyllas i.");
    return;
  }
  // Lägger till nya inlägg i början av arrayen för att få dem högst upp på sidan.
  // Kör funktionen renderPosts() för att uppdatera sidan med nya inlägg
  // Återställer formuläret med reset()
  posts.unshift(newPost);
  renderPosts();
  console.log(posts);
  form.reset();
});

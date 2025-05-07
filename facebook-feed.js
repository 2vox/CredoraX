document.addEventListener("DOMContentLoaded", function () {
    const token = '620028821089470|0Px9uiEFXAGaRXJb1BMjVVrPYJA'; // ← Shyiramo access token yawe hano
    const pageId = 'AzOzKcGPIugGo2Vot3-KWXJ'; // ← Shyiramo Facebook Page ID yawe hano
  
    fetch(`https://graph.facebook.com/${pageId}/posts?fields=message,created_time&access_token=${token}`)
      .then(response => response.json())
      .then(data => {
        const feedDiv = document.getElementById("fb-feed");
        if (!data.data || data.data.length === 0) {
          feedDiv.innerHTML = "<p>Nta makuru ahari kuri Facebook page.</p>";
          return;
        }
  
        data.data.forEach(post => {
          const postDiv = document.createElement("div");
          postDiv.className = "card mb-3";
          postDiv.innerHTML = `
            <div class="card-body">
              <p class="card-text">${post.message || 'Ntacyo yanditse.'}</p>
              <small class="text-muted">${new Date(post.created_time).toLocaleString()}</small>
            </div>
          `;
          feedDiv.appendChild(postDiv);
        });
      })
      .catch(error => {
        console.error("Ikibazo kuri API:", error);
        document.getElementById("fb-feed").innerHTML = "<p>Habaye ikibazo mu gukurura amakuru ya Facebook.</p>";
      });
  });
  
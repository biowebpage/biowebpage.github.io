document.addEventListener("DOMContentLoaded", function () {
  const url = "https://10c032e9-a232-47c5-93c6-8eac5f76f8d2-00-2wh1918s6dt94.worf.replit.dev"
  const text = "RowdyRobloxYT";
  const typewriterText = document.getElementById("typewriter-text");
  const music = document.getElementById("background-music");
  const muteButton = document.getElementById("mute-button");
  const discordPic = document.getElementById("discord-pic");
  const discordName = document.getElementById("discord-name");
  const discordLastSeen = document.getElementById("discord-last-seen");
  let index = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const backspaceSpeed = typingSpeed / 1.5; // 1.5x speed for backspacing

  // Start the music automatically
  music.play();

  muteButton.addEventListener("click", function () {
    if (music.muted) {
      music.muted = false;
      muteButton.textContent = "Mute";
    } else {
      music.muted = true;
      muteButton.textContent = "Unmute";
    }
  });

  function type() {
    if (!isDeleting && index < text.length) {
      typewriterText.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && index > 0) {
      typewriterText.innerHTML = text.substring(0, index - 1);
      index--;
      setTimeout(type, backspaceSpeed);
    } else if (!isDeleting && index === text.length) {
      isDeleting = true;
      setTimeout(type, 2000); // Wait for 2 seconds before backspacing
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      setTimeout(type, 500); // Wait for a bit before typing again
    }
  }

  type();

  async function fetchDiscordStatus() {
    try {
      const response = await fetch(
        url + "/discord-status/1080256348035498125"
      );
      const data = await response.json();
      discordPic.src = data.avatar;
      discordName.textContent = data.username;
      discordLastSeen.textContent = `Status: ${data.status}`;
    } catch (error) {
      console.error("Error fetching Discord status:", error);
    }
  }

  fetchDiscordStatus();
});

async function getGuildData(invCode) {
  try {
    const response = await fetch(`https://10c032e9-a232-47c5-93c6-8eac5f76f8d2-00-2wh1918s6dt94.worf.replit.dev/invite/${invCode}`);
    const data = await response.json();
    console.log(data);

    // Update HTML elements with the received data
    document.getElementById("name").textContent = data.name;
    document.getElementById("approximate_member_count").textContent = `Members: ${data.approximate_member_count}`;
    document.getElementById("approximate_presence_count").textContent = `Online Members: ${data.approximate_presence_count}`;
    return data;
  } catch (error) {
    console.error("Error fetching guild data:", error);
  }
}

const invCode = "";

// Await the result of getGuildData
(async () => {
  const guildData = await getGuildData(invCode);
  console.log("Guild data:", guildData);
})();
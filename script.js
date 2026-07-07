let team = {
  id: "1",
  name: "Uzbekiston",
  players: [],
};

const STORAGE_KEY = "footballTeam";
let selectedPlayerId = null;
let selectedPosition = "";

loadData();
renderTeamName();
renderField();

function loadData() {
  let data = localStorage.getItem(STORAGE_KEY);

  if (data) {
    team = JSON.parse(data);
  } else {
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
}

function renderTeamName() {
  document.getElementById("teamName").innerHTML = team.name;
}

function renderField() {
  let positions = [
    "st",

    "am-left",
    "am-right",

    "cm-left",
    "cm-center-left",
    "cm-center-right",
    "cm-right",

    "cb-left",
    "cb-center",
    "cb-right",

    "gk",
  ];

  positions.forEach(function (position) {
    let div = document.getElementById(position);

    let player = team.players.find(function (item) {
      return item.positionId == position;
    });

    if (player) {
      div.innerHTML = `

            <div class="player-card"
                 onclick="editPlayer('${player.id}')">

                <div class="player-number">

                    ${player.number}

                </div>

                <img
                    class="club-logo"
                    src="${player.clubLogoUrl}"
                >

                <img
                    class="player-avatar"
                    src="${player.avatarUrl}"
                >

                <div class="player-name">

                    ${player.name}

                </div>

            </div>

            `;
    } else {
      div.innerHTML = `

            <div
                class="position empty"
                onclick="openAddPlayerModal('${position}')"
            >

                +

            </div>

            `;
    }
  });
}

function openAddPlayerModal(position = "") {
  selectedPlayerId = null;

  selectedPosition = position;

  document.getElementById("modalTitle").innerHTML = "Add Player";

  document.getElementById("playerName").value = "";

  document.getElementById("playerNumber").value = "";

  document.getElementById("playerAvatar").value = "";

  document.getElementById("playerClub").value = "";

  if (position != "") {
    document.getElementById("playerPosition").value = position;
  }

  document.getElementById("deleteBtn").style.display = "none";

  document.getElementById("playerModal").style.display = "flex";
}
function closePlayerModal() {
  document.getElementById("playerModal").style.display = "none";
}

function editPlayer(id) {
  selectedPlayerId = id;

  let player = team.players.find(function (item) {
    return item.id == id;
  });

  if (!player) return;

  document.getElementById("modalTitle").innerText = "Edit Player";

  document.getElementById("playerName").value = player.name;

  document.getElementById("playerNumber").value = player.number;

  document.getElementById("playerAvatar").value = player.avatarUrl;

  document.getElementById("playerClub").value = player.clubLogoUrl;

  document.getElementById("playerPosition").value = player.positionId;

  document.getElementById("deleteBtn").style.display = "inline-block";

  document.getElementById("playerModal").style.display = "flex";
}

function savePlayer() {
  let name = document.getElementById("playerName").value.trim();

  let number = document.getElementById("playerNumber").value;

  let avatar = document.getElementById("playerAvatar").value.trim();

  let club = document.getElementById("playerClub").value.trim();

  let position = document.getElementById("playerPosition").value;

  if (name == "") {
    alert("Player name required");

    return;
  }

  let playerOnPosition = team.players.find(function (item) {
    return item.positionId == position && item.id != selectedPlayerId;
  });

  if (playerOnPosition) {
    alert("This position already has a player!");

    return;
  }

  if (selectedPlayerId == null) {
    let player = {
      id: Date.now().toString(),

      name: name,

      number: number,

      positionId: position,

      avatarUrl: avatar,

      clubLogoUrl: club,
    };

    team.players.push(player);
  } else {
    let player = team.players.find(function (item) {
      return item.id == selectedPlayerId;
    });

    player.name = name;

    player.number = number;

    player.positionId = position;

    player.avatarUrl = avatar;

    player.clubLogoUrl = club;
  }

  saveData();

  renderField();

  closePlayerModal();
}

function deletePlayer() {
  if (selectedPlayerId == null) {
    return;
  }

  let answer = confirm("Delete this player?");

  if (!answer) {
    return;
  }

  team.players = team.players.filter(function (item) {
    return item.id != selectedPlayerId;
  });

  saveData();

  renderField();

  closePlayerModal();
}

function openTeamModal() {
  document.getElementById("teamInput").value = team.name;

  document.getElementById("teamModal").style.display = "flex";
}

function closeTeamModal() {
  document.getElementById("teamModal").style.display = "none";
}

function saveTeamName() {
  let name = document.getElementById("teamInput").value.trim();

  if (name == "") {
    alert("Team name required");

    return;
  }

  team.name = name;

  saveData();

  renderTeamName();

  closeTeamModal();
}

window.onclick = function (event) {
  let playerModal = document.getElementById("playerModal");

  let teamModal = document.getElementById("teamModal");

  if (event.target == playerModal) {
    closePlayerModal();
  }

  if (event.target == teamModal) {
    closeTeamModal();
  }
};

window.openAddPlayerModal = openAddPlayerModal;

window.closePlayerModal = closePlayerModal;

window.savePlayer = savePlayer;

window.editPlayer = editPlayer;

window.deletePlayer = deletePlayer;

window.openTeamModal = openTeamModal;

window.closeTeamModal = closeTeamModal;

window.saveTeamName = saveTeamName;

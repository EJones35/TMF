function getMissionsData() {
	const rawData = localStorage.getItem("missionsData");
	return rawData ? JSON.parse(rawData) : {};
}

function saveAndRenderMissions() {
	const missionsCompletedForm = document.querySelector("#missions-completed");
	const updatedMissions = {};
	const checkboxes = missionsCompletedForm.querySelectorAll("input[type='checkbox']");

	checkboxes.forEach(function(checkbox) {
		updatedMissions[checkbox.id] = {
			completed: checkbox.checked
		};
	});

	localStorage.setItem("missionsData", JSON.stringify(updatedMissions));
	loadDb();
}

function checkCompletedMissions() {
	const missionsCompletedForm = document.querySelector("#missions-completed");
	const missions = getMissionsData();

	for (const missionId in missions) {
		const checkbox = document.querySelector("#" + missionId);
		if (checkbox) {
			checkbox.checked = Boolean(missions[missionId].completed);
		}
	}
	
	if (missionsCompletedForm) {
		missionsCompletedForm.addEventListener("change", saveAndRenderMissions);
	}
}

function loadDb() {
	const missionSection = document.querySelector("#missionSection");
	if (!missionSection) return;

	const missions = getMissionsData();

	missionSection.innerHTML = `<h2 class="title">Missions</h2>`;

	const hasCompletedMissions = missions.op01?.completed || missions.op02?.completed || missions.op03?.completed;

	if (hasCompletedMissions) {
		if (missions.op01?.completed) {
			addMission1Content(missionSection);
		}
		if (missions.op02?.completed) {
			addMission2Content(missionSection);
		}
		if (missions.op03?.completed) {
			addMission3Content(missionSection);
		}
	} else {
		missionSection.innerHTML += `<h3 class="subtitle">No missions completed</h3>`;
	}
}

function addMission1Content(container) {
	container.innerHTML += `
		<div id="op01Section">
			<h3 class="subtitle">Operation: Forgotten Memories</h3>
			<p>One ship, one frequency, one mystery, can you solve it?</p>
		</div>`;
}

function addMission2Content(container) {
	container.innerHTML += `
		<div id="op02Section">
			<h3 class="subtitle">Operation: Murder</h3>
			<p>A murder?!</p>
		</div>`;
}

function addMission3Content(container) {
	container.innerHTML += `
		<div id="op03Section">
			<h3 class="subtitle">Operation: Mandela</h3>
			<p>Nothing is as it seems...</p>
		</div>`;
}

checkCompletedMissions();
loadDb();
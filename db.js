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
			<h4>Database Content</h4>
				<p>
					Medical Record - TMF Aestrea's Vow
					== AUTOMATED MEDICAL REPORT FROM TMF Zenith's Promise ==
					Subject: Zenith Lowell
					Ship: The Aestrea's Vow
					Findings
					The subject's ship seems to have been remotely controlled by an unknown force. During this, the ship was forcefully flown into a vast number of asteroids, knocking the subject unconscious.
					Scans indicate this is what made the subject lose his memories.
					Recommended Actions
					Get the subject to the nearest station for a full scan, probabilities suggest that TMF Genesis Beam would be the most suitable ship for taking the subject there.
					This ship's onboard computer will remotely escort the subject's ship to the station, then follow close behind.
					END REPORT ==</p>
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

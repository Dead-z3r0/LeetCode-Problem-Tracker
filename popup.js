document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('problem-list');
  const emptyMsg = document.getElementById('empty');
  // Load problems from Chrome Storage
  chrome.storage.local.get({ problems: [] }, (data) => {
    const problems = data.problems;
    if (problems.length === 0) {
      emptyMsg.style.display = 'block';
      console.log("0 prob, empty msg shown");
      return;
    }
    problems.forEach((prob, index) => {
      const li = document.createElement('li');
      // Create clickable link
      const link = document.createElement('span');
      link.className = 'prob-link';
      link.innerText = prob.name;
      link.addEventListener('click', () => {
        chrome.tabs.create({ url: prob.url });
        console.log("Link clicked for:", prob.name);
      });
      // Create delete button
      const delBtn = document.createElement('button');
      delBtn.className = 'del-btn';
      delBtn.innerText = '❌';
      delBtn.title = "Remove";
      delBtn.addEventListener('click', () => {
        removeProblem(index);
        console.log("Delete clicked for index no:", index);
      });
      // adding the link and delete button
      li.appendChild(link);
      li.appendChild(delBtn);
      listContainer.appendChild(li);
    });
  });

  // Function to slice out a problem and refresh the view
  function removeProblem(index) {
    chrome.storage.local.get({ problems: [] }, (data) => {
      let currentList = data.problems;
      currentList.splice(index, 1); // Remove item at index
      chrome.storage.local.set({ problems: currentList }, () => {
        window.location.reload(); // UI refrshers
      });
    });
    console.log("Removed and refreshed");
  }
});

// working check
console.log("Script is running fine");
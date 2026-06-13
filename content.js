function injectTrackerButton() {
  // Target LeetCode's current specific class for problem titles
  const titleElement = document.querySelector('.text-title-large');
  if (!titleElement) return; // Exit if the title hasn't rendered yet taaki unnecessary button creation na ho
  // Prevent duplicate buttons if React re-renders the component
  if (document.getElementById('lc-tracker-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'lc-tracker-btn';
  btn.innerText = '➕';
  // Styling to ensure it sits nicely next to the title
  btn.style.marginLeft = '12px';
  btn.style.cursor = 'pointer';
  btn.style.background = 'none';
  btn.style.border = 'none';
  btn.style.fontSize = '20px';
  btn.style.display = 'inline-flex';
  btn.style.alignItems = 'center';
  btn.title = "Add to Problem Tracker";
  console.log("Tracker button created");
  btn.addEventListener('click', (e) => {  
    e.preventDefault(); // Prevent accidental navigation if clicking near a link
    const problemName = titleElement.innerText.trim();
    const problemUrl = window.location.href.split('?')[0]; 
    chrome.storage.local.get({ problems: [] }, (data) => {
      const currentList = data.problems;
      console.log("Current problem list:", currentList);
      const exists = currentList.some(p => p.url === problemUrl);
      if (!exists) {
        currentList.push({ name: problemName, url: problemUrl });
        chrome.storage.local.set({ problems: currentList }, () => {
          console.log("Problem added to tracker");
          btn.innerText ='✅';
        });
      } else {
        alert("Problem already added in the tracker");
      }
    });
  });
  // Inserting the button directly after the title element itself
  titleElement.parentNode.insertBefore(btn, titleElement.nextSibling);
  console.log("Tracker button injected");
}
// its like watching dom for any changes then calling the func to inject the btn
const observer = new MutationObserver(() => {
  injectTrackerButton();
});
observer.observe(document.body, { 
  childList: true, 
  subtree: true 
});
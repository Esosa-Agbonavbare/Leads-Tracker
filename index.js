let myLeads;
myLeads = [];
const leadInput = document.getElementById("input");
const leadCommit = document.getElementById("save-btn");
const leadItems = document.getElementById("u_list");
const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("delete-btn");

leadCommit.addEventListener("click", function() {
    if (leadInput.value != " ") {
        myLeads.push(leadInput.value)
        leadInput.value = " ";
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
})

function render(leads)  {
    let leadList = " ";
    for (let i = 0; i < leads.length; i++) {
        leadList += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    leadItems.innerHTML = leadList;
}

if (localStorageLeads) {
    myLeads = localStorageLeads;
    render(myLeads);
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

delBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})
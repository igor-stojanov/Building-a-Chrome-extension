let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el") // const - cannot be reassigned
let inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
let tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        // listItems += "<li><a target='_blank' href=' " + myLeads[i] + "' >" + "</a></li>"
        listItems += `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
        `
        // const li = document.createElement("li") -- second way
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLeads()
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
})
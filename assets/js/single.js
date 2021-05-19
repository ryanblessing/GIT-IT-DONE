var repoNameEl = document.querySelector("#repo-name");
var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {

//variable to hold the querry
var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
//fetch function to make sure the information is coming back to us
fetch (apiUrl).then(function(response) {
    //stating if it was successful to display
    if(response.ok) {
        response.json().then(function(data) {
            // pass response data to DOM function
            displayIssues(data);

            if (response.headers.get("link")) {
                displayWarning(repo);
            }
        });
    }
    else {
        console.log(response);
        alert("There was a problem with your request!");
    }
});
};
var displayIssues = function(issues) {

    if (issues,length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    
    issueContainerEl.appendChild(issueEl);

    //loop over the repos
for (var i = 0; i < issues.length; i++) {
    //format repo name
    var issuesName = issues[i].owner.login + '/' + issues[i].name;

    //create a <a> ellement for each issue
    var issueEl = document.createElement('a');
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    
    // html_url links to the full issue on github
    issueEl.setAttribute("href", issues[i].html_url);
    
    // target="_blank" is added to each <a> element to open the link in a new tab instead
    // of replacing he current page
    issueEl.setAttribute("target", "_blank");

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    //check if issue is an actual issue or a pull request
    if(issues[i].pull_request) {
        typeEl.textContent = "(pull request)";
    } else {
        typeEl.textContent = "(Issues)";
    }
    // append to container
    issueEl.appendChild(typeEl);
    }
};
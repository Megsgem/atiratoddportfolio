var languageFilter = '';
var engineFilter = '';
var filters= [];
var darkMode = false;
darkMode = sessionStorage.getItem("darkMode") ? JSON.parse(sessionStorage.getItem("darkMode")) : false;

if(darkMode == true){
    var i, j, k, l, a, b;
    document.getElementById('body').classList.toggle('dark_mode');
    document.getElementById('text').classList.toggle('dark_mode_text');
    document.getElementById('title').classList.toggle('dark_mode_title');
    if(document.getElementById('h4') != null){
        document.getElementById('h4').classList.toggle('dark_mode_h4');
    }

    if(document.getElementById('filter_button') != null){
        document.getElementById('filter_button').classList.toggle('dark_mode');
    }

    if(document.getElementById('categories') != null){
        document.getElementById('categories').classList.toggle('dark_mode');
    }

    if(document.getElementById('search') != null){
        document.getElementById('search').classList.toggle('dark_mode_search');
    }
    
    document.getElementById('dark_mode_icon').classList.toggle('dark_mode');
    document.getElementById('moon_button').classList.toggle('sun_button');

    var github_icon = document.getElementById('github');
    var linkedin_icon = document.getElementById('linkedin');
    if(github_icon != null && linkedin_icon != null){
        if(github_icon instanceof HTMLImageElement && linkedin_icon instanceof HTMLImageElement){
            github_icon.src = "images/homepage/github_icon.png";
            linkedin_icon.src = "images/homepage/linkedin_icon.png";
        }
    }

    var dark_mode_button_icon = document.getElementById('dark_mode_icon');
    if(dark_mode_button_icon instanceof HTMLImageElement){
        dark_mode_button_icon.src = "images/sun_icon_2.png";
    }

    var h5 = document.getElementsByTagName('h5');
    for(i = 0; i < h5.length; i++){
        h5[i].style.color="rgb(158, 83, 228)";
    }

    var panels = document.getElementsByClassName('panel');
    for(j = 0; j < panels.length; j++){
        panels[j].className += '  dark_mode_panel';
    }

    var play_icons = document.getElementsByClassName('play_icon');
    for(k = 0; k < play_icons.length; k++){
        var play_icon_image = play_icons[k];
        if(play_icon_image instanceof HTMLImageElement){
            play_icon_image.src = "images/homepage/dark_mode_play_icon.png"
        }
    }

    var learn_more_icons = document.getElementsByClassName('learn_more_icon');
    for(l = 0; l < learn_more_icons.length; l++){
        var learn_more_icon_image = learn_more_icons[l];
        if(learn_more_icon_image instanceof HTMLImageElement){
            learn_more_icon_image.src = "images/homepage/dark_mode_learn_more_icon.png"
        }
    }

    var text = document.getElementsByClassName('text');
    for(a = 0; a < text.length; a++){
        text[a].className += '  dark_mode_panel_text';
    }

    var h3 = document.getElementsByTagName('h3');
    for(b = 0; b < h3.length; b++){
        h3[b].style.color="rgb(164, 90, 233)";
    }

    var learnedText = document.getElementsByClassName('learned_text');
    if(learnedText != null){
        for(var c = 0; c < learnedText.length; c++){
            learnedText[c].className += ' dark_mode_text';
        }
    }
}

function displayMenu(v){
    document.getElementById(v).classList.toggle('show');
}

window.onclick = function(event) {
  if (!event.target.matches('.filter_button') && !event.target.matches('button')) {
    var categories = document.getElementsByClassName('categories_list');
    var i;
    for (i = 0; i < categories.length; i++) {
      var openCategories = categories[i];
      if (openCategories.classList.contains('show')) {
        openCategories.classList.remove('show');
      }
    }

    var filters = this.document.getElementsByClassName('filters_list');
    var j;
    for(j = 0; j < filters.length;j++){
        var openFilters = filters[j];
        if(openFilters.classList.contains('show')){
            openFilters.classList.remove('show');
        }
    }
  }
}

function updateLanguageFilter(language){
  if (language == 'clear'){
    language = '';
  }

  languageFilter = language;
  filters[0] = language;
  filters[1] = engineFilter;

  filterProjects();
}

function updateEngineFilter(engine){
  if (engine == 'clear'){
    engine = '';
  }

  engineFilter = engine;
  filters[0] = languageFilter;
  filters[1] = engine;

  filterProjects();
}

function clearAllFilters(){
  languageFilter = '';
  engineFilter = '';

  for(var i = 0; i < filters.length; i++){
    filters[i] = '';
  }
  
  filterProjects();
}

function filterProjects(){
  var projects, i, j;
  projects = document.getElementsByClassName('panel');

  for(i = 0; i < projects.length; i++){
    var show_project = true;
    hideProject(projects[i], 'hide');
    for(j = 0; j < filters.length; j++){
      if (projects[i].className.indexOf(filters[j]) <= -1){
        //showEvent(events[i], 'hide_event');
        show_project = false;
        break;
      }
    }

    if(show_project == true){
      showProject(projects[i], 'hide')
    }
  }
}

// Show filtered elements
function showProject(project, projectTag) {
  var i, projectArr, tagArr;
  projectArr = project.className.split(' ');
  tagArr = projectTag.split(' ');
  for (i = 0; i < tagArr.length; i++) {
    while (projectArr.indexOf(tagArr[i]) > -1) {
      projectArr.splice(projectArr.indexOf(tagArr[i]), 1);
    }
  }
  project.className = projectArr.join(' ');
}

// Hide elements that are not selected
function hideProject(project, projectTag) {
  var i, projectArr, tagArr;
  projectArr = project.className.split(' ');
  tagArr = projectTag.split(' ');
  for (i = 0; i < tagArr.length; i++) {
    if (projectArr.indexOf(tagArr[i]) == -1) {
      project.className += ' ' + tagArr[i];
    }
  }
}

function searchProjects(){
  var input, filter, projectGrid, projects, h5, i, title;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  projectGrid = document.getElementById('projects_grid');
  projects = projectGrid.getElementsByTagName('article');

  //Loop through events and hide the ones that don't match search
  for (i = 0; i < projects.length; i++) {
    h5 = projects[i].getElementsByTagName("h5")[0];
    title = h5.textContent || h5.innerText;
    if (title.toUpperCase().indexOf(filter) > -1) {
      projects[i].style.display = "";
    } else {
      projects[i].style.display = "none";
    }
  }
}

function toggleDarkMode(){
    var i, j, k, l, a, b;
    document.getElementById('body').classList.toggle('dark_mode');
    document.getElementById('text').classList.toggle('dark_mode_text');
    document.getElementById('title').classList.toggle('dark_mode_title');
    if(document.getElementById('h4') != null){
        document.getElementById('h4').classList.toggle('dark_mode_h4');
    }

    if(document.getElementById('filter_button') != null){
        document.getElementById('filter_button').classList.toggle('dark_mode');
    }

    if(document.getElementById('categories') != null){
        document.getElementById('categories').classList.toggle('dark_mode');
    }

    if(document.getElementById('search') != null){
        document.getElementById('search').classList.toggle('dark_mode_search');
    }
    
    document.getElementById('dark_mode_icon').classList.toggle('dark_mode');
    document.getElementById('moon_button').classList.toggle('sun_button');

    var github_icon = document.getElementById('github');
    var linkedin_icon = document.getElementById('linkedin');
    if(github_icon != null && linkedin_icon != null){
        if(github_icon instanceof HTMLImageElement && linkedin_icon instanceof HTMLImageElement){
            if(darkMode == false){
                github_icon.src = "images/homepage/github_icon.png";
                linkedin_icon.src = "images/homepage/linkedin_icon.png";
            }
            else{
                github_icon.src = "images/homepage/github logo.png";
                linkedin_icon.src = "images/homepage/linkedin logo.png";
            }
        }
    }

    var dark_mode_button_icon = document.getElementById('dark_mode_icon');
    if(dark_mode_button_icon instanceof HTMLImageElement){
        if(darkMode == false){
            dark_mode_button_icon.src = "images/sun_icon_2.png";
        }
        else{
            dark_mode_button_icon.src = "images/moon_icon.png";
        }
    }

    var h5 = document.getElementsByTagName('h5');
    for(i = 0; i < h5.length; i++){
        if(darkMode == false){
            h5[i].style.color="rgb(158, 83, 228)";
        }
        else{
            h5[i].style.color="#6b2ea8"
        }
    }

    var panels = document.getElementsByClassName('panel');
    for(j = 0; j < panels.length; j++){
        if(darkMode == false){
            panels[j].className += '  dark_mode_panel';
        }
        else{
            var classArr = panels[j].className.split(' ');
            panels[j].className = classArr[0];
        }
    }

    var play_icons = document.getElementsByClassName('play_icon');
    if(play_icons != null){
        for(k = 0; k < play_icons.length; k++){
            var play_icon_image = play_icons[k];
            if(darkMode == false){
                if(play_icon_image instanceof HTMLImageElement){
                    play_icon_image.src = "images/homepage/dark_mode_play_icon.png"
                }
            }
            else{
                if(play_icon_image instanceof HTMLImageElement){
                    play_icon_image.src = "images/homepage/play icon 7.png"
                }
            }
        }
    }

    var learn_more_icons = document.getElementsByClassName('learn_more_icon');
    if(learn_more_icons != null){
        for(l = 0; l < learn_more_icons.length; l++){
            var learn_more_icon_image = learn_more_icons[l];
            if(darkMode == false){
                if(learn_more_icon_image instanceof HTMLImageElement){
                    learn_more_icon_image.src = "images/homepage/dark_mode_learn_more_icon.png"
                }
            }
            else{
                if(learn_more_icon_image instanceof HTMLImageElement){
                    learn_more_icon_image.src = "images/homepage/learn more icon.png"
                }
            }
        }
    }

    var text = document.getElementsByClassName('text');
    for(a = 0; a < text.length; a++){
        if(darkMode == false){
            text[a].className += '  dark_mode_panel_text';
        }
        else{
            var classArr = text[a].className.split(' ');
            text[a].className = classArr[0];
        }
    }

    var h3 = document.getElementsByTagName('h3');
    for(b = 0; b < h3.length; b++){
        if(darkMode == false){
            h3[b].style.color="rgb(164, 90, 233)";
        }
        else{
            h3[b].style.color="#6b2ea8"
        }
    }

    var learnedText = document.getElementsByClassName('learned_text');
    if(learnedText != null){
        for(var c = 0; c < learnedText.length; c++){
            if(darkMode == false){
                learnedText[c].className += ' dark_mode_text';
            }
            else{
                var classArr = learnedText[c].className.split(' ');
                learnedText[c].className = classArr[0];
            }
        }
    }

    var captionsText = document.getElementsByClassName('captions_text');
    if(captionsText != null){
        for(var x = 0; x < captionsText.length; x++){
            if(darkMode == false){
                captionsText[x].className += ' dark_mode_caption';
            }
            else{
                var classArr = captionsText[x].className.split(' ');
                captionsText[x].className = classArr[0];
            }
        }
    }

    darkMode = !darkMode;
    sessionStorage.setItem("darkMode", JSON.stringify(darkMode));
}
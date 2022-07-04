function typeHello(){
	const welcomeLine = "Hello! I'm Larry Chen.\nWelcome to my personal website!";
	const tag = document.getElementById("typing");
	let index = 0;
	function typing() {
		if (index < welcomeLine.length) {
		tag.innerHTML += welcomeLine.charAt(index);
		index++;
		if (welcomeLine.charAt(index) === " ") {
			// The next is whitespace. Quickly pass it!
			setTimeout(typing.bind(this), 10);
		} else if (welcomeLine.charAt(index) === "\n") {
			// The next is to end line
			tag.innerHTML += "<br>";
			index++;
			setTimeout(typing.bind(this), 10);
		} else {
			setTimeout(typing.bind(this), 50);
		}
		}
	}
	typing();
}

/***************************************
 *  this javascript file is used to    *
 *  set the timeline and its objects   *
 *  at the correct position.           *
 ***************************************/

function setTimeLine(){
    let win_width = document.getElementById("Experience").clientWidth;
    let timepoints = document.getElementsByClassName("timepoint"); // get timepoints
    let experience_boxes = document.getElementsByClassName("experience_box"); // get experience boxes

    const timePointInit = 100, horizontalDiff = 50;
    const box_num = experience_boxes.length;
    const box_height = 90;
    const box_width = win_width * 0.25;
    const verticalDiff = 100;
    const point_height = timepoints[0].style.height;

    const win_height = timePointInit * 2 + box_height + verticalDiff * (box_num - 1);
    document.getElementById("Experience").style.height = win_height + "px";
    document.getElementsByClassName("timeline")[0].style.height = 0.9 * win_height + "px";
    // length of timepoints = length of experience_boxes
    for (let i = 0; i < timepoints.length; i++){
        timepoints[i].style.top = (timePointInit + verticalDiff * i) + "px";
        experience_boxes[i].style.width = box_width + "px";
        experience_boxes[i].style.height = box_height + "px";
        experience_boxes[i].style.top = (timePointInit + point_height / 2 - box_height / 2 + verticalDiff * i) + "px";

        if (i % 2 == 0){
            experience_boxes[i].style.left = (win_width / 2 - box_width - horizontalDiff) + "px";
        }else{
            experience_boxes[i].style.right = (win_width / 2 - box_width - horizontalDiff) + "px";
        }
    }
}

function initHonorBox(){
    honor_boxes = document.getElementsByClassName("honor_box");
    box_num = honor_boxes.length;
    document.getElementById("Awards").style.height = 27 * box_num + "vh";
}
// switch from menu to each topic
function setSwitchEffect(){
    let switch_box = document.getElementsByClassName("switch_box"); // 4 kinds of button
    let image = document.querySelectorAll(".switch_box > img"); // 4 button's icon

    let project_content = document.getElementsByClassName("content");
    let project_box = document.getElementsByClassName("project_box");

    for (let i = 0; i < 4; i++) {
        let alt = image[i].alt;
        let imghtml = switch_box[i].innerHTML;

        // the effect when mouse over 4 buttons
        switch_box[i].onmouseover = function () {
            switch_box[i].innerHTML = "<p>" + alt + "</p>";
            switch_box[i].style.opacity = "70%";
            switch_box[i].style.cursor = "pointer";
            switch_box[i].style.border = "hidden";
        };

        // the effect when mouse leave 4 buttons
        switch_box[i].onmouseleave = function () {
            switch_box[i].innerHTML = imghtml;
            switch_box[i].style.opacity = "100%";
            switch_box[i].style.cursor = "default";
            switch_box[i].style.border = "solid";
        };

        // when clicked switch to the corresponding topic
        switch_box[i].onclick = function () {
            switch_box[i].href = "#" + alt;
        };
    }

    for (let i = 0; i < project_box.length; i++) {
        project_box[i].onmouseover = function () {
            project_content[i].style.display = "flex";
            project_box[i].style.height = "60vh";
        };

        project_box[i].onmouseleave = function () {
            project_content[i].style.display = "none";
            project_box[i].style.height = "10%";
        };
    }
}

window.onload = function(){
    typeHello();
    setTimeLine();
    initHonorBox();
    setSwitchEffect();
};

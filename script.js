//show time in header
function showTime() {
    $("#currentDay").text(moment().format("dddd, MM-DD-YYYY h:mm:ss a"));
};

//retrieving all the time slots as jquery objects
timeSlots = $(".time-block");

//check for past-present-future for the time slots
function checkPresent() {

    //set up for comparison between time slot and current time
    index = moment().format("H") -8;

    //comparison for each time slot, add class to change background color
    for (var i=0;i<timeSlots.length;i++) {
        if(i<index) {
            timeSlots.eq(i).addClass("past");
        } else if (i==index) {
            timeSlots.eq(i).addClass("present");
        } else {
            timeSlots.eq(i).addClass("future");
    }
    }
}

//empty array of strings for tasks
savedTasks = new Array(timeSlots.length);

//saving a time slot when the respective button is clicked
$(".saveBtn").on("click", function(event) {
    
    //only the clicked button is affected
    element = $(event.target);
    //button id for reference
    buttonID = element.closest(".row").find("button").attr("id").substring(1,2);
    info = $(".container").find(".description").eq(buttonID).val();

    //if input valid, then save to variable and save to local storage
    if ((info != "") && (info != null)) {
        savedTasks[buttonID] = info;
        localStorage.setItem("tasks",JSON.stringify(savedTasks));
    }
})

function init() {
    
    //so that the timer shows right after refreshing the page
    showTime();
    setInterval(function() {
        showTime();
    },1000);
    //color indexing the time slots
    checkPresent();
    //retrieve data from local storage
    savedTasks = JSON.parse(localStorage.getItem("tasks"));
    //display individual tasks
    for (var i=0;i<timeSlots.length;i++) {
        $(".description").eq(i).val(savedTasks[i]);
    }
}

//for when page is initially loaded
init();
const departments = {
    National_Environmental_Engineering_Research_Institute_NEERI_Nagpur: ["APC","BDPMD","CHWMD","CTMD","CZC","DRC","DZC","EAPID","EBGD","EISD","EMD","ERMD","EVC","HTC","HZC","KZC","MZC","SEAF","SS","TSDD","WRD","WTMD","WWT"],
    
    // Define departments for each institute
};

const names = {

    "APC": ["A. Lalwani","A. D. Bhanarkar","K. V. George","N. Mandal","R. V. Vyawahare","V. Khaparde"],
    "BDPMD": ["A. K. Bansiwal","P. R. Salve","S. Dabe"],
    "CHWMD": ["A. N. Vaidya","G. R. Kale","J. Joseph","M. P. Patil","S. Y. Bodkhe","A. R. Kumar"],
    "CTMD": ["A. Sargaonkar","A. Sharma","H. Bherwani","P. J. Prasad","P. S. Kumar","R. Biniwale","R. Kadaverugu","Y. Pakade"],
    "CZC": ["M. T. Arasu","R. Sivacoumar"],
    "DRC": ["S. Wath"],
    "DZC": ["S. K. Goyal","R. Sharma","P. Saxena","A. Gupta","S. Gulia","C. Sunayana","N. A. Khan","Papiya Mandal"],
    "EAPID": ["B. P. S. Rao","S. Goel"],
    "EBGD": ["A. Kaplay","A. Khardenavis","A. Qureshi","B. K. Sarangi","K. Raghunathan","L. Singh","N. A. Dafale","S. Kosankar","S. D. Sontakke","S. T. Thul"],
    "EISD": ["M. S. Kumar","P. V. Nidhesh","P. K. Naoghare","S. Kagne"],
    "EMD": ["H. Munawar","P. Nagababu","R.J. Krupadam","S. Kumari","S. Lama","S. Rayalu","S. Shastry"],
    "ERMD": ["A. Anshul","A. Gupta","K. Amrit","N. K. Labhasetwar","P. Kokate","R. Wathore"],
    "EVC": ["K. Khairnar"],
    "HTC": ["A.P. Bafane","Atul Katarkar","K. Kannan","S. Saravanadevi"],
    "HZC": ["S. Balaji","S. R. Sanam","M. Kalita","P. R. Meganathan","S. Basha","T.V.B.P.S. RamaKrishna"],
    "KZC": ["A. Middey","D. D. Majumdar","D. Majumdar","K. N. Ranjan","R. Jain","S. Pramanik"],
    "MZC": ["A. Soni","N. Goyal","S. Kamble","S. A. Tondon"],
    "SEAF": ["G. S. Kanade","S. M. Kashyap","S. K. Singh","K. Gandhi"],
    "SS": ["R. Dhodapkar"],
    "TSDD": ["H. V. Singh","M. Karthik","V. W. Lande"],
    "WRD": ["B.R. Yadav","S. Kumar","S.A. Bhat"],
    "WTMD": ["A. Maldhure","G. K. Khadse","G. R. Pophali","L. Deshpande","P. Labhasetwar","P. R. Pujari","R. Ram","S. Dhyani"],
    "WWT": ["A. Bisarya","P. Manekar","P. P. Manekar","R. Vijay","R. B. Mondal","S. Bhuvanesh","S. Pal"],
   
    
    // Define names for each department
};

function loadDepartments() {
    const selectedInstitute = document.getElementById("institute").value;
    const departmentDropdown = document.getElementById("department");

    departmentDropdown.innerHTML = "<option value=''>Select a Department</option>";

    if (selectedInstitute !== "") {
        for (const department of departments[selectedInstitute]) {
            const option = document.createElement("option");
            option.value = department;
            option.text = department;
            departmentDropdown.appendChild(option);
        }
    }
}

function loadNames() {
    const selectedDepartment = document.getElementById("department").value;
    const nameDropdown = document.getElementById("name");

    nameDropdown.innerHTML = "<option value=''>Select a Name</option>";

    if (selectedDepartment !== "") {
        for (const name of names[selectedDepartment]) {
            const option = document.createElement("option");
            option.value = name;
            option.text = name;
            nameDropdown.appendChild(option);
        }
    }
}

function previewForm() {
    // Get form values
    var institute = document.getElementById("institute").value;
    var department = document.getElementById("department").value;
    var title = document.getElementById("title").value;
    var name = document.getElementById("name").value;
    var designation = document.getElementById("designation").value;
    var qualification = document.getElementById("qualification").value;
    var phone = document.getElementsByName('Phone')[0].value;
    var email = document.getElementsByName('Email')[0].value;
    var Expertise_1 = document.getElementById("expertise1").value;
    var Number_of_Projects_1 = document.getElementById("NumberofProjects1").value;
    var Number_of_Publications_1 = document.getElementById("NumberofPublications1").value;
    var Expertise_2 = document.getElementById("expertise2").value;
    var Number_of_Projects_2 = document.getElementById("NumberofProjects2").value;
    var Number_of_Publications_2 = document.getElementById("NumberofPublications2").value;
    var Expertise_3 = document.getElementById("expertise3").value;
    var Number_of_Projects_3 = document.getElementById("NumberofProjects3").value;
    var Number_of_Publications_3 = document.getElementById("NumberofPublications3").value;
    var Expertise_4 = document.getElementById("expertise4").value;
    var Number_of_Projects_4 = document.getElementById("NumberofProjects4").value;
    var Number_of_Publications_4 = document.getElementById("NumberofPublications4").value;
    var Expertise_5 = document.getElementById("expertise5").value;
    var Number_of_Projects_5 = document.getElementById("NumberofProjects5").value;
    var Number_of_Publications_5 = document.getElementById("NumberofPublications5").value;
    var Expertise_6 = document.getElementById("expertise6").value;
    var Number_of_Projects_6 = document.getElementById("NumberofProjects6").value;
    var Number_of_Publications_6 = document.getElementById("NumberofPublications6").value;
    var Expertise_7 = document.getElementById("expertise7").value;
    var Number_of_Projects_7 = document.getElementById("NumberofProjects7").value;
    var Number_of_Publications_7 = document.getElementById("NumberofPublications7").value;
    // Display preview
    var previewDiv = document.getElementById("previewData");
    previewDiv.innerHTML = "<p><strong>Institute:</strong> " + institute + "</p>" +
                           "<p><strong>Department:</strong> " + department + "</p>" +
                           "<p><strong>Title:</strong> " + title + "</p>" +
                           "<p><strong>Name:</strong> " + name + "</p>" +
                           "<p><strong>Designation:</strong> " + designation + "</p>" +
                           "<p><strong>Qualification:</strong> " + qualification + "</p>" +
                           "<p><strong>Phone:</strong> " + phone + "</p>" +
                           "<p><strong>Email:</strong> " + email + "</p>" +
                           "<p><strong>Expertise 1:</strong>" + Expertise_1 + "</p>" + "<p><strong>Number of projects 1:</strong>" + Number_of_Projects_1 + "</p>" + "<p><strong>Number of Publications 1:</strong>" + Number_of_Publications_1 + "</p>" +
                           "<p><strong>Expertise 2:</strong>" + Expertise_2 + "</p>" + "<p><strong>Number of projects 2:</strong>" + Number_of_Projects_2 + "</p>" + "<p><strong>Number of Publications 2:</strong>" + Number_of_Publications_2 + "</p>" +
                           "<p><strong>Expertise 3:</strong>" + Expertise_3 + "</p>" + "<p><strong>Number of projects 3:</strong>" + Number_of_Projects_3 + "</p>" + "<p><strong>Number of Publications 3:</strong>" + Number_of_Publications_3 + "</p>" +
                           "<p><strong>Expertise 4:</strong>" + Expertise_4 + "</p>" + "<p><strong>Number of projects 4:</strong>" + Number_of_Projects_4 + "</p>" + "<p><strong>Number of Publications 4:</strong>" + Number_of_Publications_4 + "</p>" +
                           "<p><strong>Expertise 5:</strong>" + Expertise_5 + "</p>" + "<p><strong>Number of projects 5:</strong>" + Number_of_Projects_5 + "</p>" + "<p><strong>Number of Publications 5:</strong>" + Number_of_Publications_5 + "</p>" +
                           "<p><strong>Expertise 6:</strong>" + Expertise_6 + "</p>" + "<p><strong>Number of projects 6:</strong>" + Number_of_Projects_6 + "</p>" + "<p><strong>Number of Publications 6:</strong>" + Number_of_Publications_6 + "</p>" +
                           "<p><strong>Expertise 7:</strong>" + Expertise_7 + "</p>" + "<p><strong>Number of projects 7:</strong>" + Number_of_Projects_7 + "</p>" + "<p><strong>Number of Publications 7:</strong>" + Number_of_Publications_7 + "</p>" ;

    // Show the preview modal
    $('#previewModal').modal('show');
}
function closePreview() {
    // Hide the preview modal
    var modal = document.getElementById("previewModal");
    modal.style.display = "none";
}



// function submitForm() {
//     // Here, you can perform any additional actions you need before submitting the form.
//     console.log("Form submitted");
//     // You can add code to submit the form data to your server here.

//     // Display an alert (you can replace this with a more user-friendly message)
//     alert("Form submitted successfully");

//     // Close the preview modal
//     $('#previewModal').modal('hide');
    
//     location.reload();
//     // Prevent the form from actually submitting to a server
//     return false;
// }



$(document).ready(function () {
    // Define an array to store selected sub-options
    const selectedSubOptions = [];

    // Store original sub-options HTML for reset
    const originalSubOptionsHTML = $('.sub-options').html();

    // Add click event to options to show sub-options
    $('.option').on('click', function () {
        $(this).find('.sub-options').toggle();
    });

    // Add click event to sub-options to move them to selected options
    $('.sub-option').on('click', function (e) {
    e.preventDefault();
    const selectedSubOption = $(this).clone();
    $(this).remove();
    $('#selectedOptions').append(selectedSubOption);
    // Add the selected sub-option to the array
    selectedSubOptions.push(selectedSubOption.text());
    // Update the expertise input fields
    updateExpertiseFields();
});

    // Add click event to reset button to move selected sub-options back to available options
    $('#resetButton').on('click', function () {
        $('#selectedOptions .sub-option').each(function () {
            const availableSubOption = $(this).clone();
            $(this).remove();
            const parentOption = $(this).closest('.option');
            parentOption.find('.sub-options').append(availableSubOption);
            // Remove the selected sub-option from the array
            const subOptionText = availableSubOption.text();
            const index = selectedSubOptions.indexOf(subOptionText);
            if (index > -1) {
                selectedSubOptions.splice(index, 1);
            }
        });

        // Restore original sub-options HTML
        $('.sub-options').html(originalSubOptionsHTML);

        // Reattach click event to sub-options
        $('.sub-option').on('click', function (e) {
            e.preventDefault();
            const selectedSubOption = $(this).clone();
            $(this).remove();
            $('#selectedOptions').append(selectedSubOption);
            // Add the selected sub-option to the array
            selectedSubOptions.push(selectedSubOption.text());
            // Update the expertise input fields
            updateExpertiseFields();
        });
    });

    // Add click event to submit button
    $('#submitButton').on('click', function (e) {
        e.preventDefault();
        console.log('Selected Sub-Options:');
        console.log(selectedSubOptions);

        // Update the expertise input fields
        updateExpertiseFields();
    });

    // Function to update the expertise input fields
    function updateExpertiseFields() {
    // Get the first 7 selected sub-options or fewer if there are not enough
    const expertiseFields = selectedSubOptions.slice(0, 7);

    // Update the input fields
    for (let i = 0; i < expertiseFields.length; i++) {
        $(`#expertise${i + 1}`).val(expertiseFields[i]);
    }
}

});


const scriptURL = 'https://script.google.com/macros/s/AKfycbyAmw1mMaDkzQyFLvL-SH-jxjOmHyHuQvy04vEtdnAWVlXPuKSsLyhkZUjMGlhC5s-ITQ/exec';
const form = document.forms['google-sheet'];

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(data => {
            // Handle the response if needed (e.g., display a thank you message)
            console.log(data);
            // alert("Thanks for your response....!!");

            console.log("Form submitted");
    // You can add code to submit the form data to your server here.

    // Display an alert (you can replace this with a more user-friendly message)
            alert("Your Response Recorded successfully....!!");

    // Close the preview modal
            $('#previewModal').modal('hide');
    
            location.reload();
    // Prevent the form from actually submitting to a server
            return false;
            // Redirect to the next page (replace 'next-page.html' with your actual next page URL)
            // window.location.href = 'expertise.html';
        })
        .catch(error => console.error('Error!', error.message));
});

{}
//     console.log("Form submitted");
//     // You can add code to submit the form data to your server here.

//     // Display an alert (you can replace this with a more user-friendly message)
//     alert("Form submitted successfully");

//     // Close the preview modal
//     $('#previewModal').modal('hide');
    
//     location.reload();
//     // Prevent the form from actually submitting to a server
//     return false;
// }


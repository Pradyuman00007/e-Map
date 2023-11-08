const filePath = 'db.json';

function fetchAndPopulateSelects() {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const jsonData = data;
      const instituteSelect = document.getElementById('institute');
      const departmentSelect = document.getElementById('department');
      const employeeSelect = document.getElementById('name');

      for (const institute in jsonData) {
        const option = document.createElement('option');
        option.value = institute;
        option.text = institute.replace(/_/g, ' ');
        instituteSelect.appendChild(option);
      }

       function populateDepartments() {
        departmentSelect.innerHTML = "";
        employeeSelect.innerHTML = "";

        // Create a placeholder for the department select
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        const selectedInstitute = instituteSelect.value;
        placeholderOption.text = `Select your ${selectedInstitute} Department...`;
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        departmentSelect.appendChild(placeholderOption);

        const departments = jsonData[selectedInstitute].Departments;
        for (const department in departments) {
          const option = document.createElement("option");
          option.value = department;
          option.text = department;
          departmentSelect.appendChild(option);
        }
      }

      function populateEmployees() {
        employeeSelect.innerHTML = "";

        // Create a placeholder for the employee select
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        const selectedInstitute = instituteSelect.value;
        const selectedDepartment = departmentSelect.value;
        placeholderOption.text = `Select employee in ${selectedDepartment}...`;
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        employeeSelect.appendChild(placeholderOption);

        const employees =
          jsonData[selectedInstitute].Departments[selectedDepartment].Employees;
        employees.forEach((employee) => {
          const option = document.createElement("option");
          option.value = employee;
          option.text = employee;
          employeeSelect.appendChild(option);
        });
      }

      instituteSelect.addEventListener('change', populateDepartments);
      departmentSelect.addEventListener('change', populateEmployees);
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

fetchAndPopulateSelects();


function validateForm() {
  let isValid = true;

  // Reset previous error messages
  document.querySelectorAll(".error-message").forEach((element) => {
    element.innerText = "";
  });

  // Validate each field
  const fieldsToValidate = [
    "institute",
    "department",
    "title",
    "name",
    "designation",
    "qualification",
    "Email",
  ];

  fieldsToValidate.forEach((field) => {
    const value = document.getElementById(field).value;
    if (!value) {
      const errorMessageElement = document.getElementById(`${field}Error`);
      errorMessageElement.innerText = "This field is required.";
      isValid = false;
    }

    if (field === "Email" && !/^[^\s@]+@neeri\.res\.in$/.test(value)) {
      const errorMessageElement = document.getElementById(`${field}Error`);
      errorMessageElement.innerText =
        "Please enter a valid email ending with @neeri.res.in";
      isValid = false;
    } else if (field === "Email" && /^[^\s@]+@neeri\.res\.in$/.test(value)) {
      const errorMessageElement = document.getElementById(`${field}Error`);
      errorMessageElement.innerText = ""; // Clear the error message for the email field
    }
  });

  if (isValid) {
    // If all fields are filled and email is in the correct format, show the other portion of the form
    document.getElementById("additionalInfo").style.display = "block";
    document.getElementById("confirmButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
  }

  return isValid;
}

function resetForm() {
  const fieldsToReset = ['institute', 'department', 'title', 'name', 'designation', 'qualification', 'Email'];
  fieldsToReset.forEach(fieldName => {
    document.getElementById(fieldName).value = '';
  })
  // Reset other form fields and error messages if needed
}

function expertisevalidate() {
  const expertiseFields = Array.from({ length: 7 }, (_, i) => document.getElementById(`expertise${i + 1}`));
  let filledFields = 0;

  expertiseFields.forEach(field => {
    if (field && field.value.trim() !== '') {
      filledFields++;
      field.style.color = ''; // Reset text color for filled fields
    } else if (field) {
      field.style.color = 'red'; // Change the text color of empty fields to red
    }
  });

  if (filledFields < 5) {
    alert('Please select at least 5 expertise fields.');
    return false;
  } else {
    previewForm();
  }
}



// Dual list boxes
const selectedSubfields = new Set();

async function fetchExpertiseData() {
  try {
    const response = await fetch('expertise.json');
    const data = await response.json();
    return data.expertise;
  } catch (error) {
    console.error('Error fetching expertise data:', error);
    return [];
  }
}

async function populateAvailableExpertise() {
  const availableExpertise = $('#availableExpertise');
  const expertiseData = await fetchExpertiseData();

  for (let i = 0; i < expertiseData.length; i++) {
    const expertise = expertiseData[i];
    const optgroup = $('<optgroup>').attr('label', expertise.name);

    expertise.subOptions.forEach(subOption => {
      const option = $('<option>').val(subOption).text(subOption);
      optgroup.append(option);
    });

    availableExpertise.append(optgroup);
  }
}

function addSelectedExpertise() {
  $('#availableExpertise').on('change', function () {
    if (selectedSubfields.size >= 10) {
      alert('You can only select up to 10 expertise fields.');
      return;
    }

    const selectedOption = $(this).find(':selected');
    const subfield = selectedOption.val();

    if (selectedSubfields.has(subfield)) {
      alert(`Subfield '${subfield}' is already selected.`);
      return;
    }

    const expertise = selectedOption.parent('optgroup').attr('label');
    selectedSubfields.add(subfield);
    const expertiseBox = $('<div>').addClass('alert alert-info mb-2').text(`${expertise} - ${subfield}`);
    $('#selectedExpertiseBox').append(expertiseBox);

    console.log('Selected Expertise:', expertise, 'Subfield:', subfield);
  });
}
function expertiseSelectedValidate() {
  const selectedExpertiseCount = selectedSubfields.size;

  if (selectedExpertiseCount < 5) {
    document.getElementById('selectedExpertiseBox').style.color = 'red'; // Set red text for the expertise box
    alert('Please select at least 5 expertise fields.');
    return false;
  } else {
    previewAllFields();
    
    
  }
}

function resetSelection() {
  selectedSubfields.clear(); // Clear the selected subfields set
  $('#selectedExpertiseBox').empty(); // Clear the selected expertise box
}

function updateTable() {
  const selectedExpertiseBox = document.getElementById('selectedExpertiseBox');
  const tableBody = document.querySelector('#expertiseTable tbody');
  tableBody.innerHTML = ''; // Clear the table before populating

  let expertiseCounter = 1;

  selectedExpertiseBox.childNodes.forEach(selected => {
    const expertiseInfo = selected.textContent.split(' -');
    const expertiseName = expertiseInfo[0];
    const subfield = expertiseInfo[1];

    const newRow = document.createElement('tr');

    const expertiseNameCell = document.createElement('td');
    expertiseNameCell.textContent = expertiseName;
    expertiseNameCell.setAttribute('name', expertiseName);
    newRow.appendChild(expertiseNameCell);

    const subfieldCell = document.createElement('td');
    subfieldCell.textContent = subfield;
    subfieldCell.setAttribute('name', subfield);
    newRow.appendChild(subfieldCell);

    const inputNames = ['Projects', 'Publications', 'Patents', 'Awards'];
    inputNames.forEach(inputName => {
      const input = document.createElement('input');
      input.setAttribute('type', 'number');
      input.setAttribute('name', `${inputName}${expertiseCounter}`);
      input.setAttribute('placeholder', `${inputName} for ${expertiseName}`);
      input.classList.add('form-control');
      input.addEventListener('input', function() {
        if (this.value < 0 || this.value.length > 3) { // Check if the value is less than 0 or if the length is more than 3 digits
          this.value = ''; // Clear the field if it's negative
        }
      });

      const cell = document.createElement('td');
      cell.appendChild(input);
      newRow.appendChild(cell);
    });

    expertiseCounter++;
    tableBody.appendChild(newRow);
  });
}


// Event listener for the "Confirm Expertise" button
$('#confirmExpertiseButton').on('click', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  updateTable();
});

populateAvailableExpertise(); // Call your function to populate available expertise
addSelectedExpertise(); // Call your function to add selected expertise

// Function to get selected expertise and subfields for the preview
function getSelectedExpertiseRows() {
  const tableBody = document.querySelector('#expertiseTable tbody');
  let rowsHTML = '';

  const rows = tableBody.querySelectorAll('tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');

    // Get expertiseName and subfield from the 'data-' attributes
    const expertiseName = cells[0].querySelector('input').value;;
    const subfield = cells[1].querySelector('input').value;;

    // Retrieve values of projects, publications, patents, and awards from input fields
    const projects = cells[2].querySelector('input').value;
    const publications = cells[3].querySelector('input').value;
    const patents = cells[4].querySelector('input').value;
    const awards = cells[5].querySelector('input').value;

    // Construct HTML rows with the collected data
    rowsHTML += `
      <tr>
        <td>${expertiseName}</td>
        <td>${subfield}</td>
        <td>${projects}</td>
        <td>${publications}</td>
        <td>${patents}</td>
        <td>${awards}</td>
      </tr>
    `;
  });

  // The 'rowsHTML' variable contains the constructed HTML rows
  console.log(rowsHTML); // This might be used for further processing or rendering
}


// Rest of your code remains unchanged...

function previewAllFields() {
  // Get values from form fields
  const institute = $('#institute').val();
  const department = $('#department').val();
  const title = $('#title').val();
  const name = $('#name').val();
  const designation = $('#designation').val();
  const qualification = $('#qualification').val();
  // const specialization = $('#specialization').val();
  const email = $('#Email').val();

  // Create a preview HTML
  const previewHTML = `
    <p><strong>Institute:</strong> ${institute}</p>
    <p><strong>Department:</strong> ${department}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Designation:</strong> ${designation}</p>
    <p><strong>Qualification:</strong> ${qualification}</p>
    
    <p><strong>Email:</strong> ${email}</p>

    <h4>Selected Expertise:</h4>
    <table class="table">
      <thead>
        <tr>
          <th>Expertise Name</th>
          <th>Subfield</th>
          <th>Number of Projects</th>
          <th>Number of Publications</th>
          <th>Number of Patents</th>
          <th>Number of Awards</th>
        </tr>
      </thead>
      <tbody>
        ${getSelectedExpertiseRows()}
      </tbody>
    </table>
  `;

  // Display the preview in a modal
  const previewData = $('#previewData');
  previewData.html(previewHTML);
  $('#previewModal').modal('show');
}

// Function to get selected expertise and subfields for the preview
function getSelectedExpertiseRows() {
  const tableRows = document.querySelectorAll('#expertiseTable tbody tr');
  let rowsHTML = '';

  tableRows.forEach(row => {
    const cells = row.querySelectorAll('td');

    const expertiseName = cells[0].getAttribute('name');
    const subfield = cells[1].getAttribute('name');
    const projects = cells[2].querySelector('input').value;
    const publications = cells[3].querySelector('input').value;
    const patents = cells[4].querySelector('input').value;
    const awards = cells[5].querySelector('input').value;

    rowsHTML += `
      <tr>
        <td>${expertiseName}</td>
        <td>${subfield}</td>
        <td>${projects}</td>
        <td>${publications}</td>
        <td>${patents}</td>
        <td>${awards}</td>
      </tr>
    `;
  });

  return rowsHTML;
}



const scriptURL = 'https://script.google.com/macros/s/AKfycbyAmw1mMaDkzQyFLvL-SH-jxjOmHyHuQvy04vEtdnAWVlXPuKSsLyhkZUjMGlhC5s-ITQ/exec';
const form = document.forms['google-sheet'];

const hasSubmitted = localStorage.getItem('formSubmitted');

// if (hasSubmitted) {
//     // Redirect to the end page if the form has already been submitted
//     window.location.href = 'endpage.html';
// } else {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const submitButton = document.querySelector('input[type="submit"]');
        submitButton.disabled = true
        // Collect form data before sending
        const formData = new FormData(form);

        // Get the selected expertise and subfield directly from the form fields
        const expertiseRows = document.querySelectorAll('#expertiseTable tbody tr');
        
        expertiseRows.forEach((row, index) => {
            const expertiseName = row.querySelector(`input[name='Projects${index + 1}']`).getAttribute('placeholder').replace('Projects for ', '');
            const subfield = row.querySelector('td:nth-child(2)').getAttribute('name');
            const projects = row.querySelector(`input[name='Projects${index + 1}']`).value;
            const publications = row.querySelector(`input[name='Publications${index + 1}']`).value;
            const patents = row.querySelector(`input[name='Patents${index + 1}']`).value;
            const awards = row.querySelector(`input[name='Awards${index + 1}']`).value;

            formData.append(`Expertise${index + 1}`, expertiseName);
            formData.append(`Subfield${index + 1}`, subfield);
            formData.append(`Project${index + 1}`, projects);
            formData.append(`Publications${index + 1}`, publications);
            formData.append(`Patents${index + 1}`, patents);
            formData.append(`Awards${index + 1}`, awards);
        });

        // // Log the form data to the console
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        // Send the form data via fetch
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('formSubmitted', 'true');
                window.location.href = 'endpage.html';
                alert('Your response has been recorded successfully!');
            })
            .catch(error => console.error('Error!', error.message));
    });
// }


// ----------------------------------------------------------------------

console.log("New Layout")
// $("#institute [value='National_Environmental_Engineering_Research_Institute_NEERI_Nagpur']").change(); 
$("#institute")
$("#department")
$("#title")
$("#name")
$("#designation")
$("#qualification")
$("#Email")

let currentPanel = 1; // Start with the first panel

function nextPanel(panelNumber) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.style.display = 'none'); // Hide all panels
    document.getElementById('panel' + panelNumber).style.display = 'block'; // Show the selected panel
    currentPanel = panelNumber; // Update the current panel number
}

function previousPanel() {
    if (currentPanel > 1) { // Ensure it's not the first panel
        nextPanel(currentPanel - 1); // Show the previous panel
    }
}


function generateQuotation() {
    // Retrieve values from input fields
    const clientName = document.getElementById('clientName').value;
    const companyName = document.getElementById('companyName').value;
    const businessDetails = document.getElementById('businessDetails').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    const price = document.getElementById('price').value;
    const quotationNumber = document.getElementById('quotationNumber').value;
    const quoteExpiryDate = document.getElementById('quoteExpiryDate').value;
    const quotationDate = document.getElementById('quotationDate').value;
    const projectSchedule = document.getElementById('projectSchedule').value;
    const termsConditions = document.getElementById('termsConditions').value;
    const termsPayment = document.getElementById('termsPayment').value;
    const customerSignature = document.getElementById('customerSignature').value;
    const revisions = document.getElementById('revisions').value;

    // Validate required fields
    if (!clientName || !companyName || !emailAddress) {
        alert('Please fill in all required fields.');
        return; // Exit the function if validation fails
    }

    // Calculate tax and total (example calculation)
    const tax = parseFloat(price) * 0.14; // Ensure price is treated as a number
    const total = parseFloat(price) + tax;

    // Populate the output fields
    document.getElementById('outputClientName').innerText = clientName;
    document.getElementById('outputCompanyName').innerText = companyName;
    document.getElementById('outputBusinessDetails').innerText = businessDetails;
    document.getElementById('outputEmailAddress').innerText = emailAddress;
    document.getElementById('outputServiceDescription').innerText = serviceDescription;
    document.getElementById('outputPrice').innerText = price;
    document.getElementById('outputTax').innerText = tax.toFixed(2);
    document.getElementById('outputTotal').innerText = total.toFixed(2);
    document.getElementById('outputTermsConditions').innerText = termsConditions;
    document.getElementById('outputTermsPayment').innerText = termsPayment;
    document.getElementById('outputProjectSchedule').innerText = projectSchedule;
    document.getElementById('outputRevisions').innerText = revisions;
    document.getElementById('outputCustomerSignature').innerText = customerSignature;
    document.getElementById('outputQuotationNumber').innerText = quotationNumber;
    document.getElementById('outputQuotationDate').innerText = quotationDate;

    // Show the quotation output
    const quotationOutput = document.getElementById('quotationOutput');
    quotationOutput.style.display = 'block'; // Ensure this is displayed
    quotationOutput.scrollIntoView(); // Scroll to view the output if needed

    // Hide the panels if necessary
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.style.display = 'none');
}

function downloadPDF() {
    const quoteContent = document.getElementById('quotationOutput');

    // Use html2canvas to convert the content to an image
    html2canvas(quoteContent).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a3'
        });

        // Set image width and height
        const imgWidth = 310; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Save the PDF
        pdf.save("quotation.pdf");
    }).catch(function(error) {
        console.error("Error generating PDF: ", error);
        alert("Failed to generate PDF. Check console for errors.");
    });
}

function printQuotation() {
    const quoteContent = document.getElementById('quotationOutput').innerHTML;
    const originalContent = document.body.innerHTML;

    // Set the body content to only the quotation
    document.body.innerHTML = `<div>${quoteContent}</div>`;
    window.print();

    // Restore original body content after printing
    document.body.innerHTML = originalContent;
    // Optionally reload the page to reset any dynamic content
    location.reload();  
}

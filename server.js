const PORT = process.env.PORT || 3000;


// Function to Generate C.O.A. PDF (Upgraded Design)
async function generatePDF(customerName, productName, editionNumber, editionTotal, imageUrl, purchaseDate) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
            
            body { 
                font-family: 'Poppins', sans-serif; 
                text-align: center; 
                padding: 20px; 
                background: #f5f5f5; 
            }
            .coa-container { 
                border: 4px solid #000; 
                padding: 40px; 
                width: 700px; 
                margin: auto; 
                background: white;
                box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
            }
            .coa-header { 
                font-size: 30px; 
                font-weight: bold; 
                text-transform: uppercase;
                margin-bottom: 20px;
            }
            .coa-details { 
                font-size: 18px; 
                margin-top: 20px;
            }
            .coa-image { 
                width: 80%; 
                margin-top: 20px; 
                border: 2px solid #ddd; 
                padding: 5px; 
                background: #fff;
            }
            .coa-footer { 
                font-size: 12px; 
                margin-top: 30px; 
                color: gray;
                border-top: 2px solid #000;
                padding-top: 15px;
            }
            .signature {
                margin-top: 30px;
                font-family: cursive;
                font-size: 24px;
                font-weight: bold;
            }
            .logo {
                width: 150px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="coa-container">
            <img class="logo" src="https://yourwebsite.com/rugprime-logo.png" alt="Rug Prime Logo">
            <div class="coa-header">Certificate of Authenticity</div>
            <div class="coa-details">
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Product:</strong> ${productName}</p>
                <p><strong>Edition:</strong> ${editionNumber} of ${editionTotal}</p>
                <p><strong>Date of Purchase:</strong> ${purchaseDate}</p>
            </div>
            <img class="coa-image" src="${imageUrl}" alt="Product Image">
            <div class="signature">Rug Prime Official</div>
            <div class="coa-footer">
                <p>This certificate guarantees the authenticity of your limited-edition Rug Prime piece.</p>
                <p>Each edition is uniquely numbered and verified. Unauthorized duplication is prohibited.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();
    return pdfBuffer;
}

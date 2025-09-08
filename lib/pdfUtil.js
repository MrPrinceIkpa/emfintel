// pages/api/generate-pdf.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function ObjtoPDF(data) {
  
  const {address, dwellingType, mainGoal, email} = data;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Draw title
    page.drawText('EMF Intel Report', {
      x: 50,
      y: height - 50,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Draw report content
    const content = [
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      `Address: ${address}`,
      `Dwelling Type: ${dwellingType}`,
      `Main Goal: ${mainGoal}`,
      `Email: ${email}`,
      '',
    ];

    content.forEach((line, index) => {
      page.drawText(line, {
        x: 50,
        y: height - 100 - (index * 20),
        size: 12,
        font: index === 8 ? boldFont : font,
        color: rgb(0, 0, 0),
      });
    });

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Convert to base64 for storage/email
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
   // pdfBase64.split(",")[1]
    //const dataUrl = `data:application/pdf;base64,${pdfBase64}`;

    console.log(typeof pdfBase64);
    return(pdfBase64);
}
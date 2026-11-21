/**
 * Google Apps Script for Manoj & Lakshmi Wedding Time Capsule 2046
 * Sends the generated 2-Page A4 Keepsake PDF attachment straight to rgowthamkumar7@gmail.com!
 *
 * HOW TO SET UP (Takes ~1 minute):
 * 1. Open https://script.google.com with your rgowthamkumar7@gmail.com account
 * 2. Click "New project"
 * 3. Delete everything in the code editor, paste this entire file, and click "Save" (Ctrl+S)
 * 4. Click "Deploy" (top right) -> "New deployment"
 * 5. Click the gear icon next to "Select type" -> Choose "Web app"
 * 6. Set Description: "Wedding Capsule Emailer"
 * 7. Set "Execute as": "Me (rgowthamkumar7@gmail.com)"
 * 8. Set "Who has access": "Anyone"  <-- CRITICAL so the website can post to it!
 * 9. Click "Deploy" -> "Authorize access" -> Pick your Gmail -> "Advanced" -> "Go to (unsafe)" -> "Allow"
 * 10. Copy the Web app URL (starts with https://script.google.com/macros/s/...)
 * 11. Send me that URL (or paste it into CONFIG.googleScriptUrl in index.html)!
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var targetEmail = data.targetEmail || "rgowthamkumar7@gmail.com";
    var subject = data.subject || "🎉 Manoj & Lakshmi Wedding Time Capsule 2046 Sealed!";

    var emailBody = "Dear Gowtham,\n\n" +
      "🎉 Manoj & Lakshmi have completed and sealed their 20-Year Wedding Time Capsule!\n\n" +
      "====================================================\n" +
      "CAPSULE DETAILS\n" +
      "====================================================\n" +
      "Capsule ID: " + data.capsuleId + "\n" +
      "Submitted At: " + data.submittedAt + "\n" +
      "Emails Registered to receive this in 2046: " + data.recipients + "\n\n" +
      "====================================================\n" +
      "🔒 COUPLE ENCRYPTED VAULT (100% PRIVATE)\n" +
      "====================================================\n" +
      "Manoj & Lakshmi went completely unfiltered! Their responses are protected\n" +
      "and locked with a secret couple password that only the two of them know.\n\n" +
      "📎 ATTACHMENT:\n" +
      "The official 2-Page A4 Keepsake Slambook PDF is attached to this email,\n" +
      "PASSWORD-PROTECTED & ENCRYPTED with their couple password! Nobody else can open it until 2046.\n\n" +
      "Save this email securely in your inbox so you can deliver it on 20 November 2046! ❤️";

    var emailOptions = {
      to: targetEmail,
      subject: subject,
      body: emailBody
    };

    // If PDF base64 is present, decode it and attach as a real PDF file
    if (data.pdfBase64) {
      var decodedPdf = Utilities.base64Decode(data.pdfBase64);
      var pdfBlob = Utilities.newBlob(
        decodedPdf,
        "application/pdf",
        data.filename || ("Manoj-Lakshmi-2046-TimeCapsule-" + data.capsuleId + ".pdf")
      );
      emailOptions.attachments = [pdfBlob];
    }

    MailApp.sendEmail(emailOptions);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Email sent successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


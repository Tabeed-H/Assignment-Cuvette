/**
 * Generates a modern email template for job postings with color accents.
 * @param {Object} job - The job object containing job details.
 * @returns {String} - The email content in HTML format.
 */
function generateJobEmailTemplate(job) {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        
        <p style="font-size: 16px; color: #555;">Hello,</p>
  
        <p style="font-size: 18px; color: #333;">We are excited to inform you that <strong style="color: #1E90FF;">${
          job.postedBy.companyName
        }</strong> is looking for candidates for the following role:</p>
        
        <h2 style="color: #2C3E50; border-bottom: 2px solid #1E90FF; padding-bottom: 5px;">${
          job.jobTitle
        }</h2>
        
        <p style="color: #555;"><strong>Description:</strong> ${
          job.jobDescription
        }</p>
        <p style="color: #555;"><strong>Experience Level:</strong> ${
          job.experienceLevel
        }</p>
        <p style="color: #555;"><strong>Submission Deadline:</strong> ${new Date(
          job.endDate
        ).toDateString()}</p>
  
        <div style="margin-top: 20px; padding: 10px; border-radius: 8px; background-color: #ffffff; border: 1px solid #ddd;">
          <p>If you are interested, please feel free to get in touch with us for more details or to submit your application.</p>
        </div>
        
        <br>
  
        <p style="font-size: 16px; color: #333;">Best regards,</p>
        <p style="font-size: 18px; font-weight: bold; color: #2C3E50;">${
          job.postedBy.name
        }</p>
        <p style="color: #555;">HR at ${job.postedBy.companyName}</p>
        <p>Email: <a href="mailto:${
          job.postedBy.email
        }" style="color: #1E90FF; text-decoration: none;">${
    job.postedBy.email
  }</a></p>
      </div>
    `;
}

module.exports = { generateJobEmailTemplate };

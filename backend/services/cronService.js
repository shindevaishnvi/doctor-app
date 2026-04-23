const cron = require('node-cron');
const appointmentModel = require('../models/Appointment');
const transporter = require('../config/nodemailer');

const startCronJobs = () => {
    console.log("Cron jobs started...");

    // Run every day at 8:00 AM (0 8 * * *)
    cron.schedule('0 8 * * *', async () => {
        try {
            console.log("Running scheduled email reminder check...");
            
            const tomorrowDate = new Date();
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);
            
            // Reconstruct the slotDate format: DD_M_YYYY or DD_MM_YYYY. 
            // In typical JS, getDate() is 1-31, getMonth is 0-11
            const tomorrowStr = tomorrowDate.getDate() + '_' + (tomorrowDate.getMonth() + 1) + '_' + tomorrowDate.getFullYear();

            const upcomingAppointments = await appointmentModel.find({ slotDate: tomorrowStr, cancelled: false, isCompleted: false });

            console.log(`Found ${upcomingAppointments.length} appointments for tomorrow (${tomorrowStr}). Sending reminders...`);

            for (const appt of upcomingAppointments) {
                if (appt.userData && appt.userData.email) {
                    
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: appt.userData.email,
                        subject: `Reminder: Your Doctor Appointment is Tomorrow!`,
                        html: `
                            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                                    <h2 style="color: #2563eb; margin-top: 0;">Appointment Reminder</h2>
                                    <p>Hi <b>${appt.userData.name || 'Patient'}</b>,</p>
                                    <p>This is an automated friendly reminder for your upcoming consultation with <b>Dr. ${appt.docData.name}</b> tomorrow.</p>
                                    
                                    <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
                                        <ul style="list-style-type: none; padding: 0; margin: 0;">
                                            <li style="margin-bottom: 10px;">📅 <b>Date:</b> ${appt.slotDate.replace(/_/g, '/')}</li>
                                            <li>⏰ <b>Time:</b> ${appt.slotTime}</li>
                                        </ul>
                                    </div>
                                    
                                    <p>Please login to your dashboard if you need to reschedule or cancel.</p>
                                    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                                    <p style="margin-bottom: 0; font-size: 0.9em; color: #6b7280;">Best Regards,<br/><b style="color: #374151;">QuickCare Support Team</b></p>
                                </div>
                            </div>
                        `
                    };

                    await transporter.sendMail(mailOptions);
                    console.log(`Sent reminder email to: ${appt.userData.email}`);
                }
            }

        } catch (error) {
            console.error("Cron Error sending email reminders: ", error);
        }
    });

    // We can add another job that runs every minute to test it if needed: 
    // cron.schedule('* * * * *', () => console.log('Cron is alive...'));
};

module.exports = startCronJobs;

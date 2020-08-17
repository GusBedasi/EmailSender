import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export default class EmailController {
    async sendEmail(request: Request, response: Response){
        try {
            
            //Pega os dados de acesso do email
            const { user, pass } = request.body

            //Cria a configuração de envio do e-mail
            let transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: user,
                    pass: pass
                },
            });

            //Corpo do e-mail
            let info = await transport.sendMail({
                from: '"Fulao" <fulano@test.com>',
                to: "ciclano@test.com",
                subject: "Para meu amigo ciclano ✔",
                text: "Como vai Ciclano!!"
            });
        
            return response.status(200).send("Email enviado com sucesso!");

        } catch (error) {
            console.error(error);        
        }
    }
}
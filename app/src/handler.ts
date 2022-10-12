import { IncomingMessage, ServerResponse } from "http";
import { User } from "./models/user.model";
import hash from 'object-hash';

export async function onRequestListener(req: IncomingMessage, res: ServerResponse) {
    if (req.url === "/" && req.method === "POST") {
        let body = '';
        req
            .on('data', chunk => {
                body += chunk;
            })
            .on('end', async () => {
                console.log(body);
                const jsonUser = JSON.parse(body) as Object;
                const user = new User({
                    _id: hash(jsonUser),
                    ...jsonUser,
                });
                await user.save();
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(`<h1>${user.id}</h1>`);
                res.end();
                req.destroy()
            });
    }

}
import { createServer } from "./server/setup/setupServer";
import { yellowBright, gray } from "chalk";

createServer().then(({ app }) => {
    app.listen(3010, () => {
        console.log(
            gray(`\n   Express app listening on `),
            yellowBright(`http://localhost:${3010} \n`)
        );
    })
})

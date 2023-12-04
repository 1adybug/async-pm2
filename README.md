# async-pm2

Just add "Async" after the function name

```typescript
import { connectAsync, listAsync, startAsync } from "async-pm2"

async function main() {
    await connectAsync()
    const result = await startAsync("./app.js")
    console.log(result)
    const list = await listAsync()
    console.log(list)
}

main()
```

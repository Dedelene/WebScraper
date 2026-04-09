# Website Technologies Scraper

An automatic tool design to extract technologies from various domains.

# How to use:

Run these commands in the terminal to install dependencies and start the scraper: 
```
npm install
node main.js
```

# Description

Made it in nodejs using parquetjs-lite for reading the parquet file, wappalyzer for fetching and extracting technologies from sites and fs/promise for writing the csv file.
It may take a while going one by one but the output is worth it: 340 techologies found.
I tried using (4)batches and Promise.allSettled with a timeout of 25/30 sec in a Promice.race but the output reduced so I returned to the first method.
Some sites take a very long time for loading (tried myself on chrome) so I had to give up on them.
Also I implemented the fallback case when the domain accepts the http:// protocol and not the safe one, in a try catch block.

The first issue I have been through is that I started in python as a challenge using requests and then Playwright but the number of tech found was like 100 very low so I returned to nodejs.
Another issue was when the wappalyzer version I used didn't work because it requires a paid API so I had to look for a free one that is no more maintained.

For a solution for a millions of domains I would use the paid version of wappalyzer which is maintained and a function that reduces the time for scraping maybe with Promise.allSettled again. 
For the ones that load very slow I would implement another promised that will take this problem and resolve in parallel and put a longer timeout for it.

To extend the wappalyzer tool to find more techologies I'd recommand to add an API to extract new tech that appear on the market.

# Conclusion

Overall, this project was a good exercise in problem-solving and demonstrated the real-world challenges of automated web applications.

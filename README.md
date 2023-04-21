# Music Search Utility

## Motivation
We decided to build an application, using one of the top popular Javascript frameworks out there. So, we decided we build something cool and (hopefully) useful. We brainstormed for a while and eventually decided to start building a music player, browser based using the *HTML5 Audio API*. But, as we moved forward, our time constraint caused us to eventually pivot quickly.

Since one of us was leading the way, the decision became quick to move to build an actual search engine like. But be aware this is *not really a* search engine per say. It is rather a utility which hooks up to a few third-party APIs and requests information based on keywords typed by the user.

Eventually, we move forward quickly once settled with a new plan in place. And now, you the reader can see what awesome and remarkable web app we’ve built. **Shhh!** There’s still some minor functionality missing, we blame this on “time constraints.”

*P.s. our code is really messy and scary!*

## The Application
This utility is a simple website, with a dark theme, we decided to go with dark because it looks good. It has a search input, a separate component which greets the user depending on time of the day and the given name, and a special feature which is the history feature.

P.s.s. Some hints:

* Press **SHIFT + ?** - this will open up a dialog with shortcut-keys
* In an active dialog, press **ESC** to close.

> **Note**: Runs only with older version of node. Supported: `Node v14.3.0`. 

## Installation
1. Make sure you have [node.js](https://nodejs.org/en/) and 
[npm](https://www.npmjs.com/get-npm) installed on your machine.
2. `$ git clone https://github.com/defunxyz/music-search.git`
3. `$ cd music-search`
4. `$ npm install`
5. `$ npm start`
6. Now run on [localhost:3000](http://localhost:3000)

## Technical Decisions
React was chosen as the core framework of this project due to the simplicity, clean, and single-page nature of this web application. One of React’s core strengths lies in building web applications with pages that act independently from each other, for example, a component displaying time can do this in its own state without being affected by changes in another component on the same page **[1]**. 

Now we will dive into some comparisons and reasons behind decisions we made, follow along. 
The first reason we decided React over Angular, is because we liked how easy it is to quickly get started and code, there is a huge community and React is also a lot more popular compared to Angular **[2]**. On a technical note **[3]**: “one of the powerful sides of React is that it provides a good abstraction which means that it does not expose any complex internals to the user.”  In addition, since none of us had good previous experience with TypeScript we felt it would require extra time to pick up and fully learn. Furthermore, Angular has a steep learning curve and is not well-documented **[4]**.

When it came to Vue.js, we knew that both Vue.js and Reactjs are two of the biggest and most popular front-end frameworks out there. However, they both as always come with differences. Virtual DOM is something both frameworks implement, which allows you to refresh parts of the page, or single components without reloading the whole page **[5]**. Component-based development which allows code reuse and improves productivity, and speed is provided by both **[5]**. Syntax differs a bit. But, Reactjs at the time of decision had and still probably has more widespread usage.

The last reason we decided to go with React is because of light previous experience with this framework, we decided to explore it deeper and build something cool. 

For the CSS framework, we skipped the public options and decided to handcraft our own CSS-like framework. The decision to proceed with this was because we (1) wanted more control over our user interface and (2) wanted to do something better than what exists out there. 

For third-party web APIs, we decided to pick a few that suited our web application purpose. Since we decided in a very short time to pivot and build a utility for searching artists, albums, songs, and tracks, we knew what APIs we needed to choose. 

### Listing APIs used in this stack: 

* Spotify Web API (Core driver)
* Napster Web API
* Wikipedia Web API (for additional details about artists e.g. bio summary)
* APISEEDS Lyrics API

## Addendum
Due to very tough time constraints, there might be some strange behaviour in this utility. However, eventually, in the near feature, unless occupied by some other more important project, we might find time and come back and finish this *perfectly*. 

## Sources
```
[1] https://www.simform.com/why-use-react/ 
[2] https://gist.github.com/tkrotoff/b1caa4c3a185629299ec234d2314e190 
[3] https://stories.jotform.com/7-reasons-why-you-should-use-react-ad420c634247 
[4] https://technostacks.com/blog/react-vs-angular/ 
[5] https://www.monterail.com/blog/vue-vs-react-2020
```
## License
This project is licensed under the [BSD-2-Clause license](LICENSE).

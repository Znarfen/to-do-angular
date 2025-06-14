# ToDoAngular

- Instructions for installing and starting the project
- Description of implemented features
- Technical documentation (architecture, used technologies, API documentation)
- Reflections on design decisions and any challenges
- Screenshots of the application

## How to run:

* Install the project from GitHub
* Open a terminal
* Navigate to the project folder in your terminal
* Run `ng serve --open` in the terminal to run ToDoAngular locally
* Open the link to lockalhost
* Run `ng test` in the terminal to run all tests

## Technical overview:

This project uses an API from Dummy JSON: https://dummyjson.com/todos/

```
/public
    /readme <- (for readme img)
/src
    /app    <- (for components)
        ...
        /pipe       <- (for pipe.ts files)
        /services   <- (for .service.ts files)
```

### How to use (and design):

The application has a sidebar with all your projects.
In the "main section" is the selected project.

To select a project, you first have to create a new project.
When a new project has been created, you can select it by clicking on it.

In the project, you can add tasks, change tasks, and change parameters of the project (such as deadline).

Tasks are divided into three different categories: "To Do", "Ongoing", and "Done".
To move a task, simply click on "Move To: [selected area]".

To edit a task, click on the pen icon.
When in edit mode, you can change the name, description, and more.

#### Design:

Tasks have a traffic light to easily display which category they are in.
The site is simple to give it a clean look and has a very nice color palette of white and gray (absolutely not boring to look at!).
The sidebar is a very light gray, very easy to miss, but it gives the site a cleaner look that the user might not even notice.

**Note:** Have the window in full screen. The site (or rather the CSS) is only PC compatible. (This is a design choice to give it a more professional look, as it is made for PC where you work.)

#### Image instructions on how to create a project and task:

Create project!
![alt text](/public/readme/image1.png)  
Create task!
![alt text](/public/readme/image2.png)  
Add tasks! In this case will we add three tasks, very impresive if you ask me!
![alt text](/public/readme/image3.png)  
Move tasks! You can move tasks to all three difrent categories categories: "To Do", "Ongoing", and "Done". Quite revelusinary, don't you think?
![alt text](/public/readme/image4.png)  
You have now made your very own super cool and very not boring project that contains tasks!  
![alt text](/public/readme/image5.png)

## Why ToDoAngular?

Why indeed? Why wouldn’t you want to use ToDoAngular?

You’ve got tasks. You’ve got projects. You’ve got deadlines, stress, existential dread, and a mild caffeine addiction strong enough to power a small hovercraft. What you don’t have—until now—is a beautifully chaotic, suspiciously over-engineered Angular application that’s just begging to be used for organizing your responsibilities in the most dramatic, high-stakes, keyboard-smashing way possible.

This project will bearly get a **pass** in grade.
Not a distinction. Not a merit. This is the kind of project that walks into the evaluation room
wearing sunglasses, hands in its pockets, and says, “Yeah, I did the thing. What of it?”

It’s structurally sound. It functions. It adheres to the assignment criteria in the same way duct tape adheres to a leaky pipe—it gets the job done, but it’s not elegant, and it definitely rattles when shaken.

Why isn’t it more? **It do not need to be more!**

But does it meet the requirements?  
Oh, yes. Painfully, gloriously, exactly.

This is a **project that passes** not because it’s flashy, but because it stands tall, stares mediocrity in the face, and says:  
> “I did what was asked, and then I overengineered the parts no one cared about.”

If this project had a motto, it would be:  
**"Functional. Overbuilt. Barely Styled. Pass-worthy."**

ToDoAngular isn’t here to impress.  
It’s here to survive the rubric.

ToDoAngular is not just another ToDo app.
It’s an experience.
A lifestyle.
A philosophy.

When you open ToDoAngular, you don’t just see tasks—you see potential.
Potential for greatness. Potential for productivity. Potential for losing yourself in a spiraling feedback loop of renaming variables, tweaking layout pixels, and rewording a task description twelve times before actually doing the thing.

And isn’t that what being a developer is truly about?
But wait—there’s more:

    Ever wanted to sort tasks into exactly three categories because life is too short for flexibility? Done.

    Love clicking the “Move To” button as if you’re commanding troops in a military operation? Oh, you’re in the right place.

    Wish your task management interface had the emotional subtlety of traffic lights and the raw intensity of grayscale palettes? Look no further.

    Need an app that doesn’t even pretend to work on mobile? You found it. You’re welcome.

A Bold New Frontier: Renaming, Redefining, Rescheduling (Without Reminders)

Welcome to the wild west of productivity, where your tasks are not dead checklist items, but living, editable chronicles of your mental to-do tornado. Here, you don’t just manage tasks—you sculpt narratives. You wield Angular forms like a poet wields a quill.
📝 Rename It All

Tired of calling your project “Stuff I Probably Should Do”? Reclaim your destiny. Rename it to “Operation Thunderstrike: Refactor the Backend.”
ToDoAngular lets you rewrite history at any time. Name changes aren’t just allowed—they’re encouraged. Because nothing says productivity like indecision dressed in confidence.
📜 Describe with Passion

Why limit your task to a boring sentence? Expand. Embellish. Emote. This is your internal monologue, immortalized. Your task description can become a rant, a roadmap, or a love letter to a bug you can’t reproduce.
⏰ Deadlines? You Control Time Now

Set the deadline. Change it. Move it forward. Move it backward. Re-add it out of guilt. ToDoAngular doesn’t judge. It simply nods stoically and lets you pretend your calendar is under control.

But here's the twist:

    There are no reminders.

No popups. No pings. No cute little “hey, just checking in 👀” nudges. If a deadline passes and you weren’t paying attention? That’s on you, hero. This app isn’t your mom.
It’s a minimalist dojo of consequence.
Eternal Memory Through Local Storage

And now, the pièce de résistance:

ToDoAngular uses local storage.

That’s right. Your tasks are saved right inside your browser. There is no backend, no database in the cloud, no helpful little server to back you up. It’s just you, your browser, and an unspoken agreement not to hit “Clear Site Data” unless you mean it.

Everything you do—every project you create, every task you forget about, every deadline you totally missed but pretend you didn’t—lives in your browser, forever. Or until you open DevTools and commit emotional arson. (Or delite the project normal...)

No logins. No syncing. No “Oops, your session expired.”
Just raw, browser-based permanence.

You are the backend.

You are the DevOps team.

You are the cloud now.

And when you return after three weeks of burnout and existential spiraling?
Your unfinished projects are still there, faithfully waiting, like little Post-It notes of guilt stuck to the inside of your hard drive’s soul.
In Summary:

Use ToDoAngular if you want:

    A task manager that respects you just enough to let you fail on your own terms.

    A to-do list that lives in your browser like a quiet gremlin whispering, “You still haven’t fixed the navbar bug.”

    A project structure powered entirely by Angular modules and unrepentant idealism.

    Desktop-only glory, because productivity deserves pixels.

    No reminders, no mercy, no backend.

Also, it’s Angular. And that means it’s serious.

---

(May have taken insparation from chatGPT with the last point: **Why ToDoAngular**)
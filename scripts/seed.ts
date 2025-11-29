import mongoose from 'mongoose';
import Book from '../models/Book';
import Character from '../models/Character';
import Post from '../models/Post';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/romance-website';

const books = [
    {
        title: "Claimed By My Boss",
        series: "Billionaire Bosses",
        seriesOrder: 1,
        coverImage: "/images/claimedbymyboss.png",
        buyLinks: { amazon: "https://amzn.to/4cEbFwH" },
        blurb: `He built a billion-dollar empire to forget the past. She is the daily reminder he can’t escape.

Zephyr Calderon is the king of the tech world. As the CEO of Zephyr Industries, he is ruthless, brilliant, and filthy rich. But behind the cold exterior lies a man shattered by the death of his brother—a tragedy he blames on one person: Harper Thompson.

Harper is the one woman Zephyr can’t fire. Bound by a buyout contract, she is forced to work as his executive assistant, enduring his glare and his grumpiness day in and day out. She is efficient, loyal, and hiding a devastating secret about his brother that could destroy them both.

When Zephyr prepares to launch Intellisight, a revolutionary AI platform, he becomes the target of a corrupt extortion scheme that spirals into a deadly frame-up. Suddenly, the billionaire and his assistant are stripped of their power and forced to go on the run.

Hunted by dirty cops and branded as fugitives, the walls between boss and employee shatter. In the shadows of Sterling City, hate ignites into a scorching passion neither can deny. But as they fight to clear their names, Harper’s secret threatens to surface.

Can Zephyr save his company and his heart, or will the truth cost him the only woman who ever really claimed him?`,
        tropes: [
            "Billionaire Boss / Office Romance",
            "Enemies to Lovers",
            "Best Friend’s Brother / Brother’s Girlfriend",
            "Grumpy x Sunshine",
            "Forced Proximity / On The Run",
            "The Grovel",
            "Touch Her and Die",
            "Secret Baby (Epilogue)"
        ],
        themes: [
            "Redemption",
            "Forbidden Love",
            "Trust & Betrayal",
            "Survival"
        ],
        rating: 4.5,
        heatLevel: 3,
        sexualTension: "High tension throughout the first half involving banter and stolen glances.",
        explicitScenes: "The book features detailed intimate encounters, including a high-stakes striptease scene under duress and a consensual, descriptive sex scene in a public park/lake. The language used is graphic.",
        idealReader: [
            "Loves High-Stakes Melodrama",
            "Craves the 'Alpha' Hero",
            "Enjoys Redemption Arcs",
            "Fans of Romantic Suspense",
            "Is Looking for a Fast-Paced Read"
        ],
        reviews: [
            {
                user: "Tina Redz",
                rating: 5,
                text: "Claimed by my boss is the first book I have ever read by author Zoey Appleton. I found this one to have a fast pace and good character development... Zephyr is a man who wants no connections... Harper, she is efficient, kind, honest... Overall this is a good story.",
                source: "Amazon",
                date: "September 24, 2023"
            },
            {
                user: "LaRae G",
                rating: 4,
                text: "Pretty good story. Has suspense and romance and I liked the characters.",
                source: "Amazon",
                date: "July 23, 2024"
            },
            {
                user: "GH",
                rating: 5,
                text: "This is a good story full of suspense with drugs corruption and murder... A free book but well written my review is voluntary and honest A good read",
                source: "Amazon",
                date: "April 25, 2024"
            }
        ]
    },
    {
        title: "Secrets of a Billionaire Boss",
        series: "Billionaire Bosses",
        seriesOrder: 2,
        coverImage: "/images/secretscover.png",
        buyLinks: { amazon: "https://amzn.to/3YXWZoZ" },
        blurb: `He built an empire to forget his past. She’s the one woman who can help him face it.

Tylor Montgomery is a self-made billionaire with a unique empire: Pampered Paws Palace, the world's most luxurious pet sanctuary. But behind the wealth and the Beverly Hills estate lies a man haunted by a twenty-five-year-old secret. Kicked out of his home as a teenager for falling in love with the wrong girl, Tylor has spent decades estranged from his powerful family.

Now, his past is calling. His sister Sarah is getting married, and she wants him back in the fold.

Jennifer Clark is fresh out of veterinary school and eager to prove herself as Tylor’s personal assistant and head veterinarian. When her boss asks her to accompany him to the Hamptons and a private island for the wedding, she expects a week of work and family drama. She doesn’t expect to fall for the guarded, sexy silver fox who employs her.

But this is no ordinary wedding. The island holds deadly secrets, and the groom might not be who he seems. As Tylor confronts the ghosts of his father and a shocking revelation about a son he thought he lost forever, Jennifer stumbles upon a murder plot that puts all their lives in danger.

Trapped in paradise with a killer on the loose, Tylor and Jennifer must cross the line between business and pleasure to survive. Can they expose the truth before the wedding turns into a funeral?`,
        tropes: [
            "Billionaire Boss / Workplace Romance",
            "Age Gap / Silver Fox",
            "Secret Baby (Grown Up)",
            "Forced Proximity / Destination Wedding",
            "Fake Date (Light)"
        ],
        themes: [
            "Romantic Suspense",
            "Return to Hometown",
            "Family Secrets",
            "Trust & Betrayal"
        ],
        rating: 4.1,
        heatLevel: 4,
        sexualTension: "There is lingering tension and flirtation throughout the first half of the trip.",
        explicitScenes: "The book features graphic intimacy, including a detailed scene on the beach and in the bedroom. The language is uninhibited.",
        idealReader: [
            "Loves Soap Opera Drama",
            "Enjoys the 'Silver Fox' Hero",
            "Likes Genre-Blending",
            "Roots for the 'Competent Heroine'"
        ],
        reviews: [
            {
                user: "Kimberly Dawn",
                rating: 5,
                text: "Zoey knocked it out of the park with this one. Loved the storyline and how it kept me guessing where it was going and what was going to happen next... The story has terrific characters who will go through a lot, from despair, to revealing secrets, to happiness.",
                source: "Amazon",
                date: "August 19, 2023"
            },
            {
                user: "PJ",
                rating: 5,
                text: "This was a truly engrossing tale not just about love but about overcoming your past by facing your demons. It kept me guessing and wanting more from beginning to end. The writers style is unique... but it definitely has some spicy points.",
                source: "Amazon",
                date: "August 18, 2023"
            },
            {
                user: "Wanda Lafferty",
                rating: 4,
                text: "Tylor and Sara live a life of wealth but with a father who will stop at nothing to get his way... The reunion is a roller coaster of emotions with secrets shared, twists of unexpected betrayals, a building relationship and the ghosts of the past.",
                source: "Amazon",
                date: "August 17, 2023"
            },
            {
                user: "Nancy",
                rating: 4,
                text: "Tylor is the boss. This book centers around him and his sister Sarah... He invited his assistant, Jennifer to come along. So many secrets and it starts unraveling. Good book.",
                source: "Amazon",
                date: "August 21, 2023"
            }
        ]
    },
    {
        title: "Tempting My Billionaire Boss",
        series: "Billionaire Bosses",
        seriesOrder: 3,
        coverImage: "/images/temptingcover.png",
        buyLinks: { amazon: "https://amzn.to/4dZmxGL" },
        blurb: `He holds the keys to her dreams, but a shadow from her past holds a loaded gun.

Kelly Reyes thought her life as an artist was over the night a drunk driver shattered her hands and her future. Now a dedicated art teacher, she hides her scars and her broken dreams behind a cheerful smile. But when Ethan Blackwood, a brooding billionaire gallery owner, walks into her classroom, he offers her the one thing she thought she’d lost forever: a chance to shine.

Ethan is wealthy, powerful, and notoriously grumpy. He’s built a fortress around his heart after a bitter divorce, burying himself in his business. He didn't expect the vibrant, resilient art teacher to crack his armor, let alone ignite a possessive fire he can’t control. What starts as a professional partnership for a gallery exhibition quickly spirals into a scorching affair that breaks every rule.

But their newfound happiness is painted on a canvas of danger.

As Kelly’s star rises, the darkness of her past returns. The man who destroyed her hands is back, fueled by a twisted vendetta and blaming Kelly for his ruined life. With a stalker closing in, a jealous ex-girlfriend sabotaging them at every turn, and a shocking surprise pregnancy that changes everything, Ethan must prove he’s more than just a boss. He has to be her protector.

In a world where obsession turns deadly, can love survive the crossfire?`,
        tropes: [
            "Billionaire Romance",
            "Grumpy x Sunshine",
            "Workplace Romance / Boss & Employee",
            "Romantic Suspense",
            "Touch Her and Die",
            "Surprise Pregnancy",
            "Trauma & Healing",
            "Insta-Lust/Fast Burn"
        ],
        themes: [
            "Art & Creativity",
            "Overcoming Trauma",
            "Protection & Safety",
            "Trust"
        ],
        rating: 4,
        heatLevel: 4,
        sexualTension: "High tension in the early chapters involving office banter and late-night visits.",
        explicitScenes: "The book features graphic intimacy, including oral sex, shower scenes, and descriptive intercourse. The language used is uninhibited and detailed.",
        idealReader: [
            "Loves 'Protector' Heroes",
            "Enjoys High Drama",
            "Fans of Artistic Settings",
            "Craves a Fast-Paced Plot",
            "Doesn't mind 'Insta-Love'"
        ],
        reviews: [
            {
                user: "Angela Barnes",
                rating: 5,
                text: "Zoey Appleton has written a 5-star book... This was a wonderful book and I would recommend it to anyone.",
                source: "Amazon",
                date: "September 18, 2023"
            },
            {
                user: "JLH",
                rating: 5,
                text: "Ethan owns an art gallery and Kelly teaches art to young children... The characters are well developed and the backstories add some depth. The storyline was believable with plenty to keep you glued to the pages.",
                source: "Amazon",
                date: "September 18, 2023"
            },
            {
                user: "Kim",
                rating: 5,
                text: "Tempting My Billionaire Boss by Zoey Appleton is a good, and enjoyable grumpy billionaire boss forbidden love single dad surprise pregnancy age gap opposites attract second chance workplace romance read.",
                source: "Amazon",
                date: "September 20, 2023"
            },
            {
                user: "Willow F.",
                rating: 3,
                text: "Zoey does a great job of building this world, the characters, and the challenges they face... I admit I ADORE the FML. She is someone relatable to me, someone also in the art world.",
                source: "Amazon",
                date: "September 19, 2023"
            }
        ]
    },
    {
        title: "Billionaire's Forbidden Desires Trilogy",
        series: "Billionaire Bosses",
        seriesOrder: 4,
        coverImage: "/images/billionaire_forbidden_desires.png",
        buyLinks: { amazon: "https://amzn.to/3A0SqQy" },
        blurb: `Three Ruthless Billionaires. Three Forbidden Romances. One Obsessive Need to Protect.

Enter the high-stakes world of the Billionaire’s Forbidden Desires Trilogy, where the boardrooms are cutthroat, the bank accounts are limitless, and the danger is just as intense as the passion. In this pulse-pounding collection, three powerful bosses find their perfectly ordered lives upended by the one thing money can't buy: love that is worth dying for.

Book 1: Claimed By My Boss
Zephyr Calderon is a tech mogul haunted by the death of his brother and stuck with the one assistant he can't stand: Harper Thompson. She’s efficient, loyal, and hiding a secret that could destroy him. But when a corporate extortion scheme frames them both, the billionaire and his assistant are forced to go on the run. Stripped of his power and hunted by corrupt cops, Zephyr realizes that the line between hate and love is razor-thin—and he’ll burn the city down to keep Harper safe.

Book 2: Secrets of a Billionaire Boss
Tylor Montgomery built a luxury empire to escape his toxic family. Now, twenty-five years later, he must return to the Hamptons for his sister's wedding, and he needs a buffer. Enter Jennifer Clark, his brilliant young assistant. What starts as a professional trip turns into a nightmare when a murder plot is uncovered on a private island. Amidst family betrayals, a secret son he never knew existed, and a killer closing in, Tylor must cross the line between boss and lover to survive the weekend.

Book 3: Tempting My Billionaire Boss
Ethan Blackwood is a grumpy art gallery owner who keeps the world at arm's length. Kelly Reyes is the resilient art teacher who cracks his armor. Their professional partnership quickly ignites into a possessive affair, but their happiness is painted on a canvas of danger. With a deranged stalker from Kelly’s past returning for revenge, a jealous ex-girlfriend sabotaging their every move, and a shocking surprise pregnancy, Ethan must prove he is more than just a boss—he is her protector.

Get the complete trilogy today and binge the series where "Touch Her and Die" isn't just a trope—it's a promise.`,
        tropes: [
            "Billionaire Boss / Workplace Romance",
            "Romantic Suspense",
            "Touch Her and Die",
            "Forced Proximity",
            "Grumpy x Sunshine",
            "Class Difference",
            "Secret Baby / Surprise Pregnancy",
            "Enemies to Lovers"
        ],
        themes: [
            "Protection & Obsession",
            "Power Dynamics",
            "Redemption",
            "Family Secrets"
        ],
        rating: 5,
        heatLevel: 4,
        sexualTension: "The sexual tension is often heightened by the adrenaline of the suspense plots.",
        explicitScenes: "All three books contain open-door, graphic sexual encounters, including exhibitionism (Book 1), beach/island intimacy (Book 2), and office/shower scenes (Book 3).",
        idealReader: [
            "The Binge Reader",
            "Fans of Romantic Thrillers",
            "Lovers of Alpha Heroes",
            "Soap Opera Enthusiasts"
        ]
    },
    {
        title: "Shadows of the Knight",
        series: "Adrian Knight Series",
        seriesOrder: 1,
        coverImage: "/images/shadowofknightcover.png",
        buyLinks: { amazon: "https://amzn.to/3Ws1yWv" },
        blurb: "A billionaire recluse and a determined journalist must join forces to take down a criminal syndicate.",
    },
    {
        title: "Shadow of Desire",
        series: "Into the Shadows Series",
        seriesOrder: 1,
        coverImage: "/images/shadowofdesirecover.png",
        buyLinks: { amazon: "https://amzn.to/3XerdD0" },
        blurb: `She’s playing the part of the perfect assistant. He’s playing a game of life and death.

Emma Cooper has spent her life dreaming of being the next Nancy Drew. Stuck as a junior investigator at a private agency, she finally gets her big break: go undercover at Thompson Enterprises to expose a corporate spy. The catch? The CEO is Alexander Thompson—the billionaire who took her to prom years ago, and the man she never quite got over.

Alexander built his empire from the ground up, but someone is trying to tear it down from the inside. When his brother’s best friend, Emma, joins his team as his new executive assistant, he’s distracted by her beauty and their shared past. But he can’t afford distractions. A shadowy organization known as "The Syndicate" is closing in, and they are threatening everything he loves.

As Emma digs through files and dodges bullets, the line between her cover story and reality blurs. She isn't just protecting a client anymore; she's protecting the man she loves. But in a world of smoke and mirrors, the most dangerous enemy is the one you trust the most.

When the ultimate betrayal is revealed, Emma and Alexander must decide: run from the shadows, or burn them down together?`,
        tropes: [
            "Undercover Romance",
            "Billionaire in Danger",
            "Childhood Friends / Past Connection",
            "Brother’s Best Friend",
            "Workplace Romance (Fake)",
            "The 'Mole' Hunt",
            "He Falls First"
        ],
        themes: [
            "Trust & Betrayal",
            "Corporate Intrigue",
            "Forbidden Love",
            "Protection"
        ],
        rating: 4,
        heatLevel: 3,
        sexualTension: "The tension is built on their shared history and the 'forbidden' nature of her undercover work.",
        explicitScenes: "Includes passionate encounters that serve as a release from the high-stakes danger surrounding them.",
        idealReader: [
            "Loves 'Nancy Drew' with a Kick",
            "Enjoys Corporate Intrigue",
            "Craves the 'Universe' Connection",
            "Likes Betrayal Plots"
        ],
        reviews: [
            {
                user: "Jane litherland",
                rating: 5,
                text: "Alexander Thompson Billionaire Tycoon on finding his company under threat hire's his brother's best friend Emma Cooper to go undercover... steamy fast paced suspenseful mystery romance. Well devised , easy reading and immersive.",
                source: "Goodreads",
                date: "2023-11-21" // Approximate based on other reviews
            },
            {
                user: "Rose Helg",
                rating: 5,
                text: "this book. This book was an page turner. This couple have Chemistry.",
                source: "Goodreads",
                date: "2023-11-21"
            },
            {
                user: "Barbara Weintz",
                rating: 5,
                text: "There is nothing better than a book about your grumpy boss that you end up having an attraction for. This book will have you intrigued from the beginning to the end... Emma and Alexander are really great characters you will fall in love with.",
                source: "Booksprout",
                date: "October 17, 2023"
            },
            {
                user: "Judy H",
                rating: 5,
                text: "Alexander and Emma come together when his company is on someone's target list... Loved the characters, their determination, backstories, and entertaining situations. The storyline flowed well... Lots of drama, twists, hidden agendas, revelations, steamy moments and sassy banter.",
                source: "Booksprout",
                date: "October 17, 2023"
            },
            {
                user: "Kaye",
                rating: 5,
                text: "ONE BEWITCHING THRILL. Snagging snoops Sol! Zoey unveils one incredibly thrilling debacle... The raw magnetism, undeniable attraction and combustible chemistry collides with such intoxicating intensity... Fabulous job Zoey.",
                source: "Booksprout",
                date: "October 17, 2023"
            },
            {
                user: "Wendy",
                rating: 4,
                text: "I was totally engrossed in this novel until the last few chapters. I was left confused about Alexander's involvement with the syndicate. Other than that, it was a very exciting read.",
                source: "Amazon",
                date: "November 21, 2023"
            },
            {
                user: "Lynda",
                rating: 5,
                text: "This story had me on the edge of seat. The twists and unexpected turns make this one of my favorite romantic suspense reads of the year.",
                source: "Amazon",
                date: "October 22, 2023"
            },
            {
                user: "mickey395",
                rating: 5,
                text: "Alexander and Emma have a lot of chemistry. First they can’t stand each other then they fall in love... Will their love stand the test of all the secrets and lies?",
                source: "Amazon",
                date: "October 26, 2023"
            },
            {
                user: "Trina Jones",
                rating: 5,
                text: "OMG this was a page turner and the suspense was fantastic thriller... Romance was outrageous out of this world and theses characters chemistry were sizzling... I highly recommend this book.",
                source: "Amazon",
                date: "October 18, 2023"
            },
            {
                user: "Mara",
                rating: 5,
                text: "Romance, suspense and intrigue all in one exciting book ! The suspense throughout the story was nothing short of fantastic... The romance, oh my, it was absolutely outrageous and out of this world!",
                source: "Amazon",
                date: "December 10, 2023"
            }
        ]
    },
    {
        title: "Shadow of Innocents",
        series: "Into the Shadows Series",
        seriesOrder: 2,
        coverImage: "/images/shadowofinnocents.png",
        buyLinks: { amazon: "https://amzn.to/3WRt2Ew" },
        blurb: `She was the victim the world prayed for. Now, she’s the hunter the Syndicate fears.

Isabella Bennett was the girl in the headlines—the seven-year-old kidnapped by the Syndicate and rescued by billionaire Alexander Thompson. Now, she’s no longer a victim. Armed with degrees in criminal justice and psychology, and carrying the rag doll that survived captivity with her, Isabella joins the Thompson Investigation Firm with one goal: to burn the human trafficking ring to the ground.

Her mentor and partner is Paul, the firm’s top investigator. He is lethal, disciplined, and dangerously protective of the rookie agent. He is also hiding a secret that could destroy them both. Paul isn't just a detective; he is the estranged heir to Lysander Industries—the very corporation funding the corruption they are fighting.

From the underground auctions of Paris to the dangerous streets of Spain and Thailand, Paul and Isabella race to dismantle the Syndicate’s network. But as the line between partner and lover blurs, the mission becomes personal.

When the Syndicate targets Isabella again, Paul must choose between the empire he walked away from and the woman who holds his heart. In a war against pure evil, innocence is the first casualty—but love might be the only thing that survives.`,
        tropes: [
            "Partners to Lovers",
            "The Survivor Heroine",
            "Heir to the Villain / Secret Identity",
            "Mentor / Mentee",
            "International Intrigue",
            "Touch Her and Die",
            "The Syndicate",
            "Found Family"
        ],
        themes: [
            "Justice & Revenge",
            "Healing from Trauma",
            "Identity",
            "Sacrifice"
        ],
        rating: 4,
        heatLevel: 3,
        sexualTension: "The romance is forged in high-stress, life-or-death situations.",
        explicitScenes: "Includes open-door sexual encounters that serve as a release from the darkness of their job.",
        idealReader: [
            "Loves 'Criminal Minds' or 'Law & Order'",
            "Follows Character Arcs",
            "Enjoys the 'Protector' Trope",
            "Craves Justice"
        ],
        reviews: [
            {
                user: "Kaye",
                rating: 5,
                text: "ONE TEMPESTUOUS RIDE. Blazing buzzards Brad! Zoey brought out the big guns with this action-packed thrilling rollercoaster... The characters are complex, genuine and realistic... Amazing job Zoey.",
                source: "Goodreads",
                date: "2023-11-25" // Approximate
            },
            {
                user: "Jane Litherland",
                rating: 5,
                text: "Paul and Isabella are thrust into the dark steamy world of human trafficking... With their chemistry intensified already , they must put on a perfect performance of passion in their pretence as lovers... Wow ! What a rollercoaster ride of emotions and tense suspicion.",
                source: "Goodreads",
                date: "2023-11-25"
            },
            {
                user: "Mary Jelks-Emmanuel",
                rating: 5,
                text: "Shadow of Innocents is a thrilling story that captivated me and had me glued to the pages. Paul and Isabella are partners, but she harbors feelings for him... The twists and turns that this story takes had my emotions all over the place.",
                source: "Goodreads",
                date: "November 24, 2023"
            },
            {
                user: "Sandra",
                rating: 5,
                text: "I really enjoyed reading this book... The chemistry between the 2 main characters was on point and the story line sucks you in. I think it was a great combination of suspense and romance and definitely worth the read.",
                source: "Goodreads",
                date: "November 22, 2023"
            },
            {
                user: "MP London",
                rating: 5,
                text: "This is a thrilling romance mystery story filled with suspense and emotion where Isabella and Paul come together to solve a trafficking case... This is a page turner!",
                source: "Booksprout",
                date: "2023-11-25"
            },
            {
                user: "Cateye83",
                rating: 5,
                text: "Enthralling!! Still haunted by a traumatic childhood, Isabella finds herself irresistibly drawn to Paul... Shadow of Innocence is a pulse-pounding thriller where danger and passion combust... I recommend reading this book by an extraordinary author.",
                source: "Booksprout",
                date: "2023-11-25"
            },
            {
                user: "Barbara W",
                rating: 5,
                text: "What an intensely emotional and heartfelt book that Zoey has written. Isabella and Paul have had a rough time in life. When they found each other the magic they had was special... This book is a must read that will make your day a lot happier.",
                source: "Amazon",
                date: "November 25, 2023"
            },
            {
                user: "ZZZZZ21001",
                rating: 5,
                text: "Another great read from Zoey Appleton. Great chemistry between the characters. I could not put it down!",
                source: "Amazon",
                date: "November 21, 2023"
            },
            {
                user: "Trina Jones",
                rating: 5,
                text: "This book was so good and I loved it. It was a steamy page turner and the suspense was intense... This romance was sizzling and hot... I highly recommend this book.",
                source: "Amazon",
                date: "November 21, 2023"
            }
        ]
    },
    {
        title: "Shadow of Freedom",
        series: "Into the Shadows Series",
        seriesOrder: 3,
        coverImage: "/images/shadowoffreedomcover.png",
        buyLinks: { amazon: "https://amzn.to/3YYSwTg" },
        blurb: `He’s a soldier hunting a ghost. She’s the hacker who holds the key.

Jackson Turner is a man living on borrowed time. A former Navy SEAL turned cybersecurity expert, he has spent years fueled by a singular, agonizing purpose: finding the daughter who was stolen from him and avenging the wife he couldn't save. He is disciplined, lethal, and entirely closed off—until he is paired with the one variable he can’t control.

Spark is a neon-haired whirlwind of chaos and code. A genius hacker for "The Secret Legion," she hides her own traumatic past behind sarcasm and firewalls. When the Syndicate launches "Orphan"—a terrifyingly sentient AI designed to optimize human trafficking—Spark is the only one who can dismantle it.

From the streets of Prague to the underground servers of Berlin, Jackson and Spark must outrun physical assassins and digital nightmares. But the Syndicate’s weapon is evolving. When Spark is trapped inside a lethal Virtual Reality simulation designed to break her mind, Jackson must do the impossible: upload himself into the machine to save her.

In a world where reality is a lie and memories can be rewritten, Jackson must face his greatest fear to find his daughter and save the woman who has rebooted his heart.`,
        tropes: [
            "Tech Thriller / Cyber Romance",
            "Grumpy x Sunshine (Cyber Edition)",
            "Widower Hero / Second Chance",
            "The Lost Child",
            "Only One Bed / Forced Proximity",
            "Protector",
            "Mind-Game / Simulation"
        ],
        themes: [
            "Reality vs. Simulation",
            "Grief & Healing",
            "Digital Warfare",
            "Identity"
        ],
        rating: 4,
        heatLevel: 3,
        sexualTension: "The bond is formed through shared trauma and the unique intimacy of Jackson entering Spark's mind.",
        explicitScenes: "Includes open-door scenes that serve as an anchor to reality amidst the digital chaos.",
        idealReader: [
            "Loves 'The Matrix' or 'Criminal Minds'",
            "Roots for the Tortured Hero",
            "Enjoys a Unique Setting",
            "Needs Closure"
        ],
        reviews: [
            {
                user: "Wanda Lafferty",
                rating: 5,
                text: "Jackson and Spark work together to bring down The Syndicate... There are so many twists and emotional moments that will leave you turning the pages to try and figure out who can be trusted.",
                source: "Booksprout",
                date: "January 2, 2024"
            },
            {
                user: "Sandra",
                rating: 5,
                text: "Zoey has done it again. The way she writes just captivates you and hooks you in. I loved the suspense and journey I went on while reading this book. A definite must read!",
                source: "Booksprout",
                date: "December 19, 2023"
            },
            {
                user: "Barbara W",
                rating: 5,
                text: "The very beginning of the book brings a tear to your eye thinking of the pain Jackson must be enduring... Zoey really captures your attention with her words... WOW what a great book.",
                source: "Booksprout",
                date: "December 18, 2023"
            },
            {
                user: "Merry Jelks-Emmanuel",
                rating: 5,
                text: "Jackson and Spark kept me glued to this riveting story filled with action-packed drama... It is a brilliant masterpiece of fiction that reads live a movie with characters that I enjoyed connecting with and cheering on.",
                source: "Booksprout",
                date: "December 17, 2023"
            },
            {
                user: "Kaye",
                rating: 5,
                text: "ONE SEDUCTIVE ADVENTURE. Simpering shivers Sam! Zoey doesn't hold back with this tempestuous temptation... The attraction and chemistry ignites with such intoxicating intensity... Excellent job Zoey.",
                source: "Goodreads",
                date: "2023-12-18" // Approximate
            },
            {
                user: "Susan",
                rating: 5,
                text: "This contemporary billionaire captivating mystery romance is page-turning with exceptional world-building... This author is extraordinary and knows how to captivate her readers' hearts.",
                source: "Goodreads",
                date: "2023-12-18" // Approximate
            },
            {
                user: "Tanya",
                rating: 5,
                text: "She is in danger and he needs to save her from the danger she is in. It is not going to be very easy to save her but he must. Will he save her? Will the secrets become too much?",
                source: "Goodreads",
                date: "2023-12-18" // Approximate
            },
            {
                user: "Jane Litherlane",
                rating: 5,
                text: "Powerful story of love , vying for their freedom is Jackson and Spark . Sparks do fly as the chemistry arcs. Great explosive story and tense reading. Well written and entertaining.",
                source: "Goodreads",
                date: "2023-12-18" // Approximate
            },
            {
                user: "MP London",
                rating: 5,
                text: "This romance story about Spark and Jackson has you captivated from the very beginning... Will they be able to trust and rely on each other to get to their happy ending.",
                source: "Booksprout",
                date: "2023-12-18" // Approximate
            },
            {
                user: "Melissa",
                rating: 5,
                text: "This is book three of Zoey Appleton's In The Shadows! Great add to this fun series! Would recommend!",
                source: "Booksprout",
                date: "December 18, 2023"
            }
        ]
    },
    {
        title: "Into the Shadows Collection",
        series: "Into the Shadows Series",
        seriesOrder: 4,
        coverImage: "/images/shadow_box_set.png",
        buyLinks: { amazon: "https://amzn.to/3yOj131" },
        blurb: `They hunt the shadows. But the shadows are hunting them back.

Three couples. Three impossible missions. One global conspiracy that binds them all.

Dive headfirst into a world of danger, passion, and breathtaking suspense with the complete Into the Shadows series. This collection brings together three interconnected, high-octane romantic thrillers where brilliant women and powerful men risk everything to fight a sinister organization known as the Syndicate.

Book 1: Shadow of Desire
It begins with a deadly corporate conspiracy. When rookie detective Emma Cooper goes undercover as the personal assistant to the demanding, infuriatingly handsome billionaire Alexander Thompson, she expects to uncover financial secrets, not a forbidden attraction. Tasked with finding a mole inside his company, they are drawn into a dangerous game of deception where the only thing more treacherous than the mission is the magnetic pull between them.

Book 2: Shadow of Innocents
The fight goes global. Now running a clandestine agency from a private Caribbean island, Alexander and Emma welcome a new team. Isabella, a brilliant investigator with a haunted past, is paired with Paul, a seasoned operative with his own dark secrets and a hidden fortune. Their first case—the kidnapping of a young equestrian star—plunges them into the Syndicate's horrifying human trafficking network. From Paris to Spain, they must confront a terrifying conspiracy that tests the very limits of their trust and love.

Book 3: Shadow of Freedom
The final battle is for the future itself. Jackson Turner is an ex-Navy SEAL and cybersecurity expert driven by one thing: revenge against the Syndicate for murdering his wife and kidnapping his daughter. He joins forces with Spark, a rebellious and fiercely independent hacker, to destroy the Syndicate's ultimate weapon—a sentient AI named "Orphan". Thrown together by fate, their clashing personalities ignite a powerful passion as they become the last line of defense in a reality-bending war against an enemy that sees, knows, and controls everything.`,
        tropes: [
            "The Syndicate",
            "Billionaire Protectors",
            "Found Family",
            "Romantic Suspense",
            "Workplace / Fake Relationship",
            "Partners to Lovers / Trauma Healing",
            "Grumpy x Sunshine / Tech Thriller"
        ],
        themes: [
            "Justice vs. Corruption",
            "Global Conspiracy",
            "Trust & Betrayal",
            "Redemption"
        ],
        rating: 4,
        heatLevel: 4,
        sexualTension: "The series thrives on 'forced proximity' tension—whether in a boardroom, a stakeout in Paris, or a safehouse in Berlin.",
        explicitScenes: "Includes open-door sexual encounters that serve as a release from the high tension of their missions.",
        idealReader: [
            "The 'Universe' Binger",
            "Action Junkies",
            "Lovers of Competent Heroines",
            "Fans of Genre-Bending"
        ]
    },
    {
        title: "Fire and Fate",
        series: "Into the Shadows Series",
        seriesOrder: 5,
        coverImage: "/images/fireandfatecover.png",
        buyLinks: { amazon: "https://amzn.to/40AE8AN" },
        blurb: `From the blood-soaked trenches of WWII to the shadows of a modern conspiracy, one family’s legacy is written in fire, secrets, and blood.

Fire and Fate is a sweeping, multi-generational epic that uncovers the origins of the war against the Syndicate. Across three books and three generations, the Richards family fights not just for their lives, but for a love that refuses to be extinguished by time or death.

Book One: The Soldier & The Nurse
In the throes of World War II, Thomas Richards is a young man with a heart full of hope, torn from his soulmate, Evelyn Heartfield, by the brutal machinery of war. While Thomas chronicles their love in journals from the front lines, Evelyn is recruited into "Project Nightingale"—a clandestine government operation tasked with caring for war orphans deep underground. But her noble mission hides a sinister secret. As Thomas fights to survive the battlefield, Evelyn uncovers a darkness that will bind their fates forever and birth a mystery that will echo through the ages.

Book Two: The Son & The Spy
Twelve years after the war, Thomas is a single father haunted by the mysterious death of his wife. His son, James, has grown into a curious young man, raised on his father's protective silence. When Thomas finally hands over his war journals, James begins to piece together the terrifying puzzle of the "Syndicate." But knowledge is dangerous. James’s investigation leads him to Katie, a captivating woman with a hidden agenda. She holds the keys to the secrets his father tried to bury—and she might be the only one who can save him.

Book Three: The Heir & The Truth
Decades later, the burden falls to Mark, the son of James and Katie. Obsessed with his grandfather’s journals and the shadow of the Syndicate, Mark follows the breadcrumbs down a dangerous path. He must confront the dark legacy of Project Nightingale and the shocking truth about his grandmother, Evelyn. In a final, explosive confrontation, the secrets of the past are laid bare, and the Richards family must make their last stand to secure their future.`,
        tropes: [
            "Generational Saga",
            "Historical Romance / WWII Setting",
            "The 'Syndicate' Origin Story",
            "Epistolary Elements",
            "Secret Identity / Hidden Agenda",
            "Second Chance / Lost Love",
            "Conspiracy Thriller"
        ],
        themes: [
            "Legacy & Bloodlines",
            "War & Sacrifice",
            "Truth vs. Secrets",
            "Enduring Love"
        ],
        rating: 4,
        heatLevel: 3,
        sexualTension: "High emotional stakes. The love stories are often forbidden or interrupted by war and danger.",
        explicitScenes: "Expect open-door intimacy, heightened by the desperate nature of the settings.",
        idealReader: [
            "Loves 'The Nightingale' or 'The Alice Network'",
            "Enjoys Multi-Generational Epics",
            "Craves Lore and Backstory",
            "Likes Mystery with their Romance"
        ]
    },
    {
        title: "Betting on Ruby",
        series: "Underworld of Vegas Series",
        seriesOrder: 1,
        coverImage: "/images/betting_on_ruby.png",
        buyLinks: { amazon: "https://amzn.to/3yRQSYK" },
        blurb: `She’s the daughter of the mob. He’s the accountant who just wanted a little excitement. They’re about to play the most dangerous hand of their lives.

Ruby Moretti is royalty in the Las Vegas underworld. As the daughter of casino mogul Angelo Moretti, she has spent her life trapped in a gilded cage, fighting to legitimize the family business while dodging the violent men who want to control her. When her father demands she marry Mario Marconi—a sadistic rival mobster with a trail of dead bodies behind him—Ruby knows she has to fold or bluff. She chooses to bluff.

Eric is a mild-mannered accountant bored with his predictable life. He wanted adventure; what he gets is a proposition from the most beautiful, dangerous woman he’s ever met. Ruby hires him to play a role: pose as a legendary high-roller and her doting fiancé to scare off her suitor.

It was supposed to be a business deal. Ruby gets her freedom; Eric gets a paycheck and a thrill. But in Vegas, the house always wins, and the shadows are watching. When the charade turns into a scorching reality, Eric finds himself in the crosshairs of a turf war he doesn't understand.

With a rival crime family closing in, a mother returning from the dead with a vendetta, and a love that breaks every rule of the underworld, Ruby and Eric must go all in. Because when you bet on Ruby, you’re betting with your life.`,
        tropes: [
            "Mafia Romance",
            "Fake Relationship / Fake Fiancé",
            "Class Difference / Reverse 'Pretty Woman'",
            "Opposites Attract",
            "Arranged Marriage (Threat)",
            "Las Vegas Setting",
            "Fish Out of Water",
            "Training Sequence"
        ],
        themes: [
            "Identity & Transformation",
            "Loyalty vs. Freedom",
            "The Price of Ambition",
            "Trust"
        ],
        rating: 4,
        heatLevel: 4,
        sexualTension: "Fueled by the danger of their fake relationship being discovered and the 'forbidden' nature of Eric being a civilian.",
        explicitScenes: "Includes open-door scenes that serve as an anchor amidst the chaos of the mob war.",
        idealReader: [
            "Loves Mob/Mafia Lit",
            "Roots for the Underdog",
            "Enjoys 'Fake Dating' with Stakes",
            "Likes Strong Heroines"
        ],
        reviews: [
            {
                user: "Barbara W",
                rating: 5,
                text: "I had the honor to read this book before it was released, and WOW Zoey did a FANTASTIC job writing this book. I loved that the setting was in Las Vegas because I actually live there... You are going to absolutely LOVE this book.",
                source: "Amazon",
                date: "July 8, 2024"
            },
            {
                user: "Virginia Powers",
                rating: 5,
                text: "I enjoyed reading Betting on Ruby I like the way I never knew what was going to happen next there was through in so many different curves and unexpected things and I would recommend reading this book.",
                source: "Amazon",
                date: "March 16, 2024"
            },
            {
                user: "Eric Rovelto",
                rating: 5,
                text: "My wife said I should get into romance novels and I came across zoey by chance... With zoey, her characters were substantially developed and I cared what happened to them... This book also sent me on an emotional rollercoaster.",
                source: "Amazon",
                date: "March 3, 2024"
            },
            {
                user: "rose",
                rating: 4,
                text: "Yes!!! loved reading this book. Eric and Ruby sure had a hell of a ride, fun characters. Great mafia romance.",
                source: "Amazon",
                date: "March 3, 2024"
            },
            {
                user: "Brenda chambers",
                rating: 5,
                text: "Like the flow it kept my interest from the first page",
                source: "Amazon",
                date: "March 6, 2024"
            },
            {
                user: "Lady P",
                rating: 5,
                text: "Not a sold out fan of mafia tales but this story is different... Ruby and Eric's story pulls you in from the beginning... Zoey does a great job of developing the main characters.",
                source: "Booksprout",
                date: "March 1, 2024"
            },
            {
                user: "Sandra",
                rating: 5,
                text: "Zoey has an amazing way with words. Once again I was hooked. The storyline and characters had me reading until the sun came up! A definite must for the TBR!",
                source: "Amazon",
                date: "March 11, 2024"
            },
            {
                user: "JaimeG",
                rating: 5,
                text: "I greatly enjoyed reading Betting on Ruby. Once I started reading this book, I had a hard time putting it down. The storyline grabbed my attention and held it until the very end.",
                source: "Amazon",
                date: "March 2, 2024"
            },
            {
                user: "Kindle Customer",
                rating: 5,
                text: "This was a very interesting story with a few twists but easy to follow. I would recommend this to other amazon readers.",
                source: "Amazon",
                date: "March 15, 2024"
            },
            {
                user: "Cateyes83",
                rating: 5,
                text: "This contemporary romance is page-turning with exceptional world-building in Las Vegas and characters that are realistic and captivating... I recommend reading this book by an extraordinary author.",
                source: "Goodreads",
                date: "2024-03-15" // Approximate
            }
        ]
    },
    {
        title: "Juliet's Game",
        series: "Zoey's Bedtime Stories",
        seriesOrder: 1,
        coverImage: "/images/julietsgamecover.png",
        buyLinks: { amazon: "https://amzn.to/4eeLOwn" },
        blurb: `In the cutthroat world of corporate warfare, love is the most dangerous move of all.

Juliet Reinhart was born a pawn. As the heiress to the Reinhart empire, she has spent her life being moved across the board by her father, groomed to be the perfect wife rather than a CEO. Now, with her father’s health failing and the company’s future on the line, he has made his final move: a forced merger disguised as an arranged marriage to the city's most ruthless predator.

Adrian Blackwood is the King of the boardroom. He is cold, calculating, and used to crushing his enemies. He doesn't want a wife; he wants the Reinhart territory. When he catches Juliet breaking into his office to find blackmail material on him, he doesn’t call the police. He offers her a different kind of deal.

Forced into a fragile alliance to destroy a common enemy—the encroaching Sterling Enterprises—Juliet and Adrian begin a dangerous game of deception. But as they dismantle their rivals, the line between business and pleasure blurs. Juliet discovers that the man she was taught to fear is the only one who sees her potential, and Adrian realizes that the woman he planned to conquer might just be the Queen he needs to win.

When a betrayal from a trusted ally threatens to topple both their empires, Juliet must stop playing by the rules. To save her legacy and her heart, she has to stop being the pawn and start running the board.`,
        tropes: [
            "Arranged Marriage / Marriage of Convenience",
            "Enemies to Lovers",
            "Billionaire Romance",
            "The 'Chess' Motif",
            "Power Couple",
            "Betrayal",
            "Who Did This To You?"
        ],
        themes: [
            "Power & Control",
            "Legacy",
            "Trust vs. Strategy",
            "Self-Discovery"
        ],
        rating: 4,
        heatLevel: 4,
        sexualTension: "The relationship is built on intellectual sparring and power plays, leading to intense physical encounters.",
        explicitScenes: "Includes graphic sexual scenes that serve as a release from the high-stress corporate environment.",
        idealReader: [
            "Loves 'Succession' or 'Billions'",
            "Craves a Competent Heroine",
            "Enjoys 'Power Play' Dynamics",
            "Likes the 'Arranged Marriage' Trope"
        ]
    }
];

const characters = [
    {
        name: "Zephyr Calderon",
        tagline: "The Billionaire CEO",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "CEO of Zephyr Industries and the billionaire protagonist",
            status: "Alive"
        },
        personality: {
            demeanor: "Productive and money-focused, he became grumpy and withdrawn after his brother's murder.",
            motivation: "To protect his company and legacy."
        },
        background: {
            origin: "Founded his company ten years ago with his brother, Connor, eventually buying him out. He has made over 3.5 billion dollars.",
            secrets: "Developing an AI platform called 'Intellisight'."
        },
        narrativeArc: {
            resolution: "He survives the blackmail plot, marries Harper, and they have a daughter."
        }
    },
    {
        name: "Harper Thompson",
        tagline: "The Loyal Assistant",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "Zephyr’s personal assistant and love interest",
            status: "Alive"
        },
        background: {
            origin: "She was the best friend of Zephyr's late brother, Connor. Zephyr kept her on the payroll as a condition of buying Connor out of the company.",
            secrets: "She was pregnant with Connor's baby but had an abortion without telling him; she blames herself for his subsequent spiral and death."
        },
        narrativeArc: {
            resolution: "She helps Zephyr defeat Davis, survives a gunshot wound to the lung, marries Zephyr, and they have a baby girl."
        }
    },
    {
        name: "Officer Davis",
        tagline: "The Corrupt Officer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "The main antagonist and a corrupt police officer",
            status: "Deceased"
        },
        personality: {
            motivation: "Jealous of rich tech moguls like Zephyr and feels underappreciated. Has gambling debts."
        },
        narrativeArc: {
            beginning: "Orchestrates a plan to infect Zephyr's AI with a worm to ransom data.",
            climax: "Murders Olivia and shoots Harper.",
            resolution: "He is shot and killed by police officers in a warehouse."
        }
    },
    {
        name: "Olivia Owens",
        tagline: "Crackerjack",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "An antagonist and pawn used by Officer Davis",
            status: "Deceased"
        },
        background: {
            origin: "Has a criminal record including breaking and entering and prostitution. Devastated by the death of her sister, Rachel."
        },
        narrativeArc: {
            beginning: "Davis blackmails her into seducing Zephyr and planting a virus on his computer.",
            turningPoint: "She kidnaps Harper with Davis.",
            resolution: "She is murdered by Officer Davis at the Red Rose Club to tie up loose ends."
        }
    },
    {
        name: "Officer Hale",
        tagline: "The Conflicted Partner",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "Officer Davis's partner",
            status: "Deceased"
        },
        narrativeArc: {
            beginning: "Initially seems to share Davis's frustrations.",
            turningPoint: "Becomes suspicious of Davis regarding Olivia's murder and reports him.",
            resolution: "Attempts to bring Zephyr and Harper into protective custody but is shot and killed by Officer Davis."
        }
    },
    {
        name: "Connor Calderon",
        tagline: "The Lost Brother",
        image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "Zephyr's deceased brother",
            status: "Deceased"
        },
        background: {
            origin: "Wanted to develop video games like Nintendo.",
            keyTrauma: "Spiraled into drug use after learning of Harper's abortion.",
            secrets: "Stabbed to death at Ralph's bar three years prior."
        }
    },
    {
        name: "Officer Williams",
        tagline: "The Commander",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "A shift officer/commander with 30 years of service",
            status: "Alive"
        },
        narrativeArc: {
            beginning: "Listens to Hale's suspicions about Davis.",
            resolution: "Coordinates investigation with Agent Reynolds and confronts Zephyr at the final crime scene."
        }
    },
    {
        name: "Agent Reynolds",
        tagline: "The Government Agent",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "A government agent",
            status: "Alive"
        },
        narrativeArc: {
            beginning: "Initially serves Zephyr with a warrant regarding financial crimes.",
            resolution: "Works with Officer Williams to investigate Davis's corruption."
        }
    },
    {
        name: "Rachel Owens",
        tagline: "The Tragic Sister",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: {
            role: "Olivia’s sister",
            status: "Deceased"
        },
        background: {
            origin: "A drug addict who dies of an overdose at Ralph's bar at the beginning of the book.",
            keyTrauma: "Her death is used by Davis to manipulate Olivia."
        }
    },
    // Minor Characters
    {
        name: "Barbra",
        tagline: "The Dispatcher",
        image: "/images/barbra.png",
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "The police precinct dispatcher" }
    },
    {
        name: "Ralph Sanders",
        tagline: "The Bar Owner",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2671&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "Owner of Ralph's bar" },
        background: { origin: "Where Rachel died and where Connor was stabbed years prior." }
    },
    {
        name: "Peter",
        tagline: "The Developer",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "Member of Zephyr's development team" }
    },
    {
        name: "Kevin",
        tagline: "The IT Tech",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "IT/Tech employee" },
        narrativeArc: { beginning: "Installs the infected drive into the secure server room because Harper delivers it." }
    },
    {
        name: "Mrs. Julia Fairway",
        tagline: "The Widow",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "A wealthy widow Zephyr speaks to at a charity event" }
    },
    {
        name: "Dr. Ambrose",
        tagline: "The Investor",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "High-powered investor" }
    },
    {
        name: "Dr. Franklin",
        tagline: "The Investor",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "High-powered investor" }
    },
    {
        name: "Officer Dax",
        tagline: "The Patrol Officer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "Police officer" },
        narrativeArc: { beginning: "Reports the sighting of Zephyr and Harper in the park." }
    },
    {
        name: "Chris",
        tagline: "The Publicist",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "Zephyr's publicist" }
    },
    {
        name: "Eric Rovelto",
        tagline: "The Artist",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop", // Placeholder
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "Book Cover artist" }
    },
    {
        name: "Zephyr & Harper's Daughter",
        tagline: "The Legacy",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2670&auto=format&fit=crop", // Placeholder (Baby/Child)
        bookTitle: "Claimed By My Boss",
        coreIdentity: { role: "Daughter of Zephyr and Harper" },
        background: { origin: "Born a year after the main events of the book." }
    }
];

const posts = [
    {
        title: "Welcome to the Romance World",
        slug: "welcome-romance-world",
        content: "Welcome to the official website for all things romance! Here you will find the latest news, book releases, and character bios.",
        excerpt: "Welcome to the official website...",
        date: "2023-10-27",
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await Book.deleteMany({});
        await Character.deleteMany({});
        await Post.deleteMany({});
        console.log('Cleared existing data');

        const createdBooks = await Book.insertMany(books);
        console.log(`Seeded ${createdBooks.length} books`);

        const bookMap = new Map();
        createdBooks.forEach(book => {
            bookMap.set(book.title, book._id);
        });

        const charactersWithBooks = characters.map(char => {
            const bookId = bookMap.get(char.bookTitle);
            if (!bookId) {
                console.warn(`Warning: Book title "${char.bookTitle}" not found for character "${char.name}"`);
            }
            const { bookTitle, ...charData } = char;
            return { ...charData, book: bookId };
        });

        const createdCharacters = await Character.insertMany(charactersWithBooks);
        console.log(`Seeded ${createdCharacters.length} characters`);

        await Post.insertMany(posts);
        console.log('Seeded posts');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
